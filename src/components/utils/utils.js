
export const convertDate = (dateStr) => {
  let parts = dateStr.split("-");
  let dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let formattedDay = day < 10 ? "0" + day : day;
  let formattedMonth = month < 10 ? "0" + month : month;

  let formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

  return formattedDate;
};