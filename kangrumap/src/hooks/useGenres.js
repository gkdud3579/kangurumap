import { useState, useEffect } from "react";

// 環境変数からAPIキーとベースURLを取得
const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// HTTPの画像URLをHTTPSに変換する関数
const ensureHttps = (url) =>
  url?.startsWith("http://") ? url.replace("http://", "https://") : url;

/**
 * 🔹 useGenres カスタムフック
 * - ホットペッパーAPIからジャンル情報を取得
 * - エラーハンドリングを実装
 */
const useGenres = () => {
  const [genres, setGenres] = useState([]); // ジャンル一覧を保存するステート
  const [error, setError] = useState(null); // エラーメッセージを保存するステート

  useEffect(() => {
    // 🔹 ジャンルデータをAPIから取得する非同期関数
    const fetchGenres = async () => {
      try {
        // APIリクエストを送信
        const response = await fetch(
          `${API_BASE_URL}/genre/v1/?key=${API_KEY}&format=json`
        );
        const data = await response.json(); // JSON形式でデータを取得

        // 🔹 APIからデータを正常に受信した場合
        if (data.results?.genre) {
          setGenres(
            data.results.genre.map((genre) => ({
              ...genre,
              image: ensureHttps(genre.image), // 画像URLをHTTPSに変換
            }))
          );
        } else {
          throw new Error("ジャンルデータを取得できませんでした。");
        }
      } catch (err) {
        setError(err.message); // エラーメッセージをセット
      }
    };

    fetchGenres(); // コンポーネントのマウント時にデータを取得
  }, []);

  return { genres, error }; // 取得したジャンルリストとエラーを返す
};

export default useGenres;
