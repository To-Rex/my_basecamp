import "./App.css";
import React from "react";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  flex-1 h-full w-full justify-center items-center">
      <img src={logo} className="w-1/3 h-1/3" />
      <h1 className="w-2/3 text-gray-500 text-center text-7xl font-bold">
        Collaborate easily
      </h1>
      <p className="text-gray-700 text-xl">
        A project management tool for developers
      </p>
      <div className="w-96 flex justify-around my-10">
        <button
          className="w-40 h-10 bg-blue-400 rounded-md text-white"
          onClick={() => {
            navigate("/register", { replace: true });
          }}
        >
          Sign Up
        </button>
        <button className="w-40 h-10 bg-blue-400 rounded-md text-white">
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
