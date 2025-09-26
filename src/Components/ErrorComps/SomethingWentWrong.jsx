import React from "react";
import { useState } from "react";

const SomethingWentWrong = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "We couldn't connect to the server (API error). Please try again in a few moments."
  );

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="flex flex-col items-center text-center ">
        <div className="mb-8">
          <img src="/icons/error.svg" alt="Error" className="w-18 h-18" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8 max-w-xs sm:max-w-md">
          {errorMessage}
        </p>
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="px-6 py-3 rounded-full text-white bg-slate-800 hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-opacity-50 active:bg-slate-900 shadow-md transform hover:scale-105"
        >
          {isRetrying ? (
            <div className="flex items-center space-x-2">
              <span>Retrying...</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <img src="/icons/retry.svg" alt="Error" className="w-5 h-5" />
              <div>Retry</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
