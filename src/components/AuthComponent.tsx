import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { LogoutBtn } from "./LogoutBtn"
export const AuthComponent = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex gap-4">
      {session?.user ? <LogoutBtn /> :
        <>
          <SignupBtn />
          <LoginBtn />
        </>
      }
    </div>
  )
}
const LoginBtn = () => {
  return (
    <Link href='/sign-in' className={buttonVariants({
      size: 'sm',
      variant: 'secondary'
    })}>
      Login
    </Link>
  )
}
const SignupBtn = () => {
  return (
    <Link href="/sign-up" className={buttonVariants({
      size: 'sm',
      variant: 'secondary'
    })}>
      Signup
    </Link>
  )
}
