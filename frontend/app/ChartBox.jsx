export default function ChartBox({ title, chartData }) {
  return (
    <div style={{
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>

      <div style={{
        marginTop: "20px",
        display: "flex",
        gap: "10px",
        height: "120px",
        alignItems: "flex-end"
      }}>
        {chartData.map((v, i) => (
          <div key={i} style={{
            width: "20px",
            height: v,
            background: "#4b7bec",
            borderRadius: "4px"
          }} />
        ))}
      </div>
    </div>
  );
}
