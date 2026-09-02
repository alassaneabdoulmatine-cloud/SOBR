import { Button } from "~/components/ui/button"
import { signOut, useSession } from "../lib/auth-client"
import { useNavigate } from "react-router"
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";

type post = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export default function Dashbord() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [posts, setPosts] = useState<post[]>([])
    console.log("posts", posts)

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

    async function createPost() {
        const res = await fetch("http://localhost:4000/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title,
                content,
            }),
        })
    }

    useEffect(() => {
        async function getposts() {
            const posts = await fetch("http://localhost:4000/post", {
                method: "GET",
                credentials: "include",
            })
            const data = await posts.json()
            console.log("posts", posts)
            console.log(data)
            setPosts(data)

        }
        getposts()
    }, [])

    return (
        <div>
            <span>
                welcom to Dashbord {data?.user?.email}
            </span>
            <Button
                className="cursor-pointer"
                onClick={() => { signOutuser() }}
            >Déconnexion</Button>
            <div className="flex flex-row gap-4 max-w-2xl mx-auto my-4">
                <Input
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    placeholder="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    className="cursor-pointer"
                    onClick={() => { createPost() }}
                >Créer</Button>
            </div>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold">les posts</h1>
                {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-md p-4 mb-4">
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { getSession, signOut } from "~/lib/auth-client";
// import {
//     Form,
//     redirect,
//     useNavigation,
// } from "react-router";
// import type { Route } from "./+types/dashbord";


// type Post = {
//     id: string;
//     title: string;
//     content: string;
//     createdAt: string;
//     updatedAt: string;
// };

// export async function loader({ request }: Route.LoaderArgs) {
//     const session = await getSession({
//         fetchOptions: {
//             headers: request.headers,
//         },
//     });

//     // if (!session.data) {
//     //     throw redirect("/login");
//     // }

//     const postsResponse = await fetch("http://localhost:4000/post", {
//         method: "GET",
//         headers: {
//             Cookie: request.headers.get("Cookie") ?? "",
//         },
//     });

//     if (!postsResponse.ok) {
//         throw new Response("Failed to get posts", {
//             status: postsResponse.status,
//         });
//     }

//     const posts: Post[] = await postsResponse.json();

//     return {
//         user: session.data?.user,
//         posts,
//     };
// }

// export async function action({ request }: Route.ActionArgs) {
//     const formData = await request.formData();
//     const intent = formData.get("intent");

//     // // Déconnexion
//     // if (intent === "logout") {
//     //     await signOut({
//     //         fetchOptions: {
//     //             headers: request.headers,
//     //         },
//     //     });

//     //     throw redirect("/login");
//     // }

//     // Création d'un post
//     if (intent === "create-post") {
//         const title = formData.get("title");
//         const content = formData.get("content");

//         if (
//             typeof title !== "string" ||
//             typeof content !== "string" ||
//             !title.trim() ||
//             !content.trim()
//         ) {
//             return {
//                 error: "Title and content are required",
//             };
//         }

//         const response = await fetch("http://localhost:4000/post", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Cookie: request.headers.get("Cookie") ?? "",
//             },
//             body: JSON.stringify({
//                 title,
//                 content,
//             }),
//         });

//         if (!response.ok) {
//             return {
//                 error: "Failed to create post",
//             };
//         }

//         return redirect("/dashboard");
//     }

//     return null;
// }

// export default function Dashboard({
//     loaderData,
// }: Route.ComponentProps) {
//     const navigation = useNavigation();

//     const isCreating =
//         navigation.state === "submitting" &&
//         navigation.formData?.get("intent") === "create-post";

//     const isLoggingOut =
//         navigation.state === "submitting" &&
//         navigation.formData?.get("intent") === "logout";

//     return (
//         <div>
//             <div className="flex items-center justify-between">
//                 <span>
//                     Welcome to Dashboard {loaderData.user?.email}
//                 </span>

//                 <Form method="post">
//                     <input
//                         type="hidden"
//                         name="intent"
//                         value="logout"
//                     />

//                     <Button
//                         type="submit"
//                         disabled={isLoggingOut}
//                         className="cursor-pointer"
//                     >
//                         {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
//                     </Button>
//                 </Form>
//             </div>

//             <Form
//                 method="post"
//                 className="flex flex-row gap-4 max-w-2xl mx-auto my-4"
//             >
//                 <input
//                     type="hidden"
//                     name="intent"
//                     value="create-post"
//                 />

//                 <Input
//                     name="title"
//                     placeholder="title"
//                 />

//                 <Input
//                     name="content"
//                     placeholder="content"
//                 />

//                 <Button
//                     type="submit"
//                     disabled={isCreating}
//                     className="cursor-pointer"
//                 >
//                     {isCreating ? "Création..." : "Créer"}
//                 </Button>
//             </Form>

//             <div className="max-w-2xl mx-auto">
//                 <h1 className="text-2xl font-bold">
//                     Les posts
//                 </h1>

//                 {loaderData.posts.map((post) => (
//                     <div
//                         key={post.id}
//                         className="border border-gray-200 rounded-md p-4 mb-4"
//                     >
//                         <h2>{post.title}</h2>
//                         <p>{post.content}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
