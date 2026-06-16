"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallbackHref?: string;
  label?: string;
  className?: string;
  preferHistory?: boolean;
};

const defaultClassName =
  "fixed left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/78 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-graphite shadow-deck backdrop-blur-sm transition-colors hover:bg-white md:left-8 md:top-8";

export function BackButton({
  fallbackHref = "/",
  label = "Back",
  className = defaultClassName,
  preferHistory = true,
}: BackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    const referrer = document.referrer ? new URL(document.referrer) : null;

    if (preferHistory && referrer?.origin === window.location.origin) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className={className}
      aria-label={label === "Back" ? "Go back" : `Back to ${label.toLowerCase()}`}
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2.1} />
      <span>{label}</span>
    </button>
  );
}
