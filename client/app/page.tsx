'use client';

import { useState, useMemo } from 'react';
import { tutors } from '../data/tutors';
import TutorCard from '../components/TutorCard';

// FIX : derive subjects dynamically (avoids hardcoding mismatch issues)
const SUBJECT_OPTIONS = Array.from(
  new Set(tutors.map((t) => t.subject))
);

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // NEW :  memoized filtering (prevents recalculation on every render)
  const filteredTutors = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim(); 

    return tutors.filter((tutor) => {
      //FIX:case-insensitive name search
      const matchesName = tutor.name
        .toLowerCase()
        .includes(normalizedSearch);

      // FIX: normalized subject comparison
      const matchesSubject = selectedSubject
        ? tutor.subject.toLowerCase() === selectedSubject.toLowerCase()
        : true;

      return matchesName && matchesSubject;
    });
  }, [search, selectedSubject]);

  // FIX : properly reset filters (fixes no-op issue)
  const clearFilters = () => {
    setSearch('');
    setSelectedSubject('');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Tutor</h1>
          <p className="text-gray-500 mt-1">
            Discover expert tutors on Meghdo.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          
          {/* controlled input with normalized handling */}
          <input
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* dynamic subject dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="">All Subjects</option>
            {SUBJECT_OPTIONS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          {/* clear filters works correctly */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors duration-150"
          >
            Clear Filters
          </button>
        </div>

        
        <p className="text-sm text-gray-500 mb-5">
          Showing{' '}
          <span className="font-semibold text-gray-700">
            {filteredTutors.length}
          </span>{' '}
          tutor{filteredTutors.length !== 1 && 's'}
        </p>

        {/* Tutor Grid */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No tutors found.</p>
            <p className="text-sm mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}