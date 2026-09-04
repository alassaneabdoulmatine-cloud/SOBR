import { Outlet } from 'react-router';
import { requireUser } from '~/lib/auth-server';

export async function loader({ request }: { request: Request }) {
  await requireUser(request.headers);
}

export default function PrivateLayout() {
  return <Outlet />;
}
