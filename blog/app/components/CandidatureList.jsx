"use client"

const badgeClasses = {
  "En attente": "bg-warning text-dark",
  "Entretien": "bg-info text-dark",
  "Relancée": "bg-secondary",
  "Acceptée": "bg-success",
  "Refusée": "bg-danger"
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  })
}

export default function CandidatureList({ candidatures, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (!candidatures.length) {
    return (
      <div className="text-center py-5 border border-2 border-dashed rounded">
        <p className="fs-5 mb-1" style={{ color: "white" }}>Aucune candidature pour le moment</p>
        <p className="small" style={{ color: "white" }}>Utilisez le formulaire ci-dessus pour en ajouter une</p>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column gap-3">
      {candidatures.map(c => (
        <div key={c._id} className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h5 className="card-title mb-0">{c.entreprise}</h5>
                  <span className={"badge " + (badgeClasses[c.statut] || "bg-secondary")}>
                    {c.statut}
                  </span>
                </div>
                <p className="text-muted mb-2">{c.poste}</p>
                <div className="d-flex flex-wrap gap-3 small text-muted">
                  {c.typeContrat && <span>{c.typeContrat}</span>}
                  {c.localisation && <span>{c.localisation}</span>}
                  {c.dateCandidature && <span>{formatDate(c.dateCandidature)}</span>}
                </div>
                {c.notes && <p className="text-muted fst-italic mt-2 mb-0">{c.notes}</p>}
              </div>

              <div className="d-flex gap-2" style={{ position: "static" }}>
                {c.lienOffre && (
                  <a href={c.lienOffre} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                    style={{ position: "static", left: "auto", transform: "none" }}>Lien</a>
                )}
                <button onClick={() => onEdit(c)}
                  className="btn btn-outline-primary btn-sm"
                  style={{ position: "static", left: "auto", transform: "none" }}>Modifier</button>
                <button onClick={() => onDelete(c._id)}
                  className="btn btn-outline-danger btn-sm"
                  style={{ position: "static", left: "auto", transform: "none" }}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
