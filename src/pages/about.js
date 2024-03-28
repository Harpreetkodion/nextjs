import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>About Us</h1>
        <p className={`text-gray-700 dark:text-white leading-relaxed mb-4`}>
          We are passionate about providing quality education through innovative technologies. Our mission is to empower learners of all ages to achieve their goals and fulfill their potential.
        </p>
        <p className={`text-gray-700 dark:text-white leading-relaxed mb-4`}>
          At Edicutioon, we leverage the power of Next.js and React.js to create engaging and interactive educational experiences. Join us on our journey to transform the way people learn and grow.
        </p>
        <p className={`text-gray-700 dark:text-white leading-relaxed`}>
          Whether you&apos;re a student, educator, or lifelong learner, we welcome you to explore our platform and discover new opportunities for knowledge and growth.
        </p>
      </div>
    </div>
  );
}
