export default function Loading() {
  return (
    <div className="loading" aria-busy="true">
      <p className="muted">Chargement…</p>
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}