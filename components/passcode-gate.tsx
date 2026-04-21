"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const PASSCODE = "WeAreVF2026";
const STORAGE_KEY = "viral-fusion-access-granted";

type PasscodeGateProps = {
  children: React.ReactNode;
};

export function PasscodeGate({ children }: PasscodeGateProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  useEffect(() => {
    setIsUnlocked(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    if (!isUnlocked) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isUnlocked]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passcode.trim() === PASSCODE) {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("That passcode does not match. Please try again.");
    setPasscode("");
    inputRef.current?.focus();
  }

  if (isUnlocked) {
    return children;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_36%,#d7dde1_100%)] px-5 py-8 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(72,88,104,0.18),transparent_32%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-[1.6rem] border border-white/70 bg-white/82 p-7 text-center shadow-[0_28px_80px_rgba(17,22,28,0.16)] backdrop-blur-xl sm:p-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/35 bg-panel text-graphite">
            <LockKeyhole className="h-6 w-6" strokeWidth={1.8} />
          </div>

          <h1 className="mt-5 font-display text-4xl leading-none text-ink">
            Viral Fusion
          </h1>
          <p className="mt-3 text-sm leading-6 text-mist">
            Enter passcode to continue.
          </p>

          <form className="mt-7 space-y-4 text-left" onSubmit={handleSubmit}>
            <label className="block">
              <span className="sr-only">Passcode</span>
              <span className="flex h-14 items-center gap-3 rounded-[1.15rem] border border-line bg-white/90 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors focus-within:border-accent">
                <input
                  ref={inputRef}
                  value={passcode}
                  onChange={(event) => {
                    setPasscode(event.target.value);
                    setError("");
                  }}
                  type={showPasscode ? "text" : "password"}
                  autoComplete="current-password"
                  className="min-w-0 flex-1 border-0 bg-transparent text-lg text-ink outline-none placeholder:text-mist/65"
                  placeholder="Passcode"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "passcode-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode((value) => !value)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white/80 text-graphite transition-colors hover:bg-panel"
                  aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
                >
                  {showPasscode ? (
                    <EyeOff className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={2} />
                  )}
                </button>
              </span>
            </label>

            {error ? (
              <p id="passcode-error" className="text-center text-sm font-medium text-[#a74343]">
                Incorrect passcode.
              </p>
            ) : null}

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center rounded-[1.15rem] border border-ink/10 bg-ink px-5 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_38px_rgba(17,22,28,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Unlock
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
