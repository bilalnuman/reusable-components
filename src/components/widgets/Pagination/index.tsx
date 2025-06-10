import React from "react";
import "./index.css";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: "basic" | "classic";
    className?: string;
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    variant = "basic",
    className = ""
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const handlePageClick = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderBasic = () => (
        <div className={`pagination basic ${className}`}>
            <button disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)}>
                Prev
            </button>
            <span className="pagination-page">{`Page ${currentPage} of ${totalPages}`}</span>
            <button disabled={currentPage === totalPages} onClick={() => handlePageClick(currentPage + 1)}>
                Next
            </button>
        </div>
    );

    const renderClassic = () => {
        const getPageNumbers = () => {
            const pages: (number | string)[] = [];

            if (totalPages <= 7) {
                // Show all if pages are small
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
                return pages;
            }

            // Always include first and last pages
            const showLeftEllipsis = currentPage > 4;
            const showRightEllipsis = currentPage < totalPages - 3;

            pages.push(1);

            if (showLeftEllipsis) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (showRightEllipsis) {
                pages.push("...");
            }

            pages.push(totalPages);

            return pages;
        };

        return (
            <div className={`pagination classic ${className}`}>
                <button disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)}>
                    Prev
                </button>
                {getPageNumbers().map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === "number" && handlePageClick(page)}
                        disabled={page === "..."}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => handlePageClick(currentPage + 1)}>
                    Next
                </button>
            </div>
        );
    };


    return variant === "classic" ? renderClassic() : renderBasic();
};


export default Pagination;
