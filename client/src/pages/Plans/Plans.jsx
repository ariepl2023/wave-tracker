import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Plans.css";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data));
    if (user) setCurrentPlanId(user.plan_id);
  }, [user]);

  const handleSubscribe = async (planId) => {
    setError("");
    setLoading(planId);
    try {
      await api.post(`/plans/subscribe/${planId}`);
      setCurrentPlanId(planId);
    } catch {
      setError("שגיאה בעדכון המנוי, נסה שוב");
    }
    setLoading(null);
  };

  const planIcons = { Free: "🏄", Pro: "⚡" };
  const planFeatures = {
    Free: ["תחזית גלים לכל החופים", "צפייה בנתוני עכשיו", "תחזית שבועית"],
    Pro: ["כל מה שב-Free", "התראות טלגרם", "הגדרת סף גל ורוח", "עד 3 חופים מועדפים"],
  };

  return (
    <div className="plans-page">
      <div className="plans-content">
        <div className="plans-header">
          <p className="plans-label">מנויים</p>
          <h1 className="plans-title">בחר את התוכנית שלך</h1>
          <p className="plans-subtitle">קבל התראות טלגרם כשהתנאים מושלמים</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const isPro = plan.has_alerts;
            return (
              <div key={plan.id} className={`plan-card ${isPro ? "plan-pro" : ""} ${isCurrent ? "plan-current" : ""}`}>
                {isPro && <div className="plan-badge">הכי פופולרי</div>}
                <div className="plan-icon">{planIcons[plan.name] || "🌊"}</div>
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-desc">{plan.description}</p>
                <div className="plan-price">
                  <span className="plan-price-amount">
                    {plan.price === 0 ? "חינם" : `₪${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="plan-price-period">/ חודש</span>}
                </div>
                <ul className="plan-features">
                  {(planFeatures[plan.name] || []).map((f) => (
                    <li key={f}><span className="feature-check">✓</span>{f}</li>
                  ))}
                </ul>
                <button
                  className={`plan-button ${isCurrent ? "plan-button-current" : ""} ${isPro ? "plan-button-pro" : ""}`}
                  onClick={() => !isCurrent && handleSubscribe(plan.id)}
                  disabled={isCurrent || loading === plan.id}
                >
                  {isCurrent ? "התוכנית הנוכחית שלך" : loading === plan.id ? "מעדכן..." : "בחר תוכנית"}
                </button>
              </div>
            );
          })}
        </div>

        {error && <p className="plans-error">{error}</p>}
        <button className="plans-back" onClick={() => navigate("/settings")}>
          ← חזרה להגדרות
        </button>
      </div>
    </div>
  );
}

export default Plans;
