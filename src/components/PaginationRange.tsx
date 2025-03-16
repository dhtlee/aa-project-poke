import Pagination from 'react-bootstrap/Pagination';

type PaginationRangeProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationRange = ({ currentPage, totalPages, onPageChange }: PaginationRangeProps) => {

  const getVisiblePageItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        {1}
      </Pagination.Item>
    );

    // Add ellipsis if more than 3 pages away from first
    if (currentPage > 4) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    // Add the range of pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Add another ellipsis if needed more than 3 pages away from last
    if (currentPage < totalPages - 3) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }

    // Always show last page if we have more than one page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {getVisiblePageItems()}

      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    </Pagination>
  );
}

export default PaginationRange;