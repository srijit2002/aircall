export default function formatTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const time = `${hours}:${minutes} ${amPm}`;
  return time;
}
