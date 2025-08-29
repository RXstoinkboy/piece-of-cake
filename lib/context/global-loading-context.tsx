"use client";
import { createContext, useCallback, useContext, useState } from "react";

type GlobalLoadingContextType = {
  loading: Record<string, boolean>;
  startLoading: (key: string) => void;
  clearLoading: (key: string) => void;
  clearAllLoading: () => void;
  isLoading: () => boolean;
};

const GlobalLoadingContext = createContext<GlobalLoadingContextType>({
  loading: {},
  startLoading: () => {},
  clearLoading: () => {},
  clearAllLoading: () => {},
  isLoading: () => false,
});

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error(
      "useGlobalLoading must be used within GlobalLoadingProvider",
    );
  }
  return context;
};

export const GlobalLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const startLoading = useCallback((key: string) => {
    setLoadingState((prev) => ({ ...prev, [key]: true }));
  }, []);

  const clearLoading = useCallback((key: string) => {
    setLoadingState((prev) => {
      const newLoadingState = { ...prev };
      delete newLoadingState[key];
      return newLoadingState;
    });
  }, []);

  const clearAllLoading = useCallback(() => {
    setLoadingState({});
  }, []);

  const isLoading = useCallback(() => {
    return Object.values(loadingState).some((loading) => loading);
  }, [loadingState]);

  return (
    <GlobalLoadingContext.Provider
      value={{
        loading: loadingState,
        isLoading,
        clearAllLoading,
        clearLoading,
        startLoading,
      }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  );
};
