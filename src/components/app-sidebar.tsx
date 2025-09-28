"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Trophy,
  Users,
  BarChart3,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Type for menu items
interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  iconProps?: any;
}

// Menu items for sports application
const items: MenuItem[] = [
  {
    title: "Soccer",
    url: "/",
    icon: Icon,
    iconProps: { iconNode: soccerBall, size: 16 },
  },
  {
    title: "Matches",
    url: "#",
    icon: Trophy,
  },
  {
    title: "Teams",
    url: "#",
    icon: Users,
  },
  {
    title: "Statistics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-primary ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-800">
            Sports Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-primary-active active:bg-primary-active
              ${item.url === pathname ? "bg-primary-active" : ""}
              `}
                    asChild
                  >
                    <Link href={item.url}>
                      {item.icon === Icon ? (
                        <Icon className="text-gray-200" {...item.iconProps} />
                      ) : (
                        React.createElement(item.icon, {
                          size: 16,
                          className: "text-gray-200",
                        })
                      )}
                      <span className="text-gray-200">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
