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
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EmailProp {
  email: any;
}

function EmailUpdate({ email }: EmailProp) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const currentEmailInput = e.target[0].value;
    const currentEmail = currentEmailInput.toLowerCase();
    const newEmailInput = e.target[1].value;
    const newEmail = newEmailInput.toLowerCase();
    const confirmNewEmailInput = e.target[2].value;
    const confirmNewEmail = confirmNewEmailInput.toLowerCase();

    if (
      !isValidEmail(currentEmail) ||
      !isValidEmail(newEmail) ||
      !isValidEmail(confirmNewEmail)
    ) {
      setError("Email is invalid");
      return;
    }

    if (newEmail !== confirmNewEmail) {
      alert("Emails do not match!");
      return;
    }

    if (currentEmail !== email) {
      alert("Emails do not match!");
      return;
    }

    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newEmail,
          confirmNewEmail,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mb-[1vh] md:text-[0.9vw]">Email</h1>
      <form>
        <h1
          className={`flex items-center bg-buttonColor h-[7vh] w-[75vw] md:h-[5.5vh]  md:px-[1.5vw] px-[4vw] md:w-[14vw] rounded-full md:text-[0.9vw] placeholder-white`}
        >{`${email}`}</h1>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
          Update
        </DialogTrigger>
        <DialogContent className="md:w-[19vw] md:h-[26vw] w-[82vw] rounded-2xl h-[62vh]  bg-buttonColor pb-[4vw]">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col md:mt-[1vw] mt-[5vw] md:ml-[2vw] ml-[4vw] space-y-[3vh]">
            <h1 className="md:text-[1vw] text-[5vw]">Update Email</h1>

            <form
              className="md:space-y-[1.1vw] space-y-[3vh]"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-[1vh] md:text-[0.9vw]">Current Email</h1>
              <div>
                <input
                  type="text"
                  className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw]`}
                  placeholder="Current Email..."
                  required
                />
              </div>
              <div>
                <h1 className="mb-[1vh] md:text-[0.9vw]">New Email</h1>
                <div>
                  <input
                    type="text"
                    className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw] `}
                    placeholder="New Email..."
                    required
                  />
                </div>
              </div>
              <div>
                <h1 className="mb-[1vh] md:text-[0.9vw]">Confirm New Email</h1>
                <div>
                  <input
                    type="text"
                    className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw]`}
                    placeholder="Confirm New Email..."
                    required
                  />
                </div>
              </div>
              <div className="flex justify-start pt-[1vh] ml-[-1vw]">
                <Button
                  onClick={handleCancel}
                  className="bg-transparent rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-customColorCard rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmailUpdate;
