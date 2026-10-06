import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExcelContext from "../../context/ExcelContex";

function ColumnDetail() {
  const context = useContext(ExcelContext);
  const { columnName } = useParams<{ columnName: string }>();
  const navigate = useNavigate();

  if (!context) {
    throw new Error("ExcelContext must be used inside ExcelProvider");
  }

  const { data } = context;
  const decoded = decodeURIComponent(columnName ?? "");

  return (
    <section
      className="main-dashboard"
      style={{ padding: "20px", overflow: "hidden" }}
    >
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        ← Voltar
      </button>

      <h1 className="h1-pattern">{decoded}</h1>

      <div
        className="table-scroll"
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "calc(100vh - 500px)",
          width: "50%",
          margin: "30px auto",
          borderRadius: "8px",
          border: "1px solid rgba(245,244,245,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>{decoded}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{String(row[decoded] ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const backButtonStyle: React.CSSProperties = {
  cursor: "pointer",
  width: "fit-content",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid rgba(245,244,245,0.2)",
  background: "rgba(55, 25, 83, 0.3)",
  color: "inherit",
  fontSize: "14px",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 14px",
  borderBottom: "2px solid rgba(245,244,245,0.15)",
  fontSize: "14px",
  opacity: 0.7,
  position: "sticky",
  top: 0,
  background: "#16171d",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 14px",
  borderBottom: "1px solid rgba(245,244,245,0.08)",
  fontSize: "15px",
};

export default ColumnDetail;
