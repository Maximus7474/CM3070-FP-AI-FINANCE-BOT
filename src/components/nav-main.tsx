import { useState } from "react";
import { ChevronRight, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavElement } from "@/types";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useChannels } from "@/hooks/use-channel";

export function NavMain({
  items,
}: {
  items: NavElement[]
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            if (item.hidenav) return null;
            const isActive = location.pathname === item.url;

            if (item.expandable) {
              return (
                <ChatNavItem
                  key={item.title}
                  item={item}
                  isActive={isActive}
                />
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => navigate(item.url)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ChatNavItem({
  item,
  isActive,
}: {
  item: NavElement;
  isActive: boolean;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { channels, createChannel, deleteChannel } = useChannels();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(isActive);

  const activeChannelId = searchParams.get("channel") ?? "general";

  function submitNewChannel() {
    const name = newName.trim();
    if (name) createChannel(name);
    setNewName("");
    setCreating(false);

    navigate(`${item.url}?channel=${encodeURIComponent(name)}`);
  }

  async function handleDeleteChannel(id: string) {
    if (!deleteChannel) return;

    await deleteChannel(id);

    if (activeChannelId === id) {
      const remainingChannels = channels.filter((c) => c.id !== id);
      const fallbackId = remainingChannels[0]?.id ?? "general";
      navigate(`${item.url}?channel=${fallbackId}`);
    }
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="group/collapsible w-full"
      >
        <SidebarMenuButton
          tooltip={item.title}
          isActive={isActive}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {item.icon}
          <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>

        <CollapsibleContent>
          <SidebarMenuSub>
            {channels?.map((subItem) => {
              const isSubItemActive = isActive && activeChannelId === subItem.id;

              return (
                <SidebarMenuSubItem
                  key={subItem.id}
                  className="group/subitem relative flex items-center"
                >
                  <SidebarMenuSubButton
                    isActive={isSubItemActive}
                    onClick={() => navigate(`${item.url}?channel=${subItem.id}`)}
                    className="w-full pr-8" /* pr-8 ensures long names don't overlap the action icon */
                  >
                    <span className="truncate">{subItem.name}</span>
                  </SidebarMenuSubButton>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-1 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover/subitem:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-opacity"
                        title="Channel Options"
                      >
                        <MoreHorizontal className="size-3.5" />
                        <span className="sr-only">More options</span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChannel(subItem.id);
                        }}
                      >
                        <Trash2 className="size-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>
              );
            })}

            <SidebarSeparator className="my-1" />

            <SidebarMenuSubItem>
              {creating ? (
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitNewChannel();
                    if (e.key === "Escape") setCreating(false);
                  }}
                  onBlur={submitNewChannel}
                  placeholder="Channel name..."
                  className="w-full px-2 py-1 mt-1 text-xs rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              ) : (
                <SidebarMenuSubButton
                  onClick={() => setCreating(true)}
                  className="text-muted-foreground mt-1"
                >
                  <Plus className="size-3.5 mr-1" />
                  <span>New channel</span>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
