import Head from "next/head";
import React from "react";

import Footer from "../Footer";
import Navbar from "../Navbar";

import style from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={style.Layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
