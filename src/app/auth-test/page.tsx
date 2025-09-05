"use client";
import { useState } from "react";

export default function AuthTestPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("secret123");
  const [name, setName] = useState("Alice");
  const [out, setOut] = useState<unknown>(null);

  async function call(path: string, method: "GET" | "POST", body?: any) {
    const res = await fetch(path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      // cookies are sent automatically to same-origin routes
    });
    let payload: any;
    try {
      payload = await res.json();
    } catch {
      payload = await res.text();
    }
    setOut({ status: res.status, payload });
  }

  const box: React.CSSProperties = { border: "1px solid #ddd", padding: 12, borderRadius: 8 };
  const btn: React.CSSProperties = { border: "1px solid #444", padding: "8px 12px", borderRadius: 6, background: "#fff", cursor: "pointer" };
  const input: React.CSSProperties = { border: "1px solid #ccc", padding: 8, borderRadius: 6, width: "100%" };

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Auth Test</h1>

      <section style={{ ...box, marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          <div>Email</div>
          <input style={input} value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label style={{ display: "block", marginBottom: 8 }}>
          <div>Password</div>
          <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label style={{ display: "block", marginBottom: 8 }}>
          <div>Name (register only)</div>
          <input style={input} value={name} onChange={e => setName(e.target.value)} />
        </label>
      </section>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button style={btn} onClick={() => call("/api/auth/register","POST",{ email, password, name })}>Register</button>
        <button style={btn} onClick={() => call("/api/auth/login","POST",{ email, password })}>Login</button>
        <button style={btn} onClick={() => call("/api/auth/me","GET")}>Me</button>
        <button style={btn} onClick={() => call("/api/auth/refresh","POST")}>Refresh</button>
        <button style={btn} onClick={() => call("/api/auth/logout","POST")}>Logout</button>
      </div>

      <pre style={{ ...box, background: "#111", color: "#fff", overflow: "auto" }}>
        {JSON.stringify(out, null, 2)}
      </pre>
    </main>
  );
}
