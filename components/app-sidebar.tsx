"use client"

import * as React from "react"
import { Collapsible } from "@base-ui/react/collapsible"
import {
  RiDashboardLine,
  RiListOrdered2,
  RiStackLine,
  RiFireLine,
  RiArrowRightSLine,
  RiRestaurantLine,
} from "@remixicon/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: RiDashboardLine,
  },
  {
    title: "Orders",
    icon: RiListOrdered2,
    items: [
      {
        title: "All Orders",
        url: "/orders",
        icon: RiStackLine,
      },
      {
        title: "Kitchen Queue",
        url: "/orders/kitchen",
        icon: RiFireLine,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <a href="/">
                  <div
                    className="flex aspect-square size-8 items-center justify-center rounded-xl"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    <RiRestaurantLine className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold" style={{ color: "var(--sidebar-foreground)" }}>
                      RestoManager
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      v1.0.0
                    </span>
                  </div>
                </a>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) =>
              item.items ? (
                <Collapsible.Root key={item.title} defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <Collapsible.Trigger
                      render={
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <RiArrowRightSLine className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      }
                    />
                    <Collapsible.Panel>
                      <SidebarMenuSub>
                        {item.items.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton render={<a href={sub.url} />}>
                              <sub.icon />
                              <span>{sub.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </Collapsible.Panel>
                  </SidebarMenuItem>
                </Collapsible.Root>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    render={<a href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <a href="/profile">
                  <div
                    className="flex aspect-square size-8 items-center justify-center rounded-xl text-xs font-semibold"
                    style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                  >
                    RM
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="text-sm font-medium" style={{ color: "var(--sidebar-foreground)" }}>
                      Restaurant Manager
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      admin@resto.com
                    </span>
                  </div>
                </a>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
