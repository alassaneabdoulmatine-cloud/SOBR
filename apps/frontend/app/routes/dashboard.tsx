import { Button } from '~/components/ui/button';
import { getSession, signOut } from '~/lib/auth-client';
import type { Route } from './+types/dashboard';

export async function loader({ request }: Route.LoaderArgs) {
  const { data: session, error } = await getSession({
    fetchOptions: { headers: request.headers },
  });

  if (error || !session) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return { session };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData.session;

  return (
    <div className="flex flex-col">
      <span>Welcome to dashboard</span>
      <span>Email : {user.email}</span>
      <span>Name : {user.name}</span>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
