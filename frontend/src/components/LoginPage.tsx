import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import logo from "../assets/jukeboxd.svg"

import { useRef } from "react"

import axios from "axios";
const backend = import.meta.env.VITE_BACKEND_URL;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      console.log(backend)
      const res = await axios.post(`${backend}/auth/login`, {
        username,
        password,
      }, { withCredentials: true });

      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setError("");
      navigate("/profile");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${backend}/auth/register`, {
        username,
        password,
      }, { withCredentials: true });

      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setError("");
      navigate("/profile");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const LoginForm = (
    <>
      <div>
        <Label htmlFor="username" className="pb-1">Username</Label>
        <Input
          ref={usernameRef}
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") passwordRef.current?.focus();
          }}
        />
      </div>

      <div>
        <Label htmlFor="password" className="pb-1">Password</Label>
        <Input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
      )}

      <Button
        onClick={handleLogin}
        className="w-full !bg-green-600 !text-white hover:!bg-green-700"
      >
        Sign In
      </Button>

      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => {
            setMode("register")
            setError("")
          }}
          className="text-green-600 hover:underline cursor-pointer font-normal"
        >
          Register.
        </span>
      </p>
    </>
  )

  const RegisterForm = (
    <>
      <div>
        <Label htmlFor="username" className="pb-1">Username</Label>
        <Input
          ref={usernameRef}
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") passwordRef.current?.focus();
          }}
        />
      </div>

      <div>
        <Label htmlFor="password" className="pb-1">Password</Label>
        <Input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmRef.current?.focus();
          }}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="pb-1">Confirm Password</Label>
        <Input
          ref={confirmRef}
          id="confirmPassword"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRegister();
          }}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
      )}

      <Button
        onClick={handleRegister}
        className="w-full !bg-green-600 !text-white hover:!bg-green-700"
      >
        Sign Up
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={() => {
            setMode("login")
            setError("")
          }}
          className="text-green-600 hover:underline cursor-pointer font-normal"
        >
          Log in.
        </span>
      </p>
    </>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-md">
        <div className="flex justify-center mb-4">
          <img src={logo} className="logo" alt="Jukeboxd logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 capitalize">
          {mode}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {mode === "login" ? LoginForm : RegisterForm}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
