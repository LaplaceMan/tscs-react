import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { getScrollTop } from "../utils/tools";

export const GlobalContext = React.createContext<GlobalContent>({
  toggleMenu: false,
  setToggleMenu: () => {},
  scrollHeight: 0,
});

export const GlobalProvider = ({ children }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      var height: number = getScrollTop();
      setScrollHeight(height);
    });
  }, []);
  return (
    <GlobalContext.Provider value={{ toggleMenu, setToggleMenu, scrollHeight }}>
      {children}
    </GlobalContext.Provider>
  );
};
