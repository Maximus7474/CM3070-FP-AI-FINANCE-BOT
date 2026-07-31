import { ReactNode } from "react";

export type NavElement = {
  title: string;
  url: string;
  hidenav?: boolean;
  icon: ReactNode;
  page: ReactNode;
}
