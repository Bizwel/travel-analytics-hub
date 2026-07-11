import { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [workbook, setWorkbook] = useState({
    fileName: "",
    sheetName: "",
    uploadedAt: null,
    rows: [],
    summary: null,
    rawStatusCounts: {},
    validation: {
      valid: false,
      errors: [],
    },
  });

  const clearWorkbook = () =>
    setWorkbook({
      fileName: "",
      sheetName: "",
      uploadedAt: null,
      rows: [],
      summary: null,
      rawStatusCounts: {},
      validation: {
        valid: false,
        errors: [],
      },
    });

  return (
    <DataContext.Provider
      value={{
        workbook,
        setWorkbook,
        clearWorkbook,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useAnalytics must be used inside DataProvider");
  }

  return context;
}
