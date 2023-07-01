import React from "react";
// import Header from "./Header.js";
// import Footer from "./Footer.js";
import { Helmet } from "react-helmet";

function Layout({ children, title, description, author, keywords }) {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />

        <title>{title}</title>
      </Helmet>
      {/* <Header /> */}
      <main className="min-h-screen">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

Layout.defaultProps = {
  title: "Ecommerce",
  description: "",
  keywords: "",
  author: "Saquib",
};

export default Layout;
