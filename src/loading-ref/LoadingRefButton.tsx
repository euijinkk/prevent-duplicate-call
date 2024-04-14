import { MutableRefObject, useCallback, useMemo, useRef } from "react";

export default function LoadingRefButton({ onClick }: { onClick: () => void }) {
  const [isLoadingRef, startLoading] = useLoadingRef();

  return (
    <button
      type="button"
      onClick={() => {
        if (isLoadingRef.current) {
          return;
        }
        startLoading((async () => onClick())());
      }}
    >
      LoadingRefButton
    </button>
  );
}

function useLoadingRef(): [
  MutableRefObject<boolean>,
  <T>(promise: Promise<T>) => Promise<T>
] {
  const loadingRef = useRef(false);
  const startTransition = useCallback(async <T,>(promise: Promise<T>) => {
    try {
      loadingRef.current = true;
      const data = await promise;
      return data;
    } finally {
      loadingRef.current = false;
    }
  }, []);
  return useMemo(() => [loadingRef, startTransition], [startTransition]);
}
