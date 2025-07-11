"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme,setTheme } = useTheme() 

  const switchTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
      default:
        break;
    }
  };

  const toggleTheme = () => {
      switchTheme();
  };

  return (
    <Button
    onClick={toggleTheme}
    size="icon"
    className="dark:bg-black dark:hover:bg-black hover:bg-white bg-white"
  >
    <Moon className="absolute size-6 rotate-90 scale-0 transition-all hover:text-blue-500 dark:rotate-0 dark:scale-100 dark:text-white " />
    <Sun className="size-6 rotate-0 scale-100 text-black transition-all hover:text-blue-500 dark:-rotate-90 dark:scale-0" />
    <span className="sr-only">Toggle theme</span>
  </Button>
  )
}
