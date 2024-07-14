import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useParams } from "react-router";
import DetailedCard from "./DetailedCard";
import "@testing-library/jest-dom";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

describe("DetailedCard Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ cardId: "1" });
  });

  it("displays a loading indicator while fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <DetailedCard />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("correctly displays the detailed card data after fetching", async () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <DetailedCard />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Rick")).toBeInTheDocument();
  });

  it("hides the component on clicking the close button", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <DetailedCard />
      </MemoryRouter>,
    );
    fireEvent.click(getByText("Close"));
  });
});
