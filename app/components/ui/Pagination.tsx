import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  category,
}: {
  totalPages: number;
  currentPage: number;
  category: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav
        className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
        aria-label="Pagination"
      >
        {/* Prev */}
        <Link
          href={`?page=${currentPage - 1}&category=${category}`}
          className={`px-3 py-1 ${
            currentPage === 1 ? "text-gray-400" : "cursor-pointer hover:text-black"
          }`}
          aria-disabled={currentPage === 1}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {pages.map((p) => (
          <Link
            key={p}
            href={`?page=${p}&category=${category}`}
            className={`h-9 w-9 flex items-center justify-center rounded-full cursor-pointer ${
              p === currentPage
                ? "bg-primary text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ))}

        {/* Next */}
        <Link
          href={`?page=${currentPage + 1}&category=${category}`}
          className={`px-3 py-1 ${
            currentPage === totalPages
              ? "text-gray-400"
              : "cursor-pointer hover:text-black"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </nav>
    </div>
  );
}
