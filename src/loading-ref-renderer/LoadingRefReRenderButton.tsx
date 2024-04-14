import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

export default function LoadingRefReRenderButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const [isLoadingRef, startLoading] = useLoadingRefWithRender();

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
      LoadingRefReRenderButton
    </button>
  );
}

function useLoadingRefWithRender(): [
  MutableRefObject<boolean>,
  <T>(promise: Promise<T>) => Promise<T>
] {
  const loadingRef = useRef(false);
  const reRender = useReRenderer();

  const startTransition = useCallback(
    async <T,>(promise: Promise<T>) => {
      try {
        loadingRef.current = true;
        reRender();
        const data = await promise;
        return data;
      } finally {
        loadingRef.current = false;
        reRender();
      }
    },
    [reRender]
  );
  return useMemo(() => [loadingRef, startTransition], [startTransition]);
}

function useReRenderer() {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
}
