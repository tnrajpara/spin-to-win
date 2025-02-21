'use client'
import { lazy, Suspense, useEffect, useState } from "react";

const SpinnerWheel = lazy(() => import("./SpinnerWheel"));

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return (
    <Suspense fallback={"Loading..."}>
      {isClient ? <SpinnerWheel /> : null}
    </Suspense>
  );
}
