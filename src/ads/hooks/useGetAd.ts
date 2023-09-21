import { useState, useEffect } from "react";
import axios from "axios";
import { Ad } from "../types/ad";
function useGetAd(id: number): Ad | null {
  const [data, setData] = useState<Ad | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7262/api/ads/${id}`
        );

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return data;
}
export default useGetAd;
