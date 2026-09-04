// "use client";

// import { useEffect, useState } from "react";

// export default function LoadingScreen() {
//   const [isExiting, setIsExiting] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     // Start exit after the text has filled
//     const exitTimer = setTimeout(() => {
//       setIsExiting(true);
//     }, 2200);

//     // Remove loader
//     const removeTimer = setTimeout(() => {
//       setIsFinished(true);
//       document.body.style.overflow = "";
//     }, 2900);

//     return () => {
//       clearTimeout(exitTimer);
//       clearTimeout(removeTimer);
//       document.body.style.overflow = "";
//     };
//   }, []);

//   if (isFinished) return null;

//   return (
//     <div className={`loading-screen ${isExiting ? "loading-exit" : ""}`}>
//       <div className="loading-wordmark">
//         {/* Base text */}
//         <span className="loading-text loading-text-base">
//           KUEAUREX
//         </span>

//         {/* Purple filling text */}
//         <span className="loading-text loading-text-fill">
//           KUEAUREX
//         </span>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setFinished(true);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (finished) return null;

  return (
    <div className={`loader ${exiting ? "loader-exit" : ""}`}>
      <div className="loader-wordmark">

        {/* Dark/base version */}
        <span className="loader-text loader-text-base">
          KUEAUREX
        </span>

        {/* Purple filling version */}
        <span className="loader-text loader-text-fill">
          KUEAUREX
        </span>

      </div>
    </div>
  );
}