import { useCallback, useMemo, useState } from "react";

export default function LoadingButton({ onClick }: { onClick: () => void }) {
  const [isLoading, startLoading] = useLoading();

  return (
    <button
      type="button"
      onClick={() => {
        if (isLoading) {
          return;
        }
        startLoading((async () => onClick())());
      }}
    >
      LoadingButton
    </button>
  );
}

// https://github.com/toss/slash/blob/main/packages/react/use-loading/src/useLoading.ts
function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const startTransition = useCallback(async <T,>(promise: Promise<T>) => {
    try {
      setLoading(true);
      const data = await promise;
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
