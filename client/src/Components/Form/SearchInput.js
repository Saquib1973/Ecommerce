import React from "react";
import { useSearch } from "../../context/search.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const navigate = useNavigate();
  const [value, setValue] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.keyword.trim() === "") return;
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/product/search/${value.keyword}`
    );
    setValue({ ...value, results: data });
    navigate("/search");
  };
  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex gap-4 justify-center items-center w-full "
    >
      <input
        type="search"
        placeholder="search..."
        className="w-full lg:w-[30vw] py-3 px-4 rounded-md text-green-600 focus:outline-red-400 uppercase tracking-wide"
        value={value.keyword}
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
      />
      <button
        type="submit"
        className="text-xl hover:bg-green-200 p-1 px-4 rounded-md transition-all text-white hover:text-green-600 bg-green-500 border-2 hover:border-green-400 hover:shadow-md border-white"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
