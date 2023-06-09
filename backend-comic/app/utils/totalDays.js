const totalDays = (data) => {
  function getNumberOfDays(year, month) {
    // Số tháng trong JavaScript bắt đầu từ 0 (0 = Tháng 1, 11 = Tháng 12)
    const date = new Date(year, month, 1);
    // Di chuyển đến ngày đầu tiên của tháng tiếp theo
    date.setMonth(date.getMonth() + 1);
    // Trừ đi 1 ngày để quay trở lại ngày cuối cùng của tháng hiện tại
    date.setDate(date.getDate() - 1);
    return date.getDate();
  }
  const days = [
    "ngày 1",
    "ngày 2",
    "ngày 3",
    "ngày 4",
    "ngày 5",
    "ngày 6",
    "ngày 7",
    "ngày 8",
    "ngày 9",
    "ngày 10",
    "ngày 11",
    "ngày 12",
    "ngày 13",
    "ngày 14",
    "ngày 15",
    "ngày 16",
    "ngày 17",
    "ngày 18",
    "ngày 19",
    "ngày 20",
    "ngày 21",
    "ngày 22",
    "ngày 23",
    "ngày 24",
    "ngày 25",
    "ngày 26",
    "ngày 27",
    "ngày 28",
    "ngày 29",
    "ngày 30",
    "ngày 31",
  ];
  let currentDate = new Date();
  let currentMoth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  const numberOfDays = getNumberOfDays(currentYear, currentMoth);
  const dayslyChapters = Array(numberOfDays)
    .fill(0)
    .map((_, index) => ({
      name: days[index],
      value: 0,
    }));
  data.forEach((chapter) => {
    const createdAt = new Date(chapter.createdAt);
    if (currentMoth === createdAt.getMonth()) {
      const day = createdAt.getDate();
      dayslyChapters[day - 1].value++;
    }
  });
  return dayslyChapters;
};
module.exports = { totalDays };
