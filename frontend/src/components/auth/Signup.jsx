import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center max-w-7xl">
        <form
          action=""
          className="border-2 border-gray-200 rounded-md p-4 my-10 w-1/2"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="mb-4">
            <Label className="my-2 mx-1">Full Name</Label>
            <Input
              type="text"
              placeholder="patel"
            ></Input>
          </div>
          <div className="mb-4">
            <Label className="my-2 mx-1">Email</Label>
            <Input
              type="email"
              placeholder="patel@gmail.com"
            ></Input>
          </div>
          <div className="mb-4">
            <Label className="my-2 mx-1">Password</Label>
            <Input
              type="password"
              placeholder="********"
            ></Input>
          </div>
          <div className="flex  items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
            ></Input>
          </div>
          <Button
            type="submit"
            className="w-full my-4 p-5 text-bold text-white text-lg"
          >
            SignUp
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
