// app/layout.tsx
import './globals.css';
import NavBar from '../components/NavBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boilerplate Next.js + GraphQL Auth (TS)',
  description: "Inscription, connexion (email ou username) et déconnexion (JWT) avec GraphQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <NavBar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
