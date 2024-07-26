import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addBase64Prefix(base64String: string): string {
  const prefix = "data:image/jpeg;base64,";

  // Check if the string already starts with the prefix
  if (base64String.startsWith(prefix)) {
    return base64String; // Return as-is if prefix is already present
  } else {
    return prefix + base64String; // Add the prefix if it's not there
  }
}
