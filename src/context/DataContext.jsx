import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [analysis, setAnalysis] = useState(null);
    const [rows, setRows] = useState([]);
    const [fileName, setFileName] = useState("");

    return (
       <DataContext.Provider
        value={{
        analysis,
        setAnalysis,
        
        rows,
        setRows,
        
        fileName,
        setFileName
        }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
