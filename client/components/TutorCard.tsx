'use client';

import { Tutor } from '../data/tutors';

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  // ─────────────────────────────────────────────────────────────────────────
  // BUG 3 — Hydration Mismatch
  // Math.random() is called directly inside the render function, outside of
  // a useEffect or useMemo with stable seeding.
  // On the first request, Next.js pre-renders this component on the server
  // and produces one random value. When React hydrates the same component on
  // the client, it calls Math.random() again and gets a DIFFERENT value.
  // React detects the mismatch and throws a hydration error in the console:
  //   "Error: Hydration failed because the initial UI does not match what
  //    was rendered on the server."
  // Fix: move sessionId into a useEffect + useState, or use a stable client-
  // only ID (e.g. useId() from React 18).
  // ─────────────────────────────────────────────────────────────────────────
  const sessionId = Math.random().toString(36).substring(2, 9);

  // ─────────────────────────────────────────────────────────────────────────
  // BUG 2 — No Loading / Disabled State (Double-Submit)
  // There is no `isLoading` boolean and the button is never disabled.
  // The mock API call waits 2 seconds before resolving, so a user who clicks
  // "Book Now" multiple times before the first alert fires will trigger one
  // alert per click — resulting in duplicate bookings.
  // Fix: add an isLoading state, set it to true before the await, false after,
  // and pass `disabled={isLoading}` to the button.
  // ─────────────────────────────────────────────────────────────────────────
  const handleBookNow = async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    alert(`Success! Booking confirmed for ${tutor.name}!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-800 leading-tight">
          {tutor.name}
        </h2>
        <span className="shrink-0 text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-1 rounded-full">
          {tutor.subject}
        </span>
      </div>

      {/* Rating & Price */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>⭐ {tutor.rating.toFixed(1)}</span>
        <span className="font-semibold text-gray-800">${tutor.price} / hr</span>
      </div>

      {/* BUG 3 — sessionId rendered directly; hydration mismatch here */}
      <p className="text-xs text-gray-400 font-mono">
        Session ID: {sessionId}
      </p>

      {/* BUG 2 — button is never disabled; no loading feedback */}
      <button
        onClick={handleBookNow}
        className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-150"
      >
        Book Now
      </button>
    </div>
  );
}
