'use client';

import { Tutor } from '../data/tutors';
import { useId, useState } from "react";

export default function TutorCard({ tutor }: { tutor: Tutor }) {

  // FIX (Bug 3): useId gives a stable ID across server & client (no hydration mismatch)
  const sessionId = useId();

  // FIX (Bug 2): loading state prevents multiple clicks
  const [isLoading, setIsLoading] = useState(false);

  // NEW: state for showing success modal instead of alert()
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = async () => {
    if (isLoading) return; //  prevent double click

    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      
      // NEW : REPLACED alert with modal popup (better UX)
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200">
        
        {/* Header */}
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
          <span className="font-semibold text-gray-800">
            ${tutor.price} / hr
          </span>
        </div>

        {/*FIX : stable session ID rendering */}
        <p className="text-xs text-gray-400 font-mono">
          Session ID: {sessionId}
        </p>

        {/* FIX : disable button + loading text */}
        <button
          onClick={handleBookNow}
          disabled={isLoading}
          className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-150"
        >
          {isLoading ? "Booking..." : "Book Now"}
        </button>
      </div>

      {/* NEW: Success Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setShowModal(false)} 
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-scaleIn"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Booking Confirmed 🎉
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Your session with{" "}
              <span className="font-medium">{tutor.name}</span> has been booked successfully.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}