import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center max-w-7xl">
        <form
          onSubmit={submitHandler}
          className="border-2 border-gray-200 rounded-md p-4 my-10 w-1/2"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="mb-4">
            <Label className="my-2 mx-1">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            ></Input>
          </div>
          <div className="mb-4">
            <Label className="my-2 mx-1">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            ></Input>
          </div>
          <div className="flex  items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  value="Student"
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  onChange={changeEventHandler}
                  checked={input.role === "Recruiter"}
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            className="w-full my-4 p-5 text-bold text-white text-lg"
          >
            Login
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-600"
            >
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default login;
