"use client"

import Nav from "@/components/LandingPageComp/Nav"; 
import React from 'react' 
import { usePathname } from "next/navigation";

const CustomNav = () => { 
    const path =usePathname()  
    const pathsnames=["/reviewform/","/dashboard/space/"]
    const shouldHideNav = pathsnames.some(prefix => path.startsWith(prefix));
  
    return  ( !shouldHideNav && <Nav/> )
}

export default CustomNav