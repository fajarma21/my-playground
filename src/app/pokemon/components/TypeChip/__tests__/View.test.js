import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import TypeChip from "../View";

describe("TypeChip View", () => {
  it("render type grass chip", () => {
    const { getByText } = render(<TypeChip type="grass">Grass</TypeChip>);

    const chip = getByText("Grass");
    expect(chip.getAttribute("data-type")).toBe("grass");
  });

  it("render type long chip", () => {
    const { getByText } = render(<TypeChip long>Long Chip</TypeChip>);

    const chip = getByText("Long Chip");
    expect(chip.getAttribute("data-long")).toBeTruthy();
  });
});
