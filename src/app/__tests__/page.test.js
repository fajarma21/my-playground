import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import App from "../page";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  unstable_ViewTransition: ({ children }) => <div>{children}</div>,
}));

describe("App page", () => {
  it("render properly", () => {
    const { getByAltText } = render(<App />);
    const img = getByAltText("pokemon");
    expect(img).toBeInTheDocument();
  });
});
