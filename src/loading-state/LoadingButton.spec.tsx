import { render, fireEvent, waitFor } from "@testing-library/react";
import { delay } from "../utils/delay";
import LoadingButton from "./LoadingButton";
import userEvent from "@testing-library/user-event";

/**
 * RTL 로 setState 가 비동기 업데이트 되기 전에 double click 하는 것을 테스트할 수가 없다.
 * cypress 로 변경
 */
const CLICK_COUNT = 5;
it(`button 을 ${CLICK_COUNT}회 클릭하면, handler도 ${CLICK_COUNT}회 호출된다.`, async () => {
  const user = userEvent.setup();

  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };
  const { getByRole } = render(<LoadingButton onClick={handleClick} />);
  const button = getByRole("button");

  await user.dblClick(button); // 연속적으로 클릭

  expect(handlerCalledTimes).toBe(1);
});
