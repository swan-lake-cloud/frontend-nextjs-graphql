# Next.js + GraphQL Auth Boilerplate (TypeScript)

Frontend minimal (Next.js + React + TypeScript) avec :

- **Inscription** (formulaire: `firstName`, `lastName`, `email`, `username`, `passwordHash` (SHA-256 côté client))
- **Connexion** (mutation `login(identifier: String!, password: String!): String!`, accepte **email** ou **username** comme identifiant, renvoie un **JWT** stocké en `localStorage`)
- **Déconnexion** (mutation `logout(token: String!): String!`, envoie aussi l'en-tête `Authorization: Bearer <JWT>`)

## ⚙️ Endpoint GraphQL
Par défaut, l'endpoint est:

```
http://localhost:8080/jaxrs-liquibase-graphql-api-0.0.1-SNAPSHOT/api/graphql
```

Vous pouvez le surcharger via une variable d'environnement **publique** :

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/jaxrs-liquibase-graphql-api-0.0.1-SNAPSHOT/api/graphql
```

> ⚠️ **CORS** : Assurez-vous que votre backend autorise l'origine (http://localhost:3000 par défaut) et l'en-tête `Authorization`.

## 🔧 Mutation d'inscription
Le nom exact de la mutation d'inscription dépend de votre backend. Par défaut ce boilerplate appelle **`createAccount(...)`**. Si votre mutation s'appelle autrement (exemples: `signUp`, `createUser`, `register`), définissez :

```
NEXT_PUBLIC_SIGNUP_MUTATION_NAME=createAccount
```

Le formulaire enverra :

```graphql
mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $username: String!, $passwordHash: String!) {
  <SIGNUP_MUTATION_NAME>(firstName: $firstName, lastName: $lastName, email: $email, username: $username, passwordHash: $passwordHash)
}
```

## 🚀 Démarrage

```bash
# 1) Installer les dépendances
npm install

# 2) Lancer en développement
npm run dev
# -> http://localhost:3000
```

## 📁 Pages
- `/signup` : création de compte (hash SHA-256 côté client via Web Crypto).
- `/login` : connexion avec identifiant (email ou username) + mot de passe -> stocke le JWT.
- `/logout` : appelle la mutation `logout` avec `token`, supprime le JWT local.

## 🧱 Structure
```
app/
  layout.tsx
  page.tsx
  signup/page.tsx
  login/page.tsx
  logout/page.tsx
lib/
  graphql.ts       # client fetch GraphQL
  mutations.ts     # mutations (login/logout + inscription paramétrable)
  auth.ts          # helpers token localStorage
  hash.ts          # SHA-256 (Web Crypto)
components/
  NavBar.tsx
  TextInput.tsx
```

## 🔐 Notes sécurité
- Le hash côté client **n'exonère pas** de hasher/étirer le mot de passe côté serveur (ex: Argon2, bcrypt). Ici, `passwordHash` est un exemple minimal basé sur **SHA-256** côté client.
- Stocker un JWT en `localStorage` est simple mais sensible aux attaques XSS. Évaluez l'usage de cookies `HttpOnly` si possible.

Bon dev !
