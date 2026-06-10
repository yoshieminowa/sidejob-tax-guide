import Link from "next/link";
import { CTAButton } from "./CTAButton";

const navItems = [
  { label: "診断", href: "/diagnosis" },
  { label: "記事", href: "/articles" },
  { label: "サービス", href: "/services" },
  { label: "レポート", href: "/reports" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/95 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-3">
        <Link href="/" className="text-base font-bold text-blueDeep sm:text-lg">
          副業の税金ざっくり診断
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blueDeep">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <CTAButton href="/diagnosis">無料で診断する</CTAButton>
        </div>
      </div>
    </header>
  );
}
