function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  return `${day}${getOrdinalSuffix(day)} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

export default function formatCallLogData(jsonData) {
  const dataByDate = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  jsonData.forEach((item) => {
    const createdAt = new Date(item.created_at);
    let formattedDate, actualDate;

    // Check if the date is today, yesterday, or another day
    if (createdAt.toDateString() === today.toDateString()) {
      formattedDate = "today";
      actualDate = today;
    } else if (createdAt.toDateString() === yesterday.toDateString()) {
      formattedDate = "yesterday";
      actualDate = yesterday;
    } else {
      formattedDate = formatDate(createdAt);
      actualDate = createdAt;
    }

    // Unique key for sorting
    const dateKey = actualDate.toISOString().split("T")[0];

    // Initialize if first entry for this date
    if (!dataByDate[dateKey]) {
      dataByDate[dateKey] = { formattedDate, entries: [] };
    }

    // Add the item to the appropriate date
    dataByDate[dateKey].entries.push(item);
  });

  // Sort and convert to desired format
  return Object.keys(dataByDate)
    .sort()
    .reverse()
    .map((dateKey) => ({
      date: dataByDate[dateKey].formattedDate,
      entries: dataByDate[dateKey].entries,
    }));
}

export function extractDateAndTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // Formatting the time
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  // Formatting the date
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const ordinal = ((day) => {
    const s = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (s[(v - 20) % 10] || s[v] || s[0]);
  })(day);

  const formattedDate = `${ordinal} ${month}, ${year}`;

  return { time: formattedTime, date: formattedDate };
}

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeParts = [];
  if (hours > 0) {
    timeParts.push(`${hours} hr`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} min`);
  }
  if (remainingSeconds > 0) {
    timeParts.push(`${remainingSeconds} sec`);
  }

  return timeParts.join(" ") || "0 second";
}
