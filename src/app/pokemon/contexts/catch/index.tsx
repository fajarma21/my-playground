import React, { createContext, useContext } from "react";

import type { CatchProviderProps, CatchContextValue } from "./index.types";

const CatchContext = createContext<CatchContextValue | undefined>(undefined);

const CatchProvider = ({ children, onChangeCatchNew }: CatchProviderProps) => {
  return (
    <CatchContext.Provider
      value={{
        handleChangeCatchNew: onChangeCatchNew,
      }}
    >
      {children}
    </CatchContext.Provider>
  );
};

const useCatchContext = () => {
  const context = useContext(CatchContext);

  if (!context) {
    throw new Error(`"useCatchContext" must be used within "CatchProvider"`);
  }

  return context;
};

export { CatchProvider, useCatchContext };
