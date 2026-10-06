import { createContext, useEffect, useState, type ReactNode } from "react";

type HistoryEntry = {
  fileName: string;
  columns: string[];
  data: Record<string, unknown>[];
  uploadedAt: string;
};

type ExcelProviderProps = {
  children: ReactNode;
};

type ExcelData = {
  fileName: string;
  columns: string[];
  data: Record<string, unknown>[];
  history: HistoryEntry[];

  setFileName: (filename: string) => void;
  setColumns: (columns: string[]) => void;
  setData: (data: Record<string, unknown>[]) => void;
  saveToHistory: (entry: HistoryEntry) => void;
  loadFromHistory: (entry: HistoryEntry) => void;
};

const HISTORY_KEY = "excel_history";

const ExcelContext = createContext<ExcelData | undefined>(undefined);

function ExcelProvider({ children }: ExcelProviderProps) {
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? (JSON.parse(stored) as HistoryEntry[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  function saveToHistory(entry: HistoryEntry) {
    setHistory((prev) => {
      const exists = prev.some((h) => h.fileName === entry.fileName);
      if (exists) return prev;
      return [entry, ...prev];
    });
  }

  function loadFromHistory(entry: HistoryEntry) {
    setFileName(entry.fileName);
    setColumns(entry.columns);
    setData(entry.data);
  }

  return (
    <ExcelContext.Provider
      value={{
        fileName,
        columns,
        data,
        history,
        setFileName,
        setColumns,
        setData,
        saveToHistory,
        loadFromHistory,
      }}
    >
      {children}
    </ExcelContext.Provider>
  );
}

export default ExcelContext;
export { ExcelProvider };
export type { HistoryEntry };
