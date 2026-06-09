import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import CurrentConditions from "./CurrentConditions";
import TodayForecast from "./TodayForecast";
import WeekForecast from "./WeekForecast";
import "./Dashboard.css";

function Dashboard() {
  const [forecast, setForecast] = useState([]);
  const [beachName, setBeachName] = useState("");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/forecasts/my-beach")
      .then((res) => {
        setBeachName(res.data.beach_name);
        setForecast(res.data.forecasts);
        setStatus("ok");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStatus("no-beach");
        } else {
          setStatus("error");
        }
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <p className="dashboard-empty-text">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  if (status === "no-beach") {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">🏖️</div>
          <h2 className="dashboard-empty-title">ברוך הבא!</h2>
          <p className="dashboard-empty-text">עדיין לא בחרת חוף. לחץ על הכפתור כדי להתחיל.</p>
          <button className="dashboard-empty-btn" onClick={() => navigate("/settings")}>
            בחר חוף
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">⚠️</div>
          <p className="dashboard-empty-text">שגיאה בטעינת הנתונים, נסה לרענן את הדף</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <p className="dashboard-header-label">תחזית גלים</p>
          <h1 className="dashboard-header-beach">{beachName}</h1>
        </div>
        <CurrentConditions data={forecast} />
        <TodayForecast data={forecast} />
        <WeekForecast data={forecast} />
      </div>
    </div>
  );
}

export default Dashboard;
