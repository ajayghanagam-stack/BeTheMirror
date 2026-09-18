// Site-wide constants.
//
// PURCHASE_URL is the "Buy the Book" destination. Reads from either
// NEXT_PUBLIC_BOOK_PURCHASE_URL or BOOK_PURCHASE_URL
// at build time. NEXT_PUBLIC_ is required if a *client* component imports
// this constant directly; server components (Header, FinalCTA, BookFinalCTA,
// BookHero, Footer, Hero, BookPreview, MobileNavigation via prop) can read
// the un-prefixed name too because Node has access to all env vars at
// build/render time. Must be a full https:// URL. Falls back to "#" when
// unset so local dev / preview builds don't crash — a "#" click is a no-op.
const rawPurchaseUrl =
  process.env.NEXT_PUBLIC_BOOK_PURCHASE_URL ||
  process.env.BOOK_PURCHASE_URL ||
  "";
export const PURCHASE_URL: string = rawPurchaseUrl.length > 0 ? rawPurchaseUrl : "#";

export const SITE_NAME = "Be the Mirror" as const;
export const SITE_TAGLINE = "A Change Agent's Guide to Transformation for an AI World" as const;
