import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5DragTransition, TouchTransition } from 'react-dnd-multi-backend';

const ItemTypes = {
  TASK: 'task'
};

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: HTML5DragTransition
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition
    }
  ]
};

const Task = ({ task, listType, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { listType, index, task },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragList = item.listType;
      const hoverList = listType;

      if (dragIndex === hoverIndex && dragList === hoverList) {
        return;
      }

      moveTask(dragList, hoverList, dragIndex, hoverIndex);

      item.index = hoverIndex;
      item.listType = hoverList;
    }
  });

  return (
    <ListGroup.Item ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task}
    </ListGroup.Item>
  );
};

const TaskList = ({ tasks, listType, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (tasks.length === 0 && item.listType !== listType) {
        moveTask(item.listType, listType, item.index, 0);
        item.listType = listType;
        item.index = 0;
      }
    }
  });

  return (
    <Card>
      <Card.Header>{listType === 'selected' ? 'Selected tasks' : listType === 'new' ? 'New' : 'Used'}</Card.Header>
      <Card.Body>
        <ListGroup ref={drop}>
          {tasks.map((task, index) => (
            <Task key={index} task={task} listType={listType} index={index} moveTask={moveTask} />
          ))}
          {tasks.length === 0 && <ListGroup.Item style={{ height: '50px' }}>Drop here</ListGroup.Item>}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const ModuleTasksModal = ({ show, handleClose }) => {
  const [availableTasks, setAvailableTasks] = useState({
    new: ['Pythagorean theorem - basics II'],
    used: ['Basic logarithm 1', 'Basic logarithm 2', 'Basic logarithm 3']
  });

  const [selectedTasks, setSelectedTasks] = useState(['Pythagorean theorem - basics']);

  const moveTask = (fromListType, toListType, fromIndex, toIndex) => {
    const fromList = fromListType === 'selected' ? selectedTasks : availableTasks[fromListType];
    const toList = toListType === 'selected' ? selectedTasks : availableTasks[toListType];

    const task = fromList.splice(fromIndex, 1)[0];
    toList.splice(toIndex, 0, task);

    setAvailableTasks({ ...availableTasks });
    setSelectedTasks([...selectedTasks]);
  };

  const handleSave = () => {
    const data = {
      availableTasks,
      selectedTasks
    };
    console.log(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Container fluid>
            <Row>
              <Col lg={6}>
                <TaskList tasks={availableTasks.new} listType="new" moveTask={moveTask} />
                <TaskList tasks={availableTasks.used} listType="used" moveTask={moveTask} className="mt-3" />
              </Col>
              <Col lg={6}>
                <TaskList tasks={selectedTasks} listType="selected" moveTask={moveTask} />
              </Col>
            </Row>
          </Container>
        </DndProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModuleTasksModal;