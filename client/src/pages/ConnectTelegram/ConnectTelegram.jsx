import { useState } from "react";
import api from "../../api/api";
import "./ConnectTelegram.css";

function ConnectTelegram() {
  const [chatId, setChatId] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    try {
      await api.post("/auth/update-telegram", { telegram_chat_id: chatId });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("שגיאה בשמירה, בדוק שה-Chat ID נכון ונסה שוב");
    }
  };

  const steps = [
    { num: "1", text: 'לחץ על הכפתור למטה כדי לפתוח את הבוט בטלגרם' },
    { num: "2", text: 'שלח לבוט את הפקודה /start' },
    { num: "3", text: 'הבוט יחזיר לך את ה-Chat ID האישי שלך' },
    { num: "4", text: 'הכנס את ה-Chat ID בשדה למטה ולחץ שמור' },
  ];

  return (
    <div className="telegram-page">
      <div className="telegram-content">
        <div className="telegram-header">
          <p className="telegram-label">חיבור</p>
          <h1 className="telegram-title">קבל התראות בטלגרם</h1>
          <p className="telegram-subtitle">חבר את הבוט כדי לקבל התראה כשהתנאים מושלמים</p>
        </div>

        <div className="telegram-card">
          <div className="telegram-icon-wrap">
            <span className="telegram-icon">✈️</span>
          </div>
          <h2 className="telegram-card-title">איך מתחברים?</h2>
          <div className="telegram-steps">
            {steps.map((s) => (
              <div className="telegram-step" key={s.num}>
                <span className="step-num">{s.num}</span>
                <p className="step-text">{s.text}</p>
              </div>
            ))}
          </div>

          <a
            className="telegram-bot-link"
            href="https://t.me/wave_tracker_bot"
            target="_blank"
            rel="noreferrer"
          >
            פתח את הבוט בטלגרם ←
          </a>
        </div>

        <div className="telegram-card">
          <h2 className="telegram-card-title">הכנס את ה-Chat ID שלך</h2>
          <p className="telegram-card-desc">תמצא אותו בהודעה שהבוט שלח לך אחרי /start</p>
          <div className="telegram-input-row">
            <input
              className="telegram-input"
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="לדוגמה: 123456789"
            />
            <button className="telegram-save" onClick={handleSave}>
              שמור
            </button>
          </div>
          {saved && <p className="telegram-success">✓ הטלגרם חובר בהצלחה!</p>}
          {error && <p className="telegram-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ConnectTelegram;
