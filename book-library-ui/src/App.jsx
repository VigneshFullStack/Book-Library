import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/dashboard/HomePage";
import AdminPage from "./components/admin/AdminPage";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Show Navbar for non-admin routes */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                            </Routes>
                        </>
                    }
                />
                {/* Admin Page without Navbar */}
                <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default App;