import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

import Login from "./pages/Login";
import Reservations from "./pages/Reservations";
import ReservationForm from "./pages/ReservationForm";
import Restaurants from "./pages/Restaurants";

function App() {
  return (
    <Layout style={{ height: "100%" }}>
      <Routes>
        <Route path="/" element={<ReservationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </Layout>
  );
}

export default App;
