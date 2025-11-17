// app/login/page.tsx
'use client';
import { useState, FormEvent } from 'react';
import TextInput from '../../components/TextInput';
import { gqlRequest } from '../../lib/graphql';
import { LOGIN_MUTATION } from '../../lib/mutations';
import { setToken } from '../../lib/auth';
import { useRouter } from 'next/navigation';

type LoginResponse = { login: string };

export default function LoginPage() {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      const data = await gqlRequest<LoginResponse>(LOGIN_MUTATION, {  });
      const jwt = data?.login;
      if (!jwt) throw new Error('JWT manquant dans la réponse');
      setToken(jwt);
      router.push('/');
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Connexion</h1>
      <p>Identifiant = <em>email</em> ou <em>username</em>.</p>
      <form onSubmit={onSubmit}>
        <TextInput id="identifier" label="Identifiant (email ou username)" value={identifier} onChange={setIdentifier} autoComplete="username" />
        <TextInput id="password" label="Mot de passe" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
        <div style={{marginTop:'0.5rem'}}>
          <button type="submit" disabled={loading}>{loading ? 'Connexion…' : 'Se connecter'}</button>
        </div>
      </form>
      {error && <p className="error" style={{marginTop:'1rem'}}>Erreur: {error}</p>}
    </div>
  );
}
