// src/lib/nav.ts
export type NavItem = { label: string; href: string; live: boolean };

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home",      href: "/",         live: true  },
  { label: "The Book",  href: "#the-book", live: false },
  { label: "Ideas",     href: "#ideas",    live: false },
  { label: "Authors",   href: "#authors",  live: false },
  { label: "Resources", href: "#resources",live: false },
  { label: "Speaking",  href: "#speaking", live: false },
  { label: "Contact",   href: "#contact",  live: false },
];
