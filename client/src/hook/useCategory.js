import { useState, useEffect } from "react";
import axios from "axios";
export default function useCategory() {
  const [category, setCategory] = useState([]);
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-all-categories`
      );
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return category;
}
