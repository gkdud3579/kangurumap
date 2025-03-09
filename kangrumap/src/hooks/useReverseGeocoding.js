import { useState, useEffect } from "react";

/**
 * 🔹 緯度・経度から住所を取得するカスタムフック
 * @param {number} lat - 緯度 (latitude)
 * @param {number} lng - 経度 (longitude)
 * @returns {Object} - 住所 (`address`) と エラーメッセージ (`error`)
 */
const useReverseGeocoding = (lat, lng) => {
  const [address, setAddress] = useState(null); // 取得した住所を格納する状態
  const [error, setError] = useState(null); // エラー情報を格納する状態

  useEffect(() => {
    if (!lat || !lng) return; // 緯度・経度がない場合は処理しない

    // 🔹 住所情報を取得する非同期関数
    const fetchAddress = async () => {
      try {
        // 🔹 OpenStreetMapのNominatim APIを使用して逆ジオコーディングを実行
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        // 🔹 住所情報が存在する場合、状態を更新
        if (data.display_name) {
          setAddress(data.display_name);
        } else {
          throw new Error("住所を取得できませんでした。");
        }
      } catch (err) {
        setError(err.message); // エラーメッセージを保存
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return { address, error }; // 住所とエラーを返す
};

export default useReverseGeocoding;
