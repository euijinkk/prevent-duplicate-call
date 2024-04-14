import LoadingButton from "../../src/loading-state/LoadingButton";
import { delay } from "../../src/utils/delay";

it(`button 을 2회 클릭하면, handler도 2회 호출된다.`, () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };

  cy.mount(<LoadingButton onClick={handleClick} />);
  const button = cy.get("button");
  button.dblclick();

  cy.wrap(null).then(() => {
    expect(handlerCalledTimes).to.equal(2);
  });
});
