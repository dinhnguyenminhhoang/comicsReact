const totaHour = (data) => {
  const hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentDay = currentDate.getDate();
  let currentMoth = currentDate.getMonth();
  const hourslyChapters = Array(24)
    .fill(0)
    .map((_, index) => ({
      name: hours[index],
      value: 0,
    }));
  data.forEach((chapter) => {
    const createdAt = new Date(chapter.createdAt);
    const day = createdAt.getDate();
    const month = createdAt.getMonth();
    if (
      currentHour === createdAt.getHours() &&
      currentDay === day &&
      currentMoth === month
    ) {
      const hour = createdAt.getHours();
      hourslyChapters[hour].value++;
    }
  });
  return hourslyChapters;
};
module.exports = { totaHour };
