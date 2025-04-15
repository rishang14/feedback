"use client";
import React ,{useState} from "react";
import Link from "next/link";
import { Button } from "../ui/button";
// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, UserCircleIcon, Pencil } from "lucide-react";
import { useSession } from "next-auth/react"; 
import { signOut } from "next-auth/react";

const Nav = () => {
  const { status, data } = useSession(); 
  return (
    <header className=" bg-black/30  backdrop-blur-2xl w-full  shadow-lg border-b border-b-slate-800 z-[200]">
      <nav className="flex justify-between items-center w-full mt-5 md:px-12 pb-3 px-4 ">
        <Link href="/" className="md:text-2xl text-lg text-white font-bold  ">
          ReviewVault
        </Link>
        {status !== "loading" ? (
          <div className="flex  items-center md:space-x-6 space-x-2">
            {status === "authenticated" ? (
              <div className="">
                <AvatarWithMenu data={data} />
              </div>
            ) : (
              <>
                <Link
                  href="/"
                  className="font-medium hover:text-blue-300 text-white text-md"
                >
                  Features
                </Link>
                <Link
                  href="/signup"
                  className="font-medium hover:text-blue-300 text-white text-md"
                >
                  Sign-up
                </Link>
                <Button
                  className="font-medium text-md  bg-blue-500"
                  asChild={true}
                  variant={"default"}
                >
                  <Link href="/signin" className=" text-white">
                    Sign-in
                  </Link>
                </Button>
              </>
            )}
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;

const AvatarWithMenu = ({ data }: any) => { 
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex justify-end  bg-black">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black border border-gray-300 cursor-pointer"
        >
          <Avatar className="    rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all">
          <AvatarFallback
            className="flex bg-white rounded-full items-center "
            color="white"
          >
            <UserCircleIcon />
          </AvatarFallback>
        </Avatar>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 py-2 px-3">
            <div className="py-2">
              <div className="font-medium">  {data?.user?.name}</div>
              <div className="text-sm  text-muted-foreground">{data?.user?.email}</div>
            </div>

            <div className="py-1 border-t border-gray-100">
              
            </div>

            <div className="py-1 border-t border-gray-100">
              <Button className="flex items-center w-full py-2 bg-gray-200 text-left text-neutral-900"  onClick={()=>signOut({callbackUrl:"/"})}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
