import styles from "../styles/Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // 한 번에 보이는 최대 페이지 개수
  const pages = [];

  // 표시할 페이지 범위 계산
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* 처음으로 이동 (<<) */}
      {currentPage > 1 && (
        <button className={styles.pageButton} onClick={() => onPageChange(1)}>
          ≪
        </button>
      )}

      {/* 이전 페이지 이동 (>) */}
      {currentPage > 1 && (
        <button className={styles.pageButton} onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </button>
      )}

      {/* 페이지 번호 버튼 */}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 이동 (>) */}
      {currentPage < totalPages && (
        <button className={styles.pageButton} onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </button>
      )}

      {/* 마지막 페이지 이동 (>>) */}
      {currentPage < totalPages && (
        <button className={styles.pageButton} onClick={() => onPageChange(totalPages)}>
          ≫
        </button>
      )}
    </div>
  );
};

export default Pagination;
