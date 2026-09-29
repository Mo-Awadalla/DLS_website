import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { viewport?: boolean }) {
  return (
    <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={className} {...props}>
      {children}
      {viewport && <NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={className} {...props} />;
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={className} {...props} />;
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" className={className} {...props} />;
}

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink };
