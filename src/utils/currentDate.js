const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "December",
];

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DATE = new Date();

let curHour = DATE.getHours();
let curDay = DATE.getDate();
curDay = curDay < 10 ? Number(`(0${curDay})`) : curDay;
let curMonth = monthNames[Date.getMonth()];

export { curDay, curHour, curMonth, dayNames };
