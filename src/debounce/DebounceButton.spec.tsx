import { render, fireEvent, waitFor } from "@testing-library/react";
import { delay } from "../utils/delay";
import DebounceButton from "./DebounceButton";
import { repeatCall } from "../utils/test-utils/repeactCall";

it("handlers의 delay가 debounce 의 wait 보다 짧을 때, 여러번 click 되어도 handler는 1번만 호출된다.", () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };
  const { getByText } = render(
    <DebounceButton waitMS={3000} onClick={handleClick} />
  );
  const button = getByText("DebounceButton");

  repeatCall(() => fireEvent.click(button), 5);

  expect(handlerCalledTimes).toBe(1);
});

it("handlers의 delay가 debounce 의 wait 보다 길 때, handler가 2회 이상 호출될 수 있다.", async () => {
  jest.useFakeTimers();
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    console.log("handlerCalledTimes", handlerCalledTimes);
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };
  const { getByText } = render(
    <DebounceButton waitMS={1000} onClick={handleClick} />
  );
  const button = getByText("DebounceButton");

  repeatCall(() => fireEvent.click(button), 5);

  expect(handlerCalledTimes).toBe(1);

  jest.advanceTimersByTime(1100);

  repeatCall(() => fireEvent.click(button), 1);
  expect(handlerCalledTimes).toBeGreaterThanOrEqual(2);
  jest.useRealTimers();
});
