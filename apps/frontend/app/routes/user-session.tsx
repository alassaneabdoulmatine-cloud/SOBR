import type { Route } from "./+types/user-session";
import { getSession } from "~/lib/auth-client";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession({
        fetchOptions: {
            headers: request.headers,
        },
    });

    return {
        session: session.data,
    };
}

export default function UserSession({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div>
            <h1>User Session</h1>
            <p>{loaderData.session?.user?.email}</p>
        </div>
    );
}