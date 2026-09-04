// layouts/anonymous-layout.tsx

import { Outlet } from 'react-router';
import { requireAnonymous } from '~/lib/auth-server';

export async function loader({ request }: { request: Request }) {
  await requireAnonymous(request.headers);
}

export default function AnonymousLayout() {
  return <Outlet />;
}
