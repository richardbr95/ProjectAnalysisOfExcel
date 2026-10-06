import ExcelContext from "../../context/ExcelContex";
import { useContext } from "react";
import ColumnCard from "../../components/ColumnCard/ColumnCard";

function DashBoard() {
  const context = useContext(ExcelContext);
  if (!context) {
    throw new Error("ExcelContext must be used inside ExcelProvider");
  }

  const { fileName, columns, data } = context;
  return (
    <section className="main-dashboard">
      <h1 className="h1-pattern">DashBoard</h1>
      {fileName ? (
        <div className="cards-container">
          {columns.map((column) => (
            <ColumnCard key={column} column={column} records={data.length} />
          ))}
        </div>
      ) : (
        "Por favor coloque um Arquivo Exel para Analisar"
      )}
    </section>
  );
}
export default DashBoard;
