const calculateTimePassed = (updatedAt) => {
  const now = new Date();
  const limit = 1;
  const timeUpdate = updatedAt.map((date) => {
    const dayUpdated = new Date(date.dayUpdated);
    const timeDiff = now - dayUpdated;

    const timeUnits = [
      {
        label: "năm",
        value: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12)),
      },
      {
        label: "tháng",
        value: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)),
      },
      { label: "ngày", value: Math.floor(timeDiff / (1000 * 60 * 60 * 24)) },
      { label: "giờ", value: Math.floor(timeDiff / (1000 * 60 * 60)) },
      { label: "phút", value: Math.floor(timeDiff / (1000 * 60)) },
      { label: "giây", value: Math.floor(timeDiff / 1000) },
    ];

    const timePassedArray = timeUnits
      .filter((unit) => unit.value > 0)
      .map((unit) => `${unit.value} ${unit.label}${unit.value !== 1 ? "" : ""}`)
      .slice(0, limit);

    const timePassedString = timePassedArray.join(", ");

    return {
      timePassed: timePassedString,
    };
  });
  return timeUpdate;
};
export default calculateTimePassed;
