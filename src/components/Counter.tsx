"use client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error React types are provided by Next.js
import { useState } from "react";

type CounterProps = {
  initial?: number;
  step?: number;
};

export function Counter({ initial = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initial);
  return (
    <div className="inline-flex items-center gap-2 rounded-md border px-2 py-1">
      <button
        type="button"
        className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800"
        onClick={() => setCount((c: number) => c - step)}
        aria-label="Decrement"
      >
        −
      </button>
      <span className="min-w-8 text-center tabular-nums">{count}</span>
      <button
        type="button"
        className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800"
        onClick={() => setCount((c: number) => c + step)}
        aria-label="Increment"
      >
        +
      </button>
    </div>
  );
}

