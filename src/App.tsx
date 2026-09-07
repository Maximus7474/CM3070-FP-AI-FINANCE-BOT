import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import pages from "./pages";
import { syncLlmSettingsOnLaunch } from "@/lib/llm-sync";

import './App.css';

export default function App() {
  // Re-apply the user's saved LLM choice to the backend once on launch
  // (covers sidecar restarts that reset the backend's in-memory state).
  useEffect(() => {
    syncLlmSettingsOnLaunch();
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset className="h-[calc(100svh-1rem)]">
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden min-h-0">
          <div className="@container/main flex flex-1 flex-col p-4 md:p-6 overflow-hidden min-h-0">
            <Routes>
              {pages.map(({ url, page }) => (
                <Route key={url} path={url} element={page} />
              ))}
            </Routes>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
