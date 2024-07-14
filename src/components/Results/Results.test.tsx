// Results.test.tsx
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { Card } from "../../types.ts";

describe("Results Component", () => {
  const mockCards: Card[] = [
    {
      id: 1,
      name: "Rick",
      status: "Alive",
      species: "Human",
      image: "rick.png",
      origin: "Earth",
      location: "Galaxy",
      gender: "Male",
    },
    {
      id: 2,
      name: "Morty",
      status: "Alive",
      species: "Human",
      image: "morty.png",
      origin: "Earth",
      location: "Galaxy",
      gender: "Male",
    },
  ];

  it("renders the specified number of cards", () => {
    render(
      <Results results={mockCards} noResults={false} onCardClick={() => {}} />,
    );
    expect(screen.getAllByText(/Rick|Morty/)).toHaveLength(2);
  });

  it("displays a message if no cards are present", () => {
    render(<Results results={[]} noResults={true} onCardClick={() => {}} />);
    expect(screen.getByText("No characters found.")).toBeInTheDocument();
  });
});
