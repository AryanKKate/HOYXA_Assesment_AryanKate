export interface Tutor {
  id: number;
  name: string;
  subject: string;
  price: number;
  rating: number;
}

// NOTE: Subject names are Title Case ("Math", "Physics", etc.)
// This is intentional — see the subject filter in page.tsx for Bug 1.
export const tutors: Tutor[] = [
  { id: 1,  name: "Alice Johnson",  subject: "Math",             price: 50, rating: 4.8 },
  { id: 2,  name: "Bob Smith",      subject: "Physics",          price: 60, rating: 4.5 },
  { id: 3,  name: "Carol White",    subject: "Chemistry",        price: 55, rating: 4.7 },
  { id: 4,  name: "David Brown",    subject: "Biology",          price: 45, rating: 4.3 },
  { id: 5,  name: "Eva Martinez",   subject: "English",          price: 40, rating: 4.9 },
  { id: 6,  name: "Frank Lee",      subject: "Math",             price: 65, rating: 4.6 },
  { id: 7,  name: "Grace Kim",      subject: "History",          price: 35, rating: 4.2 },
  { id: 8,  name: "Henry Davis",    subject: "Computer Science", price: 75, rating: 4.8 },
  { id: 9,  name: "Iris Thompson",  subject: "Physics",          price: 58, rating: 4.4 },
  { id: 10, name: "James Wilson",   subject: "Chemistry",        price: 52, rating: 4.6 },
];
