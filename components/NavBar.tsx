// components/NavBar.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';

export default function NavBar() {
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(() => { setLogged(Boolean(getToken())); }, []);
  return (
    <nav>
      <div className="nav-inner">
        <div>
          <Link href="/">Accueil</Link>
          <Link href="/signup">Inscription</Link>
          {logged ? (
            <Link href="/logout">Déconnexion</Link>
          ) : (
            <Link href="/login">Connexion</Link>
          )}
        </div>
        <div style={{fontSize:'0.9rem', color:'#9ca3af'}}>
          {logged ? 'Connecté' : 'Hors ligne'}
        </div>
      </div>
    </nav>
  );
}
