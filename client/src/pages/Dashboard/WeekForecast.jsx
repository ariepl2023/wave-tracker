function WeekForecast({ data }) {
  const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const hebrewMonths = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

  const today = new Date();
  const next5Days = [0, 1, 2, 3, 4].map((i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toDateString();
  });

  const weekForecast = data.filter((item) => {
    const date = new Date(item.forecast_time);
    return next5Days.includes(date.toDateString()) && [6, 12, 18].includes(date.getHours());
  });

  const groupedByDay = {};
  weekForecast.forEach((item) => {
    const dayKey = new Date(item.forecast_time).toDateString();
    if (!groupedByDay[dayKey]) groupedByDay[dayKey] = [];
    groupedByDay[dayKey].push(item);
  });

  return (
    <div className="week-forecast">
      <h2 className="section-title">השבוע</h2>
      <div className="week-cards">
        {Object.entries(groupedByDay).map(([day, hours]) => {
          const date = new Date(day);
          return (
            <div className="week-card" key={day}>
              <div className="week-card-header">
                <span className="week-card-day">יום {hebrewDays[date.getDay()]}</span>
                <span className="week-card-date">{date.getDate()} {hebrewMonths[date.getMonth()]}</span>
              </div>
              <div className="week-card-slots">
                {hours.map((item) => (
                  <div className="week-slot" key={item.id}>
                    <span className="week-slot-time">
                      {String(new Date(item.forecast_time).getHours()).padStart(2, "0")}:00
                    </span>
                    <span className="week-slot-wave">{item.wave_height} מ׳</span>
                    <span className="week-slot-wind">
                      {item.wind_speed ? (item.wind_speed * 3.6).toFixed(1) : "-"} קמ"ש
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekForecast;
