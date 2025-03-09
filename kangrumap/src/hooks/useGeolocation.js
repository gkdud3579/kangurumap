import { useState, useEffect } from "react";

/**
 * 🔹 useGeolocation カスタムフック
 * - ユーザーの現在位置情報を取得
 * - 位置情報の取得に失敗した場合のエラーハンドリングを実装
 */
const useGeolocation = () => {
  // 位置情報を保存するステート
  const [location, setLocation] = useState(null);

  // エラーメッセージを保存するステート
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔹 Geolocation API をサポートしていない場合の処理
    if (!navigator.geolocation) {
      setError("Geolocationをサポートしていないブラウザです。");
      return;
    }

    // 🔹 現在の位置情報を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 取得した緯度・経度をステートに保存
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        // 位置情報の取得に失敗した場合のエラー処理
        setError(`位置情報を取得できません: ${err.message}`);
      },
      {
        enableHighAccuracy: true, // 高精度の位置情報を取得
        timeout: 5000, // 5秒以内に応答がない場合はエラー
        maximumAge: 0, // 位置情報をキャッシュしない
      }
    );
  }, []);

  return { location, error }; // 位置情報とエラーを返す
};

export default useGeolocation;
