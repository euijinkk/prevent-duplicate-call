import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

export default function LoadingSyncStateButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const [isLoading, startLoading] = useLoadingSync();

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
      LoadingSyncStateButton
    </button>
  );
}

function useLoadingSync(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const startTransition = useCallback(async <T,>(promise: Promise<T>) => {
    try {
      flushSync(() => setLoading(true));
      const data = await promise;
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
