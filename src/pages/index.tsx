import { LayoutDashboardIcon, MessageCircleMore, Cog, ChartCandlestickIcon, ChartSplineIcon, GraduationCap } from "lucide-react"
import type { NavElement } from "@/types";
import Chat from "./chat";
import Evaluation from "./eval";
import Predictions from "./predict";
import Learn from "./learn/learn";
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
    title: "Predictions",
    url: "/predict",
    icon: (
      <ChartSplineIcon />
    ),
    page: (
      <Predictions />
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
