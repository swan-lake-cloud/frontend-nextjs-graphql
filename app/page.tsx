// app/page.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => { setToken(getToken()); }, []);
  return (
    <div className="card">
      <h1>Boilerplate Next.js + GraphQL (TypeScript)</h1>
      <p>Exemple minimal pour : <strong>inscription</strong>, <strong>connexion</strong> (identifiant = email ou username), et <strong>déconnexion</strong> via JWT.</p>
      <ul>
        <li><Link href="/signup">Créer un compte</Link></li>
        <li><Link href="/login">Se connecter</Link></li>
        <li><Link href="/logout">Se déconnecter</Link></li>
      </ul>
      <p>Statut : {token ? (<span className="success">Connecté</span>) : (<span className="notice">Hors ligne</span>)}{token && (<>
        {' '}<small>(jeton stocké dans <code>localStorage</code>)</small>
      </>)}</p>
    </div>
  );
}
