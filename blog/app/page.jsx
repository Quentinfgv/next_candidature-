"use client"
import { useState, useEffect } from "react"
import CandidatureForm from "./components/CandidatureForm"
import CandidatureList from "./components/CandidatureList"

export default function Home() {
  const [candidatures, setCandidatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)

  async function chargerCandidatures() {
    setLoading(true)
    try {
      const res = await fetch("/api/candidatures")
      const data = await res.json()
      setCandidatures(data)
    } catch (err) {
      console.log("erreur chargement", err)
    }
    setLoading(false)
  }

  useEffect(() => { chargerCandidatures() }, [])

  function ouvrirFormulaire() {
    setEditData(null)
    setShowForm(true)
  }

  function fermerFormulaire() {
    setEditData(null)
    setShowForm(false)
  }

  function lancerModification(candidature) {
    setEditData({
      ...candidature,
      dateCandidature: candidature.dateCandidature?.split("T")[0] || ""
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function supprimerCandidature(id) {
    if (!confirm("Supprimer cette candidature ?")) return
    try {
      await fetch(`/api/candidatures/${id}`, { method: "DELETE" })
      chargerCandidatures()
    } catch (err) {
      console.log("erreur suppression", err)
    }
  }

  function onSuccess() {
    chargerCandidatures()
    fermerFormulaire()
  }

  // stats rapides
  let nbAttente = candidatures.filter(c => c.statut === "En attente").length
  let nbEntretien = candidatures.filter(c => c.statut === "Entretien").length
  let nbAcceptee = candidatures.filter(c => c.statut === "Acceptée").length
  let nbRefusee = candidatures.filter(c => c.statut === "Refusée").length

  return (
    <>
      <div className="container mt-3">
        <nav className="navbar rounded px-3 justify-content-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(138,92,246,0.5)", backdropFilter: "blur(10px)" }}>
          <span className="fw-bold mb-0" style={{ color: "white", fontSize: "1.25rem" }}>Suivi de Candidatures</span>
        </nav>
      </div>

      <div className="container py-4">

        {candidatures.length > 0 && (
          <div className="row g-3 mb-4">
            <div className="col-6 col-md">
              <div className="card text-center">
                <div className="card-body py-3">
                  <h3 className="mb-0">{candidatures.length}</h3>
                  <small className="text-muted">Total</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="card text-center border-warning">
                <div className="card-body py-3">
                  <h3 className="mb-0 text-warning">{nbAttente}</h3>
                  <small className="text-muted">En attente</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="card text-center border-info">
                <div className="card-body py-3">
                  <h3 className="mb-0 text-info">{nbEntretien}</h3>
                  <small className="text-muted">Entretien</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="card text-center border-success">
                <div className="card-body py-3">
                  <h3 className="mb-0 text-success">{nbAcceptee}</h3>
                  <small className="text-muted">Acceptées</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="card text-center border-danger">
                <div className="card-body py-3">
                  <h3 className="mb-0 text-danger">{nbRefusee}</h3>
                  <small className="text-muted">Refusées</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showForm ? (
          <div className="text-center mb-4">
            <button onClick={ouvrirFormulaire} className="btn btn-primary w-100 py-3"
              style={{ position: "static", left: "auto", transform: "none" }}>
              + Ajouter une candidature
            </button>
          </div>
        ) : (
          <>
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {editData ? "Modifier la candidature" : "Nouvelle candidature"}
                </h4>
                <button onClick={fermerFormulaire} className="btn-close"
                  style={{ position: "static", left: "auto", transform: "none" }}></button>
              </div>
              <div className="card-body">
                <CandidatureForm
                  onSuccess={onSuccess}
                  editData={editData}
                  onCancel={editData ? fermerFormulaire : null}
                />
              </div>
            </div>
            <div className="text-center mb-4">
              <button onClick={fermerFormulaire} className="btn btn-outline-secondary w-100 py-2"
                style={{ position: "static", left: "auto", transform: "none" }}>
                Retour
              </button>
            </div>
          </>
        )}

        <h5 className="mb-3">Mes candidatures</h5>
        <CandidatureList
          candidatures={candidatures}
          onEdit={lancerModification}
          onDelete={supprimerCandidature}
          loading={loading}
        />
      </div>
    </>
  )
}
