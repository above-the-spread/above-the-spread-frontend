"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { mainItems, tournaments, leagues } from "@/data/nav";

export default function Header() {
  const pathname = usePathname();

  // Find the current page title from all navigation items
  const allItems = [...mainItems, ...tournaments, ...leagues];
  const currentItem = allItems.find((item) => item.url === pathname);
  const pageTitle = currentItem?.title || "Home";

  return (
    <header className="md:hidden bg-primary flex items-center gap-4 border-b px-1 py-1">
      <SidebarTrigger />
      <h1 className="text-lg font-black text-mygray">{pageTitle}</h1>
    </header>
  );
}
