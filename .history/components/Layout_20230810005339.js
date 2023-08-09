import React, { PropsWithChildren } from "react";
import HeaderNew from "./HeaderNew";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderNew />
      {children}
    </>
  );
};
export default Layout;
