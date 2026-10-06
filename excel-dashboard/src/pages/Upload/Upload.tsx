import { useContext, type ChangeEvent } from "react";
import * as XLSX from "xlsx";

import ExcelContext from "../../context/ExcelContex";
import FileCard from "../../components/FileCard/FileCard";

function Upload() {
  const context = useContext(ExcelContext);

  if (!context) {
    throw new Error("ExcelContext must be used inside ExcelProvider");
  }
  const {
    fileName,
    columns,
    data,
    setFileName,
    setColumns,
    setData,
    saveToHistory,
  } = context;

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;
    const dataFile = await file.arrayBuffer();

    const workbook = XLSX.read(dataFile);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const dataCompleted =
      XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

    if (dataCompleted.length === 0) {
      console.log("Excel is empty");
      return;
    }

    const parsedColumns = Object.keys(dataCompleted[0]);

    setData(dataCompleted);
    setColumns(parsedColumns);
    setFileName(file.name);

    saveToHistory({
      fileName: file.name,
      columns: parsedColumns,
      data: dataCompleted,
      uploadedAt: new Date().toLocaleString("pt-BR"),
    });
  }

  return (
    <>
      <section className="main-dashboard">
        <div>
          <h1 className="h1-pattern">Upload</h1>
          <div className="cards-container">
            {fileName ? (
              <FileCard
                file={fileName}
                columns={columns.length}
                records={data.length}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="select-file-upload">
          <input
            type="file"
            name="uploadbutton"
            id=""
            onChange={handleFileChange}
          />
          <p>
            {fileName
              ? `Arquivo Selecionado: ${fileName}`
              : "Nenhum Arquivo Selecionado"}
          </p>
        </div>
      </section>
    </>
  );
}

export default Upload;
