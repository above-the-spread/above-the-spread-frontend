"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { Icon } from "lucide-react";
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
import { mainItems, tournaments, leagues } from "@/data/nav";

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

        {/* Main Items */}
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
                <SidebarTrigger className="-ml-1 " />
              </div>
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-primary-active  active:bg-primary-active
              ${item.url === pathname ? "bg-primary-active" : ""}
              `}
                    asChild
                  >
                    <Link href={item.url} className=" ">
                      {typeof item.icon === "string" ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={16}
                          height={16}
                          className="min-w-6 w-6 h-6  rounded-md -ml-1"
                        />
                      ) : item.icon === Icon ? (
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

        {/* Tournaments */}
        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel className="text-mygray/50 uppercase text-xs">
              UEFA
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {tournaments.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-primary-active  active:bg-primary-active
              ${item.url === pathname ? "bg-primary-active" : ""}
              `}
                    asChild
                  >
                    <Link href={item.url} className=" ">
                      <Image
                        src={item.icon as string}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="min-w-6 w-6 h-6  rounded-md -ml-1"
                      />
                      <span className="text-mygray">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Leagues */}
        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel className="text-mygray/50 uppercase text-xs">
              Leagues
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {leagues.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-primary-active  active:bg-primary-active
              ${item.url === pathname ? "bg-primary-active" : ""}
              `}
                    asChild
                  >
                    <Link href={item.url} className=" ">
                      <Image
                        src={item.icon as string}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="min-w-6 w-6 h-6  rounded-md -ml-1"
                      />
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
