import { LayoutDashboardIcon, MessageCircleMore, Cog, ChartCandlestickIcon, GraduationCap } from "lucide-react"
import Chat from "./chat";
import Evaluation from "./eval";
import Learn from "./learn/learn";
import type { NavElement } from "@/types";
import Settings from "./settings";

export default [
  {
    title: "Dashboard",
    url: "/",
    icon: (
      <LayoutDashboardIcon />
    ),
    page: (
      <p>Nothing yet</p>
    ),
  },
  {
    title: "Chat",
    url: "/chat",
    icon: (
      <MessageCircleMore />
    ),
    page: (
      <Chat />
    ),
    expandable: true,
  },
  {
    title: "Evaluate",
    url: "/eval",
    icon: (
      <ChartCandlestickIcon />
    ),
    page: (
      <Evaluation />
    ),
  },
  {
    title: "Learn",
    url: "/learn",
    icon: (
      <GraduationCap />
    ),
    page: (
      <Learn />
    ),
  },
  {
    title: "Settings",
    url: "/settings",
    hidenav: true,
    icon: (
      <Cog />
    ),
    page: (
      <Settings />
    )
  },
] satisfies NavElement[];
