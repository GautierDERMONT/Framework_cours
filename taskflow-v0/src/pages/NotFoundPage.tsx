import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section>
      <h2>404 - Page introuvable</h2>
       <Link to="/" className="link-button">← Retour à l'accueil</Link>
    </section>
  );
}