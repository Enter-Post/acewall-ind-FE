import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Layout from "./Page/StudentPortal/Layout";
import Deshboard from "./Page/StudentPortal/Deshboard";
import Mycourses from "./Page/StudentPortal/MyCourses";
import Assignment from "./Page/StudentPortal/Assignment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/studentPortal" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="mycourses" element={<Mycourses />}></Route>
          <Route path="assignment" element={<Assignment />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
