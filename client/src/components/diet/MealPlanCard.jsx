export default function MealPlanCard({ item }) {
  return (
    <article className="hub-card meal-card">
      <p className="hub-tag">{item.meal}</p>
      <h3>{item.title}</h3>
      <span>{item.calories} kcal</span>
      <small>{item.highlight}</small>
    </article>
  );
}
