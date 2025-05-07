import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white px-10 py-5">
      <div className="flex justify-between items-center mx-auto max-w-7xl ">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium cursor-pointer">
            <Link to="/">
              {" "}
              <li>Home</li>
            </Link>
            <Link to="/Jobs">
              {" "}
              <li>Jobs</li>
            </Link>
            <Link to="/Browse">
              {" "}
              <li>Browse</li>
            </Link>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                {" "}
                <Button
                  variant="outline"
                  className="cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Mohit Sharma</h4>
                      <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="flex flex-col  text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
