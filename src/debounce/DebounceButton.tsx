import debounce from "lodash.debounce";
import { useMemo } from "react";

export default function DebounceButton({
  waitMS,
  onClick,
}: {
  waitMS: number;
  onClick: () => void;
}) {
  const handleClick = useMemo(() => {
    return debounce(onClick, waitMS, { leading: true, trailing: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button type="button" onClick={handleClick}>
      DebounceButton
    </button>
  );
}
