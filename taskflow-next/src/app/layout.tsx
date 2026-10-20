"use client";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./globals.css";

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  return (
    <html lang="fr">
      <body>
        <div className="app">
          <header className="topbar">
            <Link href="/" className="brand">
              TaskFlow
            </Link>

            <nav className="nav" aria-label="Navigation">
              <Link href="/" className={isHome ? "active" : undefined}>
                Projets
              </Link>
              <Link
                href="/about"
                className={isAbout ? "active" : undefined}
              >
                À propos
              </Link>
            </nav>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}