// App.tsx
// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VehicleDetail from "./components/TTX.tsx";
import Home from "./pages/Home";
import Ttxlar from "./pages/TTX_lar.tsx";
import TexTuri from "./pages/TexTuri.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ttx" element={<Ttxlar />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/tex_turi" element={<TexTuri />} />
        </Routes>
    );
}

export default App;
