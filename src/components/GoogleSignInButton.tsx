import { Button } from "./ui/button"
interface GoogleSignInButtonProps {
  children: React.ReactNode
}
const GoogleSignInButton = ({ children }: GoogleSignInButtonProps) => {
  const loginWithGoogle = async () => {
    console.log("login with google")
  }
  return <Button className="w-full" onClick={loginWithGoogle}>
    {children}
  </Button>
}
export default GoogleSignInButton
