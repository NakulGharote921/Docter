export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="hub-section-header">
      <div>
        {eyebrow ? <p className="hub-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
