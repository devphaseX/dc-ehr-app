"use client";

import { useRef, useState } from "react";

type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

const Layout = ({ navbar, children }: LayoutProps) => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  return (
    <div className="flex flex-col min-h-screen h-1">
      <div
        className="fixed w-full inset-x-0 bg-white z-50"
        ref={(el) => {
          setNavBarHeight(el ? el.getBoundingClientRect().height : 0);
        }}
      >
        {navbar}
      </div>
      <div
        className="relative h-1 flex-1"
        style={{
          paddingTop: `${navBarHeight}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
