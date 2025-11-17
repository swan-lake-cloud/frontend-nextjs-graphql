// app/logout/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { gqlRequest } from '../../lib/graphql';
import { LOGOUT_MUTATION } from '../../lib/mutations';
import { clearToken, getToken } from '../../lib/auth';

type LogoutResponse = { logout: string };

export default function LogoutPage() {
  const [status, setStatus] = useState<string>('Initialisation…');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      const token = getToken();
      if (!token) {
        setStatus('Aucun jeton présent en local.');
        return;
      }
      setStatus('Déconnexion…');
      try {
        const data = await gqlRequest<LogoutResponse>(LOGOUT_MUTATION, { token }, token);
        const msg = data?.logout || 'Déconnexion effectuée.';
        setStatus(msg);
      } catch (e: any) {
        setError(e.message || String(e));
      } finally {
        clearToken();
      }
    }
    run();
  }, []);

  return (
    <div className="card">
      <h1>Déconnexion</h1>
      <p className={error ? 'error' : 'success'}>{error ? `Erreur: ${error}` : status}</p>
      <p><em>Le jeton local a été supprimé.</em></p>
    </div>
  );
}
