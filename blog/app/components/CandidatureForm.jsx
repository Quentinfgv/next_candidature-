"use client"
import { useState } from "react"

export default function CandidatureForm({ onSuccess, editData, onCancel }) {
  const [form, setForm] = useState(editData || {
    entreprise: "", poste: "", statut: "En attente",
    dateCandidature: new Date().toISOString().split("T")[0],
    lienOffre: "", notes: "", localisation: "", typeContrat: "CDI"
  })
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErreur("")

    let url = "/api/candidatures"
    let method = "POST"
    if (editData) {
      url = `/api/candidatures/${editData._id}`
      method = "PUT"
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erreur serveur")
      }
      setForm({
        entreprise: "", poste: "", statut: "En attente",
        dateCandidature: new Date().toISOString().split("T")[0],
        lienOffre: "", notes: "", localisation: "", typeContrat: "CDI"
      })
      onSuccess()
    } catch (err) {
      setErreur(err.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Entreprise *</label>
          <input type="text" name="entreprise" className="form-control"
            value={form.entreprise} onChange={handleChange} required
            placeholder="Ex: Google, Microsoft..." />
        </div>

        <div className="col-md-6">
          <label className="form-label">Poste *</label>
          <input type="text" name="poste" className="form-control"
            value={form.poste} onChange={handleChange} required
            placeholder="Ex: Développeur Full Stack..." />
        </div>

        <div className="col-md-6">
          <label className="form-label">Statut</label>
          <select name="statut" className="form-select"
            value={form.statut} onChange={handleChange}>
            <option value="En attente">En attente</option>
            <option value="Entretien">Entretien</option>
            <option value="Relancée">Relancée</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Refusée">Refusée</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Type de contrat</label>
          <select name="typeContrat" className="form-select"
            value={form.typeContrat} onChange={handleChange}>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
            <option value="Freelance">Freelance</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date de candidature</label>
          <input type="date" name="dateCandidature" className="form-control"
            value={form.dateCandidature?.split("T")[0] || ""} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Localisation</label>
          <input type="text" name="localisation" className="form-control"
            value={form.localisation} onChange={handleChange}
            placeholder="Ex: Paris, Remote..." />
        </div>

        <div className="col-12">
          <label className="form-label">Lien de l&apos;offre</label>
          <input type="url" name="lienOffre" className="form-control"
            value={form.lienOffre} onChange={handleChange}
            placeholder="https://..." />
        </div>

        <div className="col-12">
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" rows={3}
            value={form.notes} onChange={handleChange}
            placeholder="Informations supplémentaires..." />
        </div>

        <div className="col-12 d-flex gap-2 mt-2">
          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ position: "static", left: "auto", transform: "none" }}>
            {loading ? "Envoi..." : editData ? "Modifier" : "Ajouter la candidature"}
          </button>
          {editData && onCancel && (
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}
              style={{ position: "static", left: "auto", transform: "none" }}>
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
