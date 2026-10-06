type FileCardProps = {
  file: string;
  records: number;
  columns: number;
};

function FileCard({ file, records, columns }: FileCardProps) {
  return (
    <section className="data-card">
      <div>
        <h1 className="h1-title-upload">{file}</h1>
        <div className="card-stats">
          <div className="card-stat">
            <span>Colunas</span>
            <strong>{columns}</strong>
          </div>
          <div className="card-stat">
            <span>Registros</span>
            <strong>{records}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FileCard;
