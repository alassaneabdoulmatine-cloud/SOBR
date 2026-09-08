import { redirect } from 'react-router';
import { getSession } from './auth-client';

export async function requireAnonymous(headers: Headers) {
  const { data: session, error } = await getSession({
    fetchOptions: { headers },
  });

  if (session && !error) {
    throw redirect('/dashboard');
  }

  return null;
}

export async function requireUser(headers: Headers) {
  const { data: session, error } = await getSession({
    fetchOptions: { headers },
  });
  if (!session && !error) {
    throw redirect('/login');
  }

  return null;
}
