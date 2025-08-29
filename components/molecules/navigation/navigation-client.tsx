"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "Torty",
    href: "/",
  },
  {
    title: "Przepisy",
    href: "/recipes",
  },
  {
    title: "Składniki",
    href: "/ingredients",
  },
];

export function NavigationClient() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {components.map((component, index) => (
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
            key={`${component.href}-${index}`}
            data-active={pathname === component.href}
          >
            <Link href={component.href}>{component.title}</Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
