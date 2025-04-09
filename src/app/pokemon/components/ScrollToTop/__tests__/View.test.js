import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import ScrollToTop from "../View";

describe("ScrollToTop View", () => {
  let realScrollTo = window.scrollTo;

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    window.scrollTo = realScrollTo;
  });

  it("render properly", () => {
    const { getByLabelText } = render(<ScrollToTop display />);

    const btn = getByLabelText("scroll to top");
    expect(btn.getAttribute("data-display")).toBeTruthy();
  });

  it("click run window scrollTop", () => {
    const { getByLabelText } = render(<ScrollToTop display />);

    const btn = getByLabelText("scroll to top");
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
