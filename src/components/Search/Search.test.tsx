import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search Component", () => {
  it("saves the entered value to local storage on search", () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} searchTerm="" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Morty" } });
    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith("searchTerm", "Morty");
    expect(mockOnSearch).toHaveBeenCalledWith("Morty");
  });

  it("retrieves the value from local storage upon mounting", () => {
    localStorage.setItem("searchTerm", "Morty");
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} searchTerm="Morty" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("Morty");
  });
});
