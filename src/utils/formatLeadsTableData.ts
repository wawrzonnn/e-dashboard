//Formats a date string to "dd/mm/yyyy" format.
export const formatDateString = (dateString: string) => {
   const date = new Date(dateString);
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear();
   return `${day}/${month}/${year}`;
};
//Capitalizes the first letter of a text string.
export const formatNameString = (text: string) => {
   return text.charAt(0).toUpperCase() + text.slice(1);
};
