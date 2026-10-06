import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ExcelContext from "../../context/ExcelContex";

function History() {
  const context = useContext(ExcelContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("ExcelContext must be used inside ExcelProvider");
  }

  const { history, loadFromHistory } = context;

  function handleLoad(entry: (typeof history)[0]) {
    loadFromHistory(entry);
    navigate("/");
  }

  return (
    <section className="main-dashboard" style={{ padding: "20px" }}>
      <h1 className="h1-pattern">History</h1>

      {history.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.5 }}>
          Nenhum arquivo enviado ainda.
        </p>
      ) : (
        <div className="cards-container">
          {history.map((entry) => (
            <div
              key={entry.fileName}
              className="data-card"
              onClick={() => handleLoad(entry)}
              style={{ cursor: "pointer" }}
            >
              <h1 className="h1-title-upload">{entry.fileName}</h1>
              <div className="card-stats">
                <div className="card-stat">
                  <span>Colunas</span>
                  <strong>{entry.columns.length}</strong>
                </div>
                <div className="card-stat">
                  <span>Registros</span>
                  <strong>{entry.data.length}</strong>
                </div>
              </div>
              <p style={{ fontSize: "12px", opacity: 0.5, marginTop: "10px" }}>
                {entry.uploadedAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default History;
