import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Meta Analytics MVP</h1>
      <p>Track ads performance quickly.</p>

      <Link href="/dashboard">
        <button style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          border: "none",
          marginTop: "20px"
        }}>
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
