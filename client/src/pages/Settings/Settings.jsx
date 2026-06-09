import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Settings.css";

function Settings() {
  const [beaches, setBeaches] = useState([]);
  const [beachId, setBeachId] = useState("");
  const [minWave, setMinWave] = useState("");
  const [minWind, setMinWind] = useState("");
  const [maxWind, setMaxWind] = useState("");
  const [hasAlerts, setHasAlerts] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const telegramConnected = !!user?.telegram_chat_id;

  useEffect(() => {
    api.get("/beaches").then((res) => setBeaches(res.data));
    api.get("/preferences/").then((res) => {
      const p = res.data;
      if (p.beach_id) setBeachId(p.beach_id);
      if (p.min_wave_height) setMinWave(p.min_wave_height);
      if (p.min_wind_speed) setMinWind(p.min_wind_speed);
      if (p.max_wind_speed) setMaxWind(p.max_wind_speed);
      setHasAlerts(p.has_alerts);
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setError("");
    try {
      await api.post("/preferences/", {
        beach_id: beachId,
        min_wave_height: hasAlerts ? minWave : null,
        min_wind_speed: hasAlerts ? minWind : null,
        max_wind_speed: hasAlerts ? maxWind : null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("שגיאה בשמירה, נסה שוב");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-content">
        <div className="settings-header">
          <p className="settings-label">הגדרות</p>
          <h1 className="settings-title">העדפות שלי</h1>
        </div>

        <div className="settings-card">
          <h2 className="settings-section-title">החוף שלי</h2>
          <p className="settings-section-desc">בחר את החוף שעליו תקבל תחזית</p>
          <select
            className="settings-select"
            value={beachId}
            onChange={(e) => setBeachId(e.target.value)}
          >
            <option value="">-- בחר חוף --</option>
            {beaches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className={`settings-card alerts-card ${!hasAlerts ? "locked" : ""}`}>
          {!hasAlerts && (
            <div className="locked-overlay">
              <span className="lock-icon">🔒</span>
              <p className="lock-title">תכונה למנויים בלבד</p>
              <p className="lock-desc">שדרג את המנוי שלך כדי לקבל התראות טלגרם על תנאים מושלמים</p>
              <button className="upgrade-button" onClick={() => navigate("/plans")}>שדרג עכשיו</button>
            </div>
          )}
          <h2 className="settings-section-title">התראות טלגרם</h2>
          <p className="settings-section-desc">קבע תנאים — התראה תישלח רק כשכולם מתקיימים</p>

          <div className="alerts-group">
            <p className="alerts-group-label">🌊 גלים</p>
            <div className="settings-inputs">
              <div className="settings-field">
                <label className="settings-field-label">גובה גל מינימלי (מ׳)</label>
                <input
                  className="settings-input"
                  type="number"
                  step="0.1"
                  min="0"
                  value={minWave}
                  onChange={(e) => setMinWave(e.target.value)}
                  placeholder="לדוגמה: 1.2"
                  disabled={!hasAlerts}
                />
              </div>
            </div>
          </div>

          <div className="alerts-group">
            <p className="alerts-group-label">💨 רוח</p>
            <div className="settings-inputs">
              <div className="settings-field">
                <label className="settings-field-label">מהירות רוח מינימלית (קמ"ש)</label>
                <input
                  className="settings-input"
                  type="number"
                  step="1"
                  min="0"
                  value={minWind}
                  onChange={(e) => setMinWind(e.target.value)}
                  placeholder="לגולשי רוח, לדוגמה: 15"
                  disabled={!hasAlerts}
                />
              </div>
              <div className="settings-field">
                <label className="settings-field-label">מהירות רוח מקסימלית (קמ"ש)</label>
                <input
                  className="settings-input"
                  type="number"
                  step="1"
                  min="0"
                  value={maxWind}
                  onChange={(e) => setMaxWind(e.target.value)}
                  placeholder="לדוגמה: 25"
                  disabled={!hasAlerts}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card telegram-status-card">
          <div className="telegram-status-row">
            <div>
              <h2 className="settings-section-title">חיבור טלגרם</h2>
              <p className="settings-section-desc">
                {telegramConnected ? "הבוט מחובר ומוכן לשלוח התראות" : "הבוט עדיין לא מחובר"}
              </p>
            </div>
            <div className={`telegram-badge ${telegramConnected ? "connected" : "disconnected"}`}>
              {telegramConnected ? "✓ מחובר" : "לא מחובר"}
            </div>
          </div>
          {!telegramConnected && (
            <button className="connect-telegram-btn" onClick={() => navigate("/connect-telegram")}>
              חבר טלגרם
            </button>
          )}
        </div>

        {error && <p className="settings-error">{error}</p>}

        <button className="settings-save" onClick={handleSave}>
          {saved ? "✓ נשמר בהצלחה" : "שמור הגדרות"}
        </button>
      </div>
    </div>
  );
}

export default Settings;
