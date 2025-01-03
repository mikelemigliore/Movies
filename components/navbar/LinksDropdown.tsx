"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
//import { links } from "@/utils/links";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoPersonSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";

function LinksDropdown() {
  const { data: session }: any = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-[1vw] rounded-full p-0 bg-black/10 hover:bg-white/30 text-white"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-[2vw] h-[2vw]"
            />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-[2vh] w-[14vw] bg-customColor text-white border-none drop-shadow-xl"
        align="end"
        sideOffset={10}
      >
        {/* {links.map((link) => { */}
        {/* return ( */}
        <DropdownMenuItem
          // key={link.href}
          className="flex flex-col space-y-[1vw] p-[1vh] hover:bg-transparent focus:bg-transparent active:bg-transparent"
        >
          {!session ? (
            <></>
          ) : (
            <Link
              href={"/account"}
              className="flex items-center font-medium text-[1.2vw] capitalize w-full"
            >
              <Button
                variant="ghost"
                className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
              >
                <IoPersonSharp size={20} />
                Account
              </Button>
            </Link>
          )}

          <Link
            href={"/watchlist"}
            className="flex items-center font-medium text-[1.2vw] capitalize w-full"
          >
            <Button
              variant="ghost"
              className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
            >
              <LuPlus size={25} />
              Watchlist
            </Button>
          </Link>
          <Link
            href={"/watched"}
            className="flex items-center font-medium text-[1.2vw] capitalize w-full"
          >
            <Button
              variant="ghost"
              className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
            >
              <IoCheckmark size={25} />
              Watched
            </Button>
          </Link>
          <Link
            href={"/likes"}
            className="flex items-center font-medium text-[1.2vw] capitalize w-full"
          >
            <Button
              variant="ghost"
              className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
            >
              <AiFillLike size={25} />
              Likes
            </Button>
          </Link>
          {!session ? (
            <></>
          ) : (
            <div
              //href={"/"}
              className="flex items-center font-medium text-[1.2vw] capitalize w-full"
            >
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
                className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
              >
                <IoMdLogOut size={25} />
                Log Out
              </Button>
            </div>
          )}

          {/* <Link
                href={link.href}
                className="flex items-center font-medium text-[1.2vw] capitalize w-full"
              >
                <Button
                  variant="ghost"
                  className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2vh] gap-[1.5vw]"
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link> */}
        </DropdownMenuItem>
        {/* ); */}
        {/* })} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;

// { href: "/account", label: "Account", icon: <IoPersonSharp size={20}/> },
// { href: "/watchlist", label: "Watchlist", icon: <LuPlus size={25}/> },
// { href: "/watched", label: "Watched", icon: <IoCheckmark size={25}/> },
// { href: "/likes", label: "Likes", icon: <AiFillLike size={25}/> },
// { href: "/", label: "Log Out", icon: <IoMdLogOut  size={25}/> },
