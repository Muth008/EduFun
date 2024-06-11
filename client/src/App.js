import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Module from "./pages/Module/Module";
import ModulesProvider from "./context/ModulesProvider";
import TasksProvider from "./context/TasksProvider";
import Task from "./pages/Task/Task";
import Progress from "./pages/Progress/Progress";
import ModalProvider from "./context/ModalProvider";
import Scoreboard from "./pages/Scoreboard/Scoreboard";
import Account from "./pages/Account/Account";
import UserProvider from "./context/UserProvider";

function App() {
    return (
        <div className="App">
            <UserProvider>
                <ModulesProvider>
                    <TasksProvider>
                        <ModalProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Layout />}>
                                        <Route index element={<Dashboard />} />
                                        <Route path="/module/:id" element={<Module />} />
                                        <Route path="/task/:id" element={<Task />} />
                                        <Route path="/progress/:id" element={<Progress />} />
                                        <Route path="/scoreboard" element={<Scoreboard />} />
                                        <Route path="Account" element={<Account/>} />
                                        <Route path="*" element={"not found"} />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </ModalProvider>
                    </TasksProvider>
                </ModulesProvider>
            </UserProvider>
        </div>
    );
}

export default App;
