import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// HTTP 이미지 URL을 HTTPS로 변환하는 함수 추가
const ensureHttps = (url) =>
  url?.startsWith("http://") ? url.replace("http://", "https://") : url;

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/genre/v1/?key=${API_KEY}&format=json`
        );
        const data = await response.json();

        if (data.results?.genre) {
          setGenres(
            data.results.genre.map((genre) => ({
              ...genre,
              image: ensureHttps(genre.image), // HTTP → HTTPS 변환
            }))
          );
        } else {
          throw new Error("장르 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGenres();
  }, []);

  return { genres, error };
};

export default useGenres;
