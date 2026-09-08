import { Outlet, redirect } from 'react-router';
import { organization } from '~/lib/auth-client';

export async function loader({ request }: { request: Request }) {
  // user must have one organization
  const { data } = await organization.getOrganization({
    fetchOptions: { headers: request.headers },
  });
  if (!data) {
    throw redirect('/workspace');
  }
}

export default function BodyLayout() {
  return <Outlet />;
}
