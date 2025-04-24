/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

// 🔹 環境変数から API キーとベース URL を取得
const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔹 HTTP → HTTPS に変換する関数
const ensureHttps = (url) =>
  url?.startsWith("http://") ? url.replace("http://", "https://") : url;

const optionMappings = {
  english: "英語メニュー",
  wifi: "wifi",
  card: "カード払い",
  non_smoking: "禁煙席",
}

/**
 * 🔹 レストラン情報を取得するカスタムフック
 * @param {number} lat - 緯度
 * @param {number} lng - 経度
 * @param {string} genre - 選択されたジャンル
 * @param {number} distance - 検索範囲 (m)
 * @param {Array} options - 選択されたオプション (WiFi, 禁煙席など)
 * @param {number} page - ページ番号 (デフォルト 1)
 * @returns {Object} - レストランリスト、利用可能な結果数、エラーメッセージ
 */
const useRestaurants = (lat, lng, genre, distance, options = [], page = 1) => {
  const [restaurants, setRestaurants] = useState([]); // レストランリストの状態管理
  const [resultsAvailable, setResultsAvailable] = useState(0); // 検索結果の件数
  const [error, setError] = useState(null); // エラーメッセージ

  useEffect(() => {
    if (!lat || !lng) return; // 緯度・経度がない場合は処理しない

    const controller = new AbortController();
    const signal = controller.signal;

    // 🔹 API からレストラン情報を取得
    const fetchRestaurants = async () => {
      try {
        // 🔹 距離 (m) に応じた API の検索範囲を設定 (最大5)
        const apiRange = distance ? Math.min(Math.ceil(distance / 500), 5) : 3;

        // 🔹 オプションパラメータを組み立て (例: wifi=あり&card=あり)
        const featureParams = options && options.length > 0
          ? options.map((option) => {
              if (option === "wifi" || option === "non_smoking") {
                return `${option}=1`;  // WiFiは 1 に設定
              }
              return `${option}=あり`;
            }).join("&")
          : "";

        // 🔹 ページネーションの開始インデックス計算 (10件ずつ取得)
        const startIndex = (page - 1) * 10 + 1;

        // 🔹 API リクエスト URL を作成
        const queryParams = new URLSearchParams({
          path: 'gourmet/v1',
          key: API_KEY,
          lat: lat,
          lng: lng,
          range: apiRange,
          genre: genre || '',
          format: 'json',
          start: startIndex,
          ...Object.fromEntries(featureParams.split('&').map(param => param.split('=')))
        });

        const apiUrl = `/api/hotpepper?${queryParams.toString()}`;

        console.log("📡 APIリクエスト URL:", apiUrl);
        console.log(
          "🔎 選択されたジャンル:",
          genre,
          "距離:",
          distance,
          "オプション:",
          options,
          "ページ:",
          page,
          "開始インデックス:",
          startIndex
        );

        // 🔹 API からデータを取得
        const response = await fetch(apiUrl, { signal });
        if (!response.ok) {
          throw new Error(`HTTPエラー！ステータス: ${response.status}`);
        }

        // 🔹 JSON データを解析
        const data = await response.json();
        console.log("🔹 API 応答データ:", JSON.stringify(data, null, 2));

        // 🔹 レストランデータがある場合、状態を更新
        if (data.results?.shop?.length > 0) {
          setRestaurants(
            data.results.shop.map((shop) => ({
              ...shop,
              logo_image: ensureHttps(shop.logo_image), // HTTP → HTTPS 変換
            }))
          );
          setResultsAvailable(data.results.results_available);
        } else {
          console.warn("🚨 検索結果がありません。");
          setRestaurants([]);
          setResultsAvailable(0);
        }
      } catch (error) {
        // 🔹 API リクエストが中断された場合の処理
        if (error.name === "AbortError") {
          console.log("🚫 リクエストが中断されました。");
          return;
        }
        console.error("🍽️ API リクエストエラー:", error);
        setError(error.message);
      }
    };

    fetchRestaurants();

    // 🔹 クリーンアップ関数 (コンポーネントがアンマウントされたときにリクエストを中断)
    return () => {
      controller.abort();
    };
  }, [lat, lng, genre, distance, JSON.stringify(options), page]);

  return { restaurants, resultsAvailable, error };
};

export default useRestaurants;
