"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle

function Password() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1 className="mb-[1vh] text-[0.9vw]">Password</h1>
      <form className="flex relative">
        {/* Search Input */}
        <input
          type={showPassword ? "text" : "password"}
          className={`bg-buttonColor md:h-[5.5vh] md:px-[1.5vw] w-[14vw] md:rounded-full w-full pr-[2.5rem] ${
            showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
          }`}
          placeholder=""
          readOnly
          value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
        />
        <div
          className="absolute right-[1vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
          ) : (
            <AiOutlineEye className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
          )}
        </div>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] px-[1vw] py-[0.5vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
          Update
        </DialogTrigger>
        <DialogContent className="w-[19vw] h-[26vw] bg-buttonColor pb-[4vw]">
          <div className="flex flex-col mt-[1vw] ml-[2vw] space-y-[3vh]">
            <h1 className="text-[1vw]">Update Passowrd</h1>
            <div>
              <h1 className="mb-[1vh]">Current Password</h1>
              <form>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div>
              <h1 className="mb-[1vh]">New Password</h1>
              <form>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] `}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div>
              <h1 className="mb-[1vh]">Confirm New Password</h1>
              <form>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div className="flex justify-start pt-[1vh] ml-[-1vw]">
              <Button
                onClick={handleCancel}
                className="bg-transparent rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-transparent"
              >
                Cancel
              </Button>
              <Button className="bg-customColorCard rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95">
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <Button className="mt-[1.5vh] px-[1vw] py-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
              Update
            </Button> */}
    </div>
  );
}

export default Password;
