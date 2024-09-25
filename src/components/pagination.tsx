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
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  console.log({ pageNumber, totalPages });

  function buildPaginateUrl(page: number) {
    const url = new URL(location.href);

    url.searchParams.set("page", page.toString());

    return `${url.pathname}${url.search}`;
  }
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
      <PaginationContent className="gap-x-4">
        <PaginationItem>
          <PaginationLink
            href={pageNumber >= 1 ? buildPaginateUrl(pageNumber - 1) : "#"}
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 1) onPageChange(pageNumber - 1);
            }}
            className={cn(
              "rounded-full text-neutral-400 border border-neutral-100 size-12",
              pageNumber <= 1
                ? "pointer-events-none opacity-50"
                : "bg-primary-500 text-white",
            )}
          >
            <ChevronLeft className="size-5" />
          </PaginationLink>
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={buildPaginateUrl(pageNumber)}
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
                className={cn(
                  "rounded-full text-neutral-400 size-12 border border-neutral-100",
                  page === pageNumber &&
                    "bg-primary-500 text-white border-primary-500",
                )}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href={
              pageNumber < totalPages ? buildPaginateUrl(pageNumber + 1) : "#"
            }
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber < totalPages) onPageChange(pageNumber + 1);
            }}
            className={cn(
              "rounded-full text-neutral-400 border border-neutral-100 size-12",
              pageNumber >= totalPages
                ? "pointer-events-none opacity-50"
                : "bg-primary-500 text-white",
            )}
          >
            <ChevronRight className="size-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
