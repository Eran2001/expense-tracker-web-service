"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared";

export function AuthScreen({ mode }: { mode: "lock" | "setup" }) {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const isSetup = mode === "setup";
  const appendPin = (digit: string) =>
    setPin((value) => (value.length < 6 ? `${value}${digit}` : value));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSetup && pin.length !== 6)
      return setMessage("Enter a 6-digit PIN to continue.");
    window.location.assign(isSetup ? "/onboarding" : "/transactions");
  };
  return (
    <div className="auth-screen">
      <Link className="auth-brand" href="/">
        <span className="brand-mark">L</span>
        <strong>Ledger</strong>
      </Link>
      <form className="auth-panel" onSubmit={submit}>
        <Breadcrumbs
          current={isSetup ? "Secure your ledger" : "Unlock Ledger"}
          rootHref={null}
        />
        <span className="auth-icon">
          <LockKeyhole size={22} />
        </span>
        <span className="section-label t-caption-bold">
          {isSetup ? "First-time setup" : "Welcome back"}
        </span>
        <h1 className="t-heading-xl">
          {isSetup ? "Secure your ledger" : "Unlock Ledger"}
        </h1>
        {isSetup && (
          <>
            <label className="form-field">
              <span className="t-small-bold">Your name</span>
              <input autoComplete="name" required />
            </label>
            <label className="form-field">
              <span className="t-small-bold">Email for backups</span>
              <input autoComplete="email" required type="email" />
            </label>
          </>
        )}
        <label className="form-field">
          <span className="t-small-bold">6-digit PIN</span>
          <input
            aria-label="6-digit PIN"
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            onChange={(event) =>
              setPin(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            required
            type="password"
            value={pin}
          />
        </label>
        {isSetup && (
          <label className="form-field">
            <span className="t-small-bold">Confirm PIN</span>
            <input
              autoComplete="new-password"
              inputMode="numeric"
              maxLength={6}
              required
              type="password"
            />
          </label>
        )}
        <div aria-label="PIN keypad" className="pin-pad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
            (digit, index) => (
              <button
                aria-label={
                  digit === "⌫" ? "Delete last digit" : digit || undefined
                }
                className="pin-key"
                disabled={!digit}
                key={index}
                onClick={() =>
                  digit === "⌫"
                    ? setPin((value) => value.slice(0, -1))
                    : appendPin(digit)
                }
                type="button"
              >
                {digit}
              </button>
            ),
          )}
        </div>
        {message && <p className="auth-message t-small">{message}</p>}
        <button className="screen-action auth-submit" type="submit">
          {isSetup ? "Create owner" : "Unlock"}
          <ArrowRight size={16} />
        </button>
        {!isSetup && (
          <button className="passkey-button" type="button">
            <ShieldCheck size={17} />
            Use passkey
          </button>
        )}
      </form>
    </div>
  );
}
