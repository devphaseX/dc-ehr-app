import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
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

export function mapRecordToFormData(payload: Record<string, any>) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(
      key,
      Object(value) === value && value instanceof Blob ? value : String(value),
    );
  });

  return formData;
}

export function formatDate(val: Date | string) {
  if (!val) {
    return ""; // or 'N/A', or whatever you want to display for null/undefined dates
  }
  let date = new Date(val);

  if (isNaN(date.getTime()) || date.getFullYear() === 1) {
    return ""; // or 'N/A', for invalid dates or dates in year 1
  }
  return format(date, "dd/mmm/yyyy");
}
