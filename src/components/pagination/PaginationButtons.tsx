interface props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationButtons({
  totalPages,
  currentPage,
  onPageChange,
}: props) {
  const visiblePages = 5;
  const currentPageIndex = currentPage - 1;
  let startPage = Math.max(0, currentPageIndex - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

  if (startPage < 0) {
    endPage = Math.min(totalPages - 1, visiblePages - 1);
    startPage = 0;
  }
  if (endPage >= totalPages) {
    startPage = Math.max(0, totalPages - visiblePages);
    endPage = totalPages - 1;
  }

  const pages = [];

  if (startPage > 0) {
    pages.push(
      <button key="start-ellipsis" onClick={() => onPageChange(1)}>
        ...
      </button>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i + 1}
        className={`mx-1 px-4 py-2 rounded-full border border-blue-600 ${
          currentPage === i + 1
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600"
        }`}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    );
  }

  if (endPage < totalPages - 1) {
    pages.push(
      <button key="end-ellipsis" onClick={() => onPageChange(totalPages)}>
        ...
      </button>
    );
  }

  return <div className="flex">{pages}</div>;
}
