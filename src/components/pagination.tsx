import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the type for the server response
type PaginationData = {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

type PaginationProps = {
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
};

export function PagePagination({
  paginationData,
  onPageChange,
}: PaginationProps) {
  const { pageNumber, totalPages } = paginationData;

  // Function to generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of the current page
    const range = [];
    for (
      let i = Math.max(2, pageNumber - delta);
      i <= Math.min(totalPages - 1, pageNumber + delta);
      i++
    ) {
      range.push(i);
    }

    if (pageNumber - delta > 2) {
      range.unshift("...");
    }
    if (pageNumber + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 1) onPageChange(pageNumber - 1);
            }}
            className={pageNumber <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber < totalPages) onPageChange(pageNumber + 1);
            }}
            className={
              pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
