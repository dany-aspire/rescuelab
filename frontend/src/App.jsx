import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export default function App() {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Checking services…");
  const [error, setError] = useState("");

  async function loadIncidents() {
    const response = await fetch(`${apiBaseUrl}/incidents`);
    if (!response.ok) throw new Error("Could not load incidents");
    const body = await response.json();
    setIncidents(body.incidents);
  }

  useEffect(() => {
    Promise.all([
      fetch(`${apiBaseUrl}/health`).then((response) => {
        if (!response.ok) throw new Error("Health check failed");
        return response.json();
      }),
      loadIncidents()
    ]).then(() => setStatus("All systems operational"))
      .catch((problem) => {
        setStatus("Service degraded");
        setError(problem.message);
      });
  }, []);

  async function submitIncident(event) {
    event.preventDefault();
    setError("");
    const response = await fetch(`${apiBaseUrl}/incidents`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (!response.ok) {
      const body = await response.json();
      return setError(body.error || "Could not create incident");
    }
    setTitle("");
    await loadIncidents();
  }

  return (
    <main className="shell">
      <header>
        <div>
          <p className="eyebrow">DEPLOYMENT RESCUE TRAINING</p>
          <h1>RescueLab</h1>
          <p className="intro">A known-good application today. A realistic customer incident tomorrow.</p>
        </div>
        <span className={status.includes("operational") ? "badge healthy" : "badge"}>{status}</span>
      </header>

      <section className="panel">
        <h2>Open an incident</h2>
        <form onSubmit={submitIncident}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength="120" placeholder="Describe the observed symptom" required />
          <button type="submit">Create incident</button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      <section className="panel">
        <div className="section-heading"><h2>Incident queue</h2><span>{incidents.length} total</span></div>
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <span className="incident-id">RL-{String(incident.id).padStart(3, "0")}</span>
              <strong>{incident.title}</strong>
              <span className="status">{incident.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
