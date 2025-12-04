"use client";
import { useEffect, useState } from "react";
import MetricsCard from "./components/MetricsCard";
import ChartBox from "./components/ChartBox";
import Loader from "./components/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch("http://localhost:4000/api/meta/overview");
        const res = await req.json();
        setMetaData(res);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "30px"
      }}>
        <MetricsCard title="CPM" value={metaData.cpm} />
        <MetricsCard title="CPC" value={metaData.cpc} />
        <MetricsCard title="CTR" value={metaData.ctr + '%'} />
        <MetricsCard title="ROAS" value={metaData.roas} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ChartBox title="Daily Spend" chartData={metaData.chart} />
      </div>
    </div>
  );
}
