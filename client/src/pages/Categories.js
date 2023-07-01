import React from "react";
import Layout from "../Components/Layout";
import useCategory from "../hook/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const category = useCategory();
  return (
    <Layout title={`All Categories`}>
      <div className="flex flex-col h-screen w-full items-center justify-evenly">
        <p className="text-5xl overflow-hidden text-green-400 underline-offset-8 underline">
          All Categories
        </p>
        <div className="flex flex-wrap gap-4 py-2 w-full items-center justify-center">
          {category.map((c) => (
            <Link
              key={c._id}
              to={`/categories/category/${c.slug}`}
              className=" bg-green-200 text-4xl font-thin px-10 py-6 rounded-md hover:bg-green-400 transition-all shadow-md  active:scale-95 hover:text-green-200 text-green-800 "
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
