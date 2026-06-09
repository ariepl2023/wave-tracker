function TodayForecast({ data }) {
  const targetHours = [6, 9, 12, 15, 18, 21];

  const todayForecast = data.filter((item) => {
    const date = new Date(item.forecast_time);
    const isToday = date.toDateString() === new Date().toDateString();
    return isToday && targetHours.includes(date.getHours());
  });

  return (
    <div className="today-forecast">
      <h2 className="section-title">היום</h2>
      {todayForecast.length === 0 ? (
        <p className="today-empty">אין תחזית להיום</p>
      ) : (
        <div className="today-grid">
          {todayForecast.map((item) => (
            <div className="today-slot" key={item.id}>
              <p className="today-slot-time">
                {String(new Date(item.forecast_time).getHours()).padStart(2, "0")}:00
              </p>
              <p className="today-slot-wave">
                {item.wave_height}<span className="today-slot-unit">מ׳</span>
              </p>
              <p className="today-slot-wind">
                {item.wind_speed ? (item.wind_speed * 3.6).toFixed(1) : "-"} קמ"ש
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodayForecast;
