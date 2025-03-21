import Hero from "@/components/LandingPageComp/Hero";
import Nav from "@/components/LandingPageComp/Nav";
import { ModeToggle } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import Image from "next/image";  
import connectDB from "@/lib/db.connect"; 
connectDB()
export default function Home() {
  return ( 
    <>
    <Hero/> 
    </>
  );
}
