import { useEffect,useState,useRef } from "react"; 
import { Button } from "./ui/button"; 
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, UserCircleIcon, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react"; 
const AvatarWithMenu = ({ data }: any) => { 
    const [isOpen, setIsOpen] = useState(false) 
    const ref=useRef(null); 
    useEffect(() => { 
      
      function handleClickOutside(event:any) { 
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
    return (
      <div className="flex justify-end bg-gray-900">
        <div className="relative"  ref={ref}>
          <Button
            size="icon"
            onClick={() => setIsOpen((prev)=>!prev)}
            className="rounded-full bg-gray-800 flex items-center justify-center text-white border border-gray-700 cursor-pointer hover:bg-gray-700"
          >
            <Avatar className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
              <AvatarFallback className="flex bg-gray-800 text-gray-100 rounded-full items-center">
                <UserCircleIcon />
              </AvatarFallback>
            </Avatar>
          </Button>
  
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 py-2 px-3 border border-gray-700" ref={ref}>
              <div className="py-2">
                <div className="font-medium text-gray-100">{data?.user.name}</div>
                <div className="text-sm text-gray-400">{data?.user.email}</div>
              </div>
  
              <div className="py-1 border-t border-gray-700"> 
                <Link href={"/profile"}>
                <Button
                  variant="ghost"
                  className="flex items-center w-full justify-start py-2 text-left text-gray-200 hover:bg-gray-700 hover:text-white"
                  onClick={()=>setIsOpen(false)}  
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>My Profile</span>
                </Button> 
                </Link>
              </div>
  
              <div className="py-1 border-t border-gray-700">
                <Button
                  variant="ghost"
                  className="flex items-center w-full justify-start py-2 text-left text-gray-200 hover:bg-gray-700 hover:text-white"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  };
  

  export default AvatarWithMenu;