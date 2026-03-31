export default function DietProgress({ waterProgress, mealsCompleted, totalMeals }) {
  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>Nutrition progress</h3>
        <span>{mealsCompleted}/{totalMeals} meals</span>
      </div>

      <div className="hub-progress-group">
        <div>
          <div className="hub-progress-label">
            <span>Hydration</span>
            <strong>{waterProgress}%</strong>
          </div>
          <div className="hub-progress-track">
            <div style={{ width: `${waterProgress}%` }} />
          </div>
        </div>

        <div>
          <div className="hub-progress-label">
            <span>Meal completion</span>
            <strong>{Math.round((mealsCompleted / totalMeals) * 100)}%</strong>
          </div>
          <div className="hub-progress-track">
            <div style={{ width: `${Math.round((mealsCompleted / totalMeals) * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
