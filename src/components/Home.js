import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'gray-100'} min-h-screen flex items-center justify-center`}>
      <div className="max-w-lg p-8 bg-white dark:bg-black shadow-lg rounded-md">
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Welcome to the Blogs!</h1>
        <p className={`text-gray-700 dark:text-white leading-relaxed`}>
          Welcome to ducation, where we delve into the dynamic world of education through the lens of Next.js and React.js. Join us as we explore innovative ways to enhance HTML page content, keeping it concise, engaging, and accessible. Let's embark on a journey to revolutionize educational experiences with the power of cutting-edge web technologies.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/blog" className={`text-blue-500 hover:underline ${isDarkMode ? 'dark:text-blue-300' : ''}`}>Learn more about these technologies
          </Link>
        </div>
      </div>
    </div>
  );
}
