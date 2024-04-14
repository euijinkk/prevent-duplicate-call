import { render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import { delay } from "../utils/delay";
import { repeatCall } from "../utils/test-utils/repeactCall";
import Button from "./DefaultButton";

const CLICK_COUNT = 5;
it(`button 을 ${CLICK_COUNT}회 클릭하면, handler도 ${CLICK_COUNT}회 호출된다.`, () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };
  const { getByRole } = render(<Button onClick={handleClick} />);
  const button = getByRole("button");

  repeatCall(() => fireEvent.click(button), CLICK_COUNT);
  expect(handlerCalledTimes).toBe(CLICK_COUNT);
});
