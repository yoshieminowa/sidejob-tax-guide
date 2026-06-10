import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function CTAButton({ href, children, variant = "primary" }: CTAButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-blueMain text-white shadow-lg shadow-sky-200 hover:bg-blueDeep"
      : "border border-sky-200 bg-white text-blueDeep hover:bg-sky-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
