import logo from "@/assets/logo.png"
import { FileText, Home } from "lucide-react"
import { NavLink } from "./nav-link"
import { UserAccount } from "./user_account"
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={logo} alt="logo inmediam" className="h-8" />

        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/planos">
            <FileText className="h-4 w-4" />
            Planos
          </NavLink>
        </nav>
        <UserAccount />
      </div>
    </div>
  )
}