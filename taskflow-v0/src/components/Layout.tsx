import { NavLink, Outlet } from "react-router-dom";

import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          TaskFlow
        </NavLink>

        <nav className="nav" aria-label="Navigation principale">
          <NavLink to="/projects" end>
            Voir les projets
          </NavLink>
          <NavLink to="/projects/new">Nouveau projet</NavLink>
          <NavLink to="/about">À propos</NavLink>
        </nav>

        <ThemeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}