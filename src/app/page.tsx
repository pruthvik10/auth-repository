import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Auth System</h1>
      <p style={{ marginTop: 12 }}>
        <Link href="/auth-test">Open the Auth Test page →</Link>
      </p>
    </main>
  );
}
