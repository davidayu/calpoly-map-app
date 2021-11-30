import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LocationForm from "./components/LocationForm";
import ListView from "./components/ListView";
import CommentView from "./components/CommentView";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/locations" exact element={<ListView />} />
      <Route path="/locations/new" exact element={<LocationForm />} />
      <Route path="/locations/:id" exact element={<CommentView />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
