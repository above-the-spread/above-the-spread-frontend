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
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-primary ">
        {/* Top trigger - only visible when collapsed */}
        {state === "collapsed" && (
          <div className="flex justify-center p-2">
            <SidebarTrigger className="text-mygray hover:text-mygray hover:bg-primary-active" />
          </div>
        )}

        <SidebarGroup>
          {/* Regular trigger - only visible when expanded */}
          {state === "expanded" && (
            <SidebarGroupLabel className="mt-2 mb-4">
              <div className="flex w-full justify-between items-center">
                <Image
                  src="/images/ATS.svg"
                  className="w-20  my-4"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <SidebarTrigger className="-ml-1 text-mygray hover:text-mygray hover:bg-primary-active" />
              </div>
            </SidebarGroupLabel>
          )}

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
                        <Icon className="text-mygray" {...item.iconProps} />
                      ) : (
                        React.createElement(item.icon, {
                          size: 16,
                          className: "text-mygray",
                        })
                      )}
                      <span className="text-mygray">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Avatar Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {state === "collapsed" ? (
                  <SidebarMenuButton className=" flex justify-center items-center p-2   hover:bg-primary-active  active:bg-primary-active">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className=" hover:bg-primary-active h-12 active:bg-primary-active">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-mygray truncate">
                          John Doe
                        </span>
                        <span className="text-xs text-mygray/70 truncate">
                          john.doe@example.com
                        </span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
