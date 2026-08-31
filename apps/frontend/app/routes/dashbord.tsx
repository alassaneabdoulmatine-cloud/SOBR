import { Button } from "~/components/ui/button"
import { signOut, useSession } from "../lib/auth-client"
import { useNavigate } from "react-router"

export default function Dashbord() {
    const navigate = useNavigate();

    const { data } = useSession()
    async function signOutuser() {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate("/login")
                }
            }
        })
    }
    return (
        <div>
            <span>
                welcom to Dashbord {data?.user?.email}
            </span>
            <Button
                className="cursor-pointer"
                onClick={() => { signOutuser() }}
            >Déconnexion</Button>
        </div>
    )
}