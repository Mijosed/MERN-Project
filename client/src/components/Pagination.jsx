const Pagination = ({ pageIndex, pageCount, setPageIndex }) => {
  return (
    <div className="flex gap-2 justify-center">
      <button
        className="border rounded p-1"
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
      >
        {'<<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => setPageIndex((prev) => prev - 1)}
        disabled={pageIndex === 0}
      >
        {'<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => setPageIndex((prev) => prev + 1)}
        disabled={pageIndex === pageCount - 1}
      >
        {'>'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={pageIndex === pageCount - 1}
      >
        {'>>'}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>{pageIndex + 1} sur {pageCount}</strong>
      </span>
    </div>
  );
};

export default Pagination;
