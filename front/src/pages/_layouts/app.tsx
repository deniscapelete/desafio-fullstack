
import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Toaster } from "@/components/ui/sonner";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
      <Toaster />
    </div >
  )
}