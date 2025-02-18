import React, { createContext, useContext } from "react";

import type { MainProviderProps, MainContextValue } from "./index.types";

const MainContext = createContext<MainContextValue | undefined>(undefined);

const MainProvider = ({
  children,
  onSave,
  onUpdatePlant,
  ...rest
}: MainProviderProps) => {
  return (
    <MainContext.Provider
      value={{
        ...rest,
        handleSave: onSave,
        handleUpdatePlant: onUpdatePlant,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error(`"useMainContext" must be used within "MainProvider"`);
  }

  return context;
};

export { MainProvider, useMainContext };
