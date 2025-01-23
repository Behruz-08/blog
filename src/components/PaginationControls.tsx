import { Stack, Button } from "@mui/material";
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      className="pagination-controls"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      <span>{`Page ${currentPage} of ${totalPages}`}</span>

      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
};

export default PaginationControls;
