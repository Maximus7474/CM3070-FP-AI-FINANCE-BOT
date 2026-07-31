import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LucideCog } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function NavUser() {
  const navigate = useNavigate();
  return (
    <SidebarMenu className="border-t pt-2">
      <SidebarMenuButton tooltip="Open settings" onClick={() => navigate('/settings')}>
        <LucideCog />
        <span>Settings</span>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}
