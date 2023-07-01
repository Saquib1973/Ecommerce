import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 my-4"
    >
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <label htmlFor="category" className="text-base md:text-xl">
          {" "}
          New Category :
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          className="focus:outline-green-200 py-1 md:py-2 px-2 ms:px-4 text-base md:text-xl border-2 rouned-md border-green-500"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <button className="bg-green-400 p-4 py-2 hover:shadow-md hover:bg-green-200 hover:text-green-600 transition-all rounded-md text-white">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
