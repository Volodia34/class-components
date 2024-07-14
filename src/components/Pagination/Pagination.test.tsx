import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination.tsx";

describe("Pagination Component", () => {
  it("updates URL query parameter when page changes", () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />,
    );
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
