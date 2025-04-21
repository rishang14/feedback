"use client"

import React from 'react' 
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const CustomFooter = () => { 
    const path =usePathname()  
    const pathsnames=["/reviewform/","/dashboard/space/", "/dashboard"]
    const shouldHideNav = pathsnames.some(prefix => path.startsWith(prefix));
  
    return  ( !shouldHideNav && <Footer/> )
}

export default CustomFooter