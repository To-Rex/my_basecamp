import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [bigError, setBigError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setBigError("");
    setEmailError("");
    setNameError("");
    setError("");
    setError2("");
  }, [name, email, password, confirmPassword]);

  const Post = async () => {
    if (name.length === 0) {
      setNameError("Name is required!");
      return;
    }

    if (email.length === 0) {
      setEmailError("Email is required.");
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Wrong mail!");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPassword("Passwords are not same.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/register", {
        name,
        email,
        password: confirmPassword,
      });

      navigate("/login", { replace: false });
    } catch (error) {
      setBigError(error.response.data);
    } finally {
      console.log("Request sent!");
    }
  };

  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      setError("Password must be minmum 6 characters.");
    } else setError(null);
  }, [password]);

  useEffect(() => {
    if (confirmPassword !== password) {
      setError2("Passwords are not same.");
    } else setError2(null);
  }, [confirmPassword]);

  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <Link to="/">
        <img src={logo} className="h-52" />
      </Link>
      <h1 className="text-4xl text-black">Register</h1>
      {bigError && <h1 className="text-2xl text-red-700">{bigError}</h1>}
      <input
        type="text"
        className="w-96 h-10 my-4 pl-4 border hover:border-blue-400 hover:border-2"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
          setNameError("");
        }}
      />
      {nameError && (
        <p className="w-96 text-red-300 text-left text-base my-2">
          {nameError}
        </p>
      )}
      <input
        type="email"
        className="w-96 h-10 my-4 pl-4 border hover:border-blue-400 hover:border-2"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
      />
      {emailError && (
        <p className="w-96 text-red-300 text-left text-base my-2">
          {emailError}
        </p>
      )}
      <input
        type="password"
        className="w-96 h-10 my-4 pl-4 border hover:border-blue-400 hover:border-2"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error && (
        <p className="w-96 text-red-300 text-left text-base my-2">{error}</p>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-96 h-10 my-4 pl-4 border hover:border-blue-400 hover:border-2"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      {error2 && (
        <p className="w-96 text-red-300 text-left text-base my-2">{error2}</p>
      )}
      <button
        className="w-40 h-10 bg-blue-400 rounded-md text-white"
        onClick={() => Post()}
      >
        Sign Up
      </button>
      <p className="my-4">
        Already member? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
