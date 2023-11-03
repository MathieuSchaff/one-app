import { NavigationMenuDemo } from "./NavBar";
import { AuthComponent } from "./AuthComponent";
export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-blue-600 bg-opacity-90 shadow-md mx-8 mt-4 rounded-lg">
      <NavigationMenuDemo />
      <AuthComponent />
    </header>
  )
}
