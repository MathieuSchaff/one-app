import Link from "next/link"
import { buttonVariants } from "./ui/button"

export const AuthComponent = () => {
  return (
    <div className="flex gap-4">
      <LoginBtn />
      <SignupBtn />
      {/* <LogoutBtn /> */}
    </div>
  )
}
const LoginBtn = () => {
  return (
    <Link href='/sign-in' className={buttonVariants({
      size: 'sm',
      variant: 'secondary'
    })} >
      Login
    </Link>
  )

}
const LogoutBtn = () => {
  return (
    <Link href="/logout" className={buttonVariants({
      size: 'lg',
      variant: 'secondary'
    })}>Logout</Link>
  )
}
const SignupBtn = () => {
  return (
    <Link href="/sign-up" className={buttonVariants({
      size: 'sm',
      variant: 'secondary'
    })}>Signup</Link>
  )
}
