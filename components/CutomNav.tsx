"use client"

import Nav from "@/components/LandingPageComp/Nav"; 
import React from 'react' 
import { usePathname } from "next/navigation";

const CustomNav = () => { 
    const path =usePathname() 
    const shouldHideNav = path.startsWith("/reviewform/");
  
    return  ( !shouldHideNav && <Nav/> )
}

export default CustomNav