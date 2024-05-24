import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Module from "./pages/Module/Module";
import ModulesProvider from "./context/ModulesProvider";
import TasksProvider from "./context/TasksProvider";
import Task from "./pages/Task/Task";
import Scoreboard from "./pages/Scoreboard/Scoreboard";
import Progress from "./pages/Progress/Progress";

function App() {
    return (
        <div className="App">
            <ModulesProvider>
                <TasksProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="/module/:id" element={<Module />} />
                                <Route path="/task/:id" element={<Task />} />
                                <Route path="/progress/:id" element={<Progress />} />
                                <Route path="/scoreboard" element={<Scoreboard />} />
                                <Route path="*" element={"not found"} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TasksProvider>
            </ModulesProvider>
        </div>
    );
}

export default App;
