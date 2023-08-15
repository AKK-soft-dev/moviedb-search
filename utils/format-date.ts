export default function formatDate(date: Date) {
  // Get the year, month, and day from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Format the date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
