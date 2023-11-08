import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Documents() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      {session && JSON.stringify(session)}
      <h1>Documents</h1>
      {/* {session && */}
      {/*   <p> */}
      {/*     You are currently signed in as <strong>{session.user.email}</strong>. */}
      {/*   </p>} */}
      <p>
        This is the documents page. You can access this page at{" "}
        <code>/documents</code>.
      </p>
    </div>);
}
