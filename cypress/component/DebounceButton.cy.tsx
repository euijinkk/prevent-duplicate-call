import { delay } from "../../src/utils/delay";
import DebounceButton from "../../src/debounce/DebounceButton";

it("api latency가 debounce wait 보다 짧을 때, 여러번 click 되어도 handler는 1번만 호출된다.", () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(2000);
  };

  cy.mount(<DebounceButton waitMS={3000} onClick={handleClick} />);
  const button = cy.get("button");
  button.dblclick();

  cy.wrap(null).then(() => {
    expect(handlerCalledTimes).to.equal(1);
  });
});

it("api latency가 debounce wait 보다 길 때, handler가 2회 이상 호출될 수 있다.", async () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(2000);
  };

  cy.mount(<DebounceButton waitMS={1000} onClick={handleClick} />);
  const button = cy.get("button");
  button.dblclick();

  cy.wait(1100);

  button.dblclick();
  cy.wrap(null).then(() => {
    expect(handlerCalledTimes).to.be.greaterThan(1);
  });
});
