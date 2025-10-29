// App.tsx
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import VehicleDetail from "./components/TTX.tsx";
import Home from "./pages/Home";
import Ttxlar from "./pages/TTX_lar.tsx";
import TexTuri from "./pages/TexTuri.tsx";
import CompCountries from "./pages/CompCountries.tsx";
import Home1 from "./pages/Home1.tsx";

function App() {
    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    opacity: 0.3,
                    transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
            >
                <Link to="/home">Home</Link>
                <br />
                <Link to="/home1">Home1</Link>
                <br />
                <Link to="/comp">Comp</Link>
                <br />
                <Link to="/ttx">Ttx</Link>
                <br />
                <Link to="/tex_turi">Tex Turi</Link>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home1" element={<Home1 />} />
                <Route path="/comp" element={<CompCountries />} />
                <Route path="/ttx" element={<Ttxlar />} />
                <Route path="/vehicle/:id" element={<VehicleDetail />} />
                <Route path="/tex_turi" element={<TexTuri />} />
            </Routes>
        </>
    );
}

export default App;
