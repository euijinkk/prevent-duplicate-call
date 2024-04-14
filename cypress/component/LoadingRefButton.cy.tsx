import LoadingRefButton from "../../src/loading-ref/LoadingRefButton";
import { delay } from "../../src/utils/delay";

it(`button 을 2회 연속 클릭해도, handler는 1회 호출된다.`, () => {
  let handlerCalledTimes = 0;
  const handleClick = async () => {
    handlerCalledTimes = handlerCalledTimes + 1;
    await delay(1000);
    await delay(1000);
  };

  cy.mount(<LoadingRefButton onClick={handleClick} />);
  const button = cy.get("button");
  button.dblclick();

  cy.wrap(null).then(() => {
    expect(handlerCalledTimes).to.equal(1);
  });
});
