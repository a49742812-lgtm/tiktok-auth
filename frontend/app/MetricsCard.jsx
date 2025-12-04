export default function MetricsCard({ title, value }) {
  return (
    <div style={{
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
