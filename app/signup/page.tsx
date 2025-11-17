// app/signup/page.tsx
'use client';
import { useState, FormEvent } from 'react';
import TextInput from '../../components/TextInput';
import { gqlRequest } from '../../lib/graphql';
import { buildSignupMutation } from '../../lib/mutations';
import { sha256Hex } from '../../lib/hash';

type SignUpVars = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  passwordHash: string;
};

type SignUpResponseGeneric = Record<string, string | null>;

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setMessage(null); setLoading(true);
    try {
      const passwordHash = await sha256Hex(password);
      const mutation = buildSignupMutation();
      const vars: SignUpVars = { firstName, lastName, email, username, passwordHash };
      const data = await gqlRequest<SignUpResponseGeneric>(mutation, vars);
      const mutationName = (process.env.NEXT_PUBLIC_SIGNUP_MUTATION_NAME || 'createAccount') as string;
      const result = data?.[mutationName];
      setMessage((result as string) || 'Compte créé ✅');
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Créer un compte</h1>
      <form onSubmit={onSubmit}>
        <TextInput id="firstName" label="Prénom" value={firstName} onChange={setFirstName} autoComplete="given-name" />
        <TextInput id="lastName" label="Nom" value={lastName} onChange={setLastName} autoComplete="family-name" />
        <TextInput id="email" label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <TextInput id="username" label="Nom d'utilisateur" value={username} onChange={setUsername} autoComplete="username" />
        <TextInput id="password" label="Mot de passe" type="password" value={password} onChange={setPassword} autoComplete="new-password" />
        <div style={{display:'flex', gap:'0.75rem', alignItems:'center', marginTop:'0.5rem'}}>
          <button type="submit" disabled={loading}>{loading ? 'Création…' : 'Créer le compte'}</button>
          <small className="muted">Envoi de <code>passwordHash</code> côté client (SHA-256).</small>
        </div>
      </form>
      {message && <p className="success" style={{marginTop:'1rem'}}>{message}</p>}
      {error && <p className="error" style={{marginTop:'1rem'}}>Erreur: {error}</p>}
    </div>
  );
}
