import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [rows, setRows] = useState([]);
    const [summary, setSummary] = useState({});
    const [fileName, setFileName] = useState("");

    return (
        <DataContext.Provider
            value={{
                rows,
                setRows,
                summary,
                setSummary,
                fileName,
                setFileName,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
