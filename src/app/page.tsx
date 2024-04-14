"use client";

import LoadingRefButton from "../loading-ref/LoadingRefButton";
import LoadingStateButton from "../loading-state/LoadingStateButton";
import { delay } from "../utils/delay";

export default function Home() {
  const handleClick = async () => {
    console.log("handleClick");
    await delay(1000);
    await delay(1000);
  };

  return (
    <>
      <LoadingStateButton onClick={handleClick} />
      <LoadingRefButton onClick={handleClick} />
    </>
  );
}
