import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PortfolioForm from "./pages/PortfolioForm";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<PortfolioForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate" element={<Generate />} />
        </Routes>
    );
}

export default App;
