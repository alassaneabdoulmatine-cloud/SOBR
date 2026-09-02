import { useSession } from "~/lib/auth-client";

export default function ClientSession() {
    const { data, error } = useSession()
    return (
        <div>
            <span>user client session</span>
            <p>{data?.session?.token}</p>
        </div>
    )
}