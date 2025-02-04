import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";
const publicPages = [
  "/",
  "/signIn",
  "/register",
  // (/secret requires auth)
];

export default function middleware(req: NextRequest) {
  const defaultLocale = req.cookies.get('NEXT_LOCALE')?.value || 'de';
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'de'],
    defaultLocale
  });
  const publicPathnameRegex = RegExp(
    `^(/(${["en", "de"].join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);


  //-----------------
  const intlMiddleware = createIntlMiddleware({
    // A list of all locales that are supported
    locales,
    // Used when no locale matches
    defaultLocale,
    localePrefix,
    localeDetection: false,
  });
  //----------------
  const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    (req) => intlMiddleware(req),
    {
      callbacks: {
        authorized: ({ token }) => token != null,
      },
      pages: {
        signIn: "/signIn",
      },
    }
  );

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
