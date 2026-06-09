// Converts a wind/wave direction in degrees to a Hebrew compass label.
// Divides the compass into 8 equal 45° sectors starting from North.
function degToHebrew(deg) {
  if (deg == null) return "-";
  const dirs = ["צפון", "צפון-מזרח", "מזרח", "דרום-מזרח", "דרום", "דרום-מערב", "מערב", "צפון-מערב"];
  return dirs[Math.round(deg / 45) % 8];
}

function CurrentConditions({ data }) {
  const now = new Date();
  const current = data.find((hour) => new Date(hour.forecast_time) >= now);

  return (
    <div className="current-conditions">
      <p className="cc-label">עכשיו</p>
      {!current ? (
        <p className="cc-no-data">אין נתונים זמינים</p>
      ) : (
        <div className="cc-grid">
          <div className="cc-stat">
            <p className="cc-stat-label">גובה גל</p>
            <p className="cc-stat-value">
              {current.wave_height}
              <span className="cc-stat-unit">מ׳</span>
            </p>
          </div>
          <div className="cc-stat">
            <p className="cc-stat-label">מהירות רוח</p>
            <p className="cc-stat-value">
              {current ? (current.wind_speed * 3.6).toFixed(1) : "-"}
              <span className="cc-stat-unit">קמ"ש</span>
            </p>
          </div>
          <div className="cc-stat">
            <p className="cc-stat-label">כיוון רוח</p>
            <p className="cc-stat-value" style={{ fontSize: "18px" }}>
              {degToHebrew(current.wind_direction)}
            </p>
          </div>
          <div className="cc-stat">
            <p className="cc-stat-label">מחזור גל</p>
            <p className="cc-stat-value">
              {current.wave_period}
              <span className="cc-stat-unit">שנ׳</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentConditions;
