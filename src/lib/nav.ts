// src/lib/nav.ts
export type NavItem = { label: string; href: string; live: boolean };

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home",      href: "/",          live: true  },
  { label: "The Book",  href: "/book",      live: true  },
  { label: "Ideas",     href: "/ideas",     live: true  },
  { label: "Authors",   href: "/authors",   live: true  },
  { label: "Resources", href: "/resources", live: true  },
  { label: "Speaking",  href: "/speaking",  live: true  },
  { label: "Contact",   href: "/contact",   live: true  },
];
