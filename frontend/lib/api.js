export const API_BASE = "http://localhost:4000/api/meta";

export async function getOverview() {
  const res = await fetch(`${API_BASE}/overview`);
  return res.json();
}
