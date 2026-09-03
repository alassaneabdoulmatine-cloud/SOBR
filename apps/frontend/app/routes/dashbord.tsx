import { useSession } from '~/lib/auth-client';

export default function Dashbord() {
  const { data } = useSession();

  return (
    <div className="flex flex-col">
      <span>welcom to dasbord</span>
      <span>email : {data?.user.email}</span>
      <span>name : {data?.user.name}</span>
    </div>
  );
}
