import { Component } from "react";
import style from "./Pagination.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

class Pagination extends Component<Props> {
  handlePrevious = () => {
    const { currentPage, onPageChange } = this.props;
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  handleNext = () => {
    const { currentPage, totalPages, onPageChange } = this.props;
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  render() {
    const { currentPage, totalPages } = this.props;
    return (
      <div className={style.pagination}>
        <button onClick={this.handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={this.handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
