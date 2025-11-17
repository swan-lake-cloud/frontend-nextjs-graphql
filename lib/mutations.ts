// lib/mutations.ts
export const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = /* GraphQL */ `
  mutation Logout($token: String!) {
    logout(token: $token)
  }
`;

export const SIGNUP_MUTATION_NAME = process.env.NEXT_PUBLIC_SIGNUP_MUTATION_NAME || 'createAccount';

export function buildSignupMutation(): string {
  return /* GraphQL */ `
    mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $username: String!, $passwordHash: String!) {
      ${SIGNUP_MUTATION_NAME}(firstName: $firstName, lastName: $lastName, email: $email, username: $username, passwordHash: $passwordHash)
    }
  `;
}
