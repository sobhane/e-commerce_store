"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === "system" ? (
            <SunMoon />
          ) : theme === "light" ? (
            <SunIcon />
          ) : (
            <MoonIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>App apperance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
