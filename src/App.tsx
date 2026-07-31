import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import pages from "./pages";

import './App.css';

export default function App() {
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

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 flex-col p-4 md:p-6">
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
