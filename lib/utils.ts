import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Convert prisma object to JS object
export function prismaToJS<T>(value: T):T {
  
return JSON.parse(JSON.stringify(value))
}