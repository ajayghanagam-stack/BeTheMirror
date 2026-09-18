// Site-wide constants.
//
// PURCHASE_URL is the "Buy the Book" destination. It reads from the
// NEXT_PUBLIC_BOOK_PURCHASE_URL environment variable at build time so
// both Server Components (Header, FinalCTA, BookFinalCTA) and the
// client MobileNavigation see the same value. Must be a full https://
// URL. Falls back to "#" when unset so local dev / preview builds do
// not crash — clicking a "#" button is a no-op.
export const PURCHASE_URL: string =
  process.env.NEXT_PUBLIC_BOOK_PURCHASE_URL && process.env.NEXT_PUBLIC_BOOK_PURCHASE_URL.length > 0
    ? process.env.NEXT_PUBLIC_BOOK_PURCHASE_URL
    : "#";

export const SITE_NAME = "Be the Mirror" as const;
export const SITE_TAGLINE = "A Change Agent's Guide to Transformation for an AI World" as const;
