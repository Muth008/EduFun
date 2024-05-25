import ModuleList from "../../components/module/ModuleList";
import TaskList from "../../components/task/TaskList";
import HeaderPanel from "../../components/headerPanel/HeaderPanel";

function Dashboard() {

    return (
        <>
            <HeaderPanel type="module" />
            <ModuleList />
            <hr />
            <HeaderPanel type="task" />
            <TaskList />
        </>
    );
}

export default Dashboard;
