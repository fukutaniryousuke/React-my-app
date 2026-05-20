"use client";

import { useEffect, useState } from "react";

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enableMock = process.env.NEXT_PUBLIC_API_MOCK === "true";

    if (!enableMock) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      return;
    }

    import("../../mocks/browser").then(({ worker }) => {
      worker
        .start({
          onUnhandledRequest: "bypass",
        })
        .then(() => {
          console.log("MSW START");
          setReady(true);
        });
    });
  }, []);

  if (!ready) return null;

  return <>{children}</>;
};
