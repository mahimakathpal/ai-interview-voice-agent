"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SideBarOptions } from "@/services/Constants";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const commonSidebarContent = (
    <>
      <SidebarHeader className="flex flex-col items-center gap-4 pt-16 md:pt-5">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <Link
          href="/dashboard/create-interview"
          onClick={() => setOpen(false)}
          className="w-full px-4"
        >
          <Button className="w-full mt-5">
            <Plus /> Create New Interview
          </Button>
        </Link>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto h-full">
        <SidebarGroup>
          <SidebarMenu>
            {SideBarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton
                  asChild
                  className={`p-5 ${
                    path === option.path ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Link href={option.path}>
                    <option.icon
                      className={`${
                        path === option.path ? "text-primary" : ""
                      }`}
                    />
                    <span
                      className={`text-[16px] font-medium ${
                        path === option.path ? "text-primary" : ""
                      }`}
                    >
                      {option.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen">
        <Sidebar className="h-full">{commonSidebarContent}</Sidebar>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          {/* Hamburger Button */}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-[100] hover:bg-gray-100 rounded-full"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </SheetTrigger>

          {/* Sidebar Drawer */}
          <SheetContent
            side="left"
            className="p-0 w-64 h-full bg-white shadow-xl z-[99] overflow-y-auto"
          >
            <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu for the dashboard
            </SheetDescription>

            <div className="h-full flex flex-col">
              {commonSidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
