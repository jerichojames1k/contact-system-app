import React, { useEffect, useState } from 'react';
const Loading:React.FC= () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second delay using setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clear the timeout to avoid memory leaks when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`flex items-center justify-center h-screen ${isLoading ? 'block' : 'hidden'}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
