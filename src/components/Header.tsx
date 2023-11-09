import { NavigationMenuDemo } from "./NavBar";
import { AuthComponent } from "./AuthComponent";
import { ModeToggle } from "./mode-toggle";
export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-background  shadow-md mx-8 mt-4 rounded-lg">
      <NavigationMenuDemo />
      <div className="flex gap-4 items-center">
        <AuthComponent />
        <ModeToggle />
      </div>
    </header>
  )
}
