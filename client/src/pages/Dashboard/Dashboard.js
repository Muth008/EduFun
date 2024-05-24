import ModuleList from "../../components/module/ModuleList";
import TaskList from "../../components/task/TaskList";
import HeaderPanel from "../../components/headerPanel/HeaderPanel";

function Dashboard() {

    return (
        <>
            <HeaderPanel text="Module" />
            <ModuleList />
            <hr />
            <HeaderPanel text="Tasks" />
            <TaskList />
        </>
    );
}

export default Dashboard;
