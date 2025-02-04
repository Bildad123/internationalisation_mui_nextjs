export function getInitials(name: string | null | undefined) {
  // Split the name into words
  if (!name) return "";
  const words = name.split(" ");
  // Get the first letter of each word and join them
  const initials = words.map((word) => word.charAt(0)).join("");
  return initials;
}
export const pageSizeOptions: {
  label: string;
  value: string;
}[] = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "15", value: "15" },
];
