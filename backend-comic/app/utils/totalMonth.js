const totalMonth = (data) => {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const monthlyChapters = Array(12)
    .fill(0)
    .map((_, index) => ({
      name: months[index],
      value: 0,
    }));
  data.forEach((chapter) => {
    const createdAt = new Date(chapter.createdAt);
    if (currentYear === createdAt.getFullYear()) {
      const month = createdAt.getMonth();
      monthlyChapters[month].value++;
    }
  });
  return monthlyChapters;
};
module.exports = { totalMonth };
