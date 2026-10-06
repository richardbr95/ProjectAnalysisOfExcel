import { useNavigate } from "react-router-dom";
type ColumnCardProps = {
  column: string;
  records: number;
};

function ColumnCard({ records, column }: ColumnCardProps) {
  const navigate = useNavigate();
  return (
    <section
      className="data-card"
      onClick={() => navigate(`/column/${encodeURIComponent(column)}`)}
      style={{ cursor: "pointer" }}
    >
      <div>
        <h1 className="h1-title-upload">{column}</h1>
        <div className="card-stats">
          <div className="card-stat">
            <span>Registros</span>
            <strong>{records}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ColumnCard;
