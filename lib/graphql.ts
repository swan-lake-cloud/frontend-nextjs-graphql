// lib/graphql.ts
const defaultEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/jaxrs-liquibase-graphql-api-0.0.1-SNAPSHOT/api/graphql';

export async function gqlRequest<T = any>(query: string, variables: Record<string, any> = {}, token?: string): Promise<T> {
  const res = await fetch(defaultEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.errors?.[0]?.message || `HTTP ${res.status}`);
  }
  if (json.errors && json.errors.length) {
    const messages = json.errors.map((e: any) => e.message).join('; ');
    throw new Error(messages);
  }
  return json.data as T;
}

export function getEndpoint(){ return defaultEndpoint; }
