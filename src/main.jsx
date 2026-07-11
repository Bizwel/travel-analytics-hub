import { DataProvider } from "./context/DataContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </ThemeProvider>
    </StrictMode>
);
