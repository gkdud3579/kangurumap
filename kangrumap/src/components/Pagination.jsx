import styles from "../styles/Pagination.module.scss";

/**
 * Pagination コンポーネント
 * - 検索結果のページネーションを管理
 * - 最大5ページ分のページ番号を表示
 *
 * @param {number} currentPage - 現在のページ番号
 * @param {number} totalPages - 総ページ数
 * @param {Function} onPageChange - ページ変更時に実行される関数
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // 📌 一度に表示する最大ページ数
  const pages = [];

  // 📌 表示するページ範囲を計算
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  // 📌 表示ページ数が不足している場合、範囲を調整
  if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  // 📌 ページリストを作成
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* ⏮️ 最初のページへ移動 (≪) */}
      {currentPage > 1 && (
        <button className={styles.pageButton} onClick={() => onPageChange(1)}>
          ≪
        </button>
      )}

      {/* ⬅️ 前のページへ移動 (<) */}
      {currentPage > 1 && (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>
      )}

      {/* 🔢 ページ番号ボタン */}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => {
            console.log("📄 ページ移動:", page);
            onPageChange(page);
          }}
        >
          {page}
        </button>
      ))}

      {/* ➡️ 次のページへ移動 (>) */}
      {currentPage < totalPages && (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      )}

      {/* ⏭️ 最後のページへ移動 (≫) */}
      {currentPage < totalPages && (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(totalPages)}
        >
          ≫
        </button>
      )}
    </div>
  );
};

export default Pagination;
