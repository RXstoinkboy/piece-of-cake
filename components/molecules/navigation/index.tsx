import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "Start",
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

export function Navigation() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {components.map((component, index) => (
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
            key={`${component.href}-${index}`}
          >
            <Link href={component.href}>{component.title}</Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
