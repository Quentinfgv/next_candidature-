import mongoose from "mongoose"

const schema = new mongoose.Schema({
  entreprise: { type: String, required: true, trim: true },
  poste: { type: String, required: true, trim: true },
  statut: {
    type: String,
    enum: ["En attente", "Entretien", "Acceptée", "Refusée", "Relancée"],
    default: "En attente"
  },
  dateCandidature: { type: Date, default: Date.now },
  lienOffre: { type: String, default: "" },
  notes: { type: String, default: "" },
  localisation: { type: String, default: "" },
  typeContrat: {
    type: String,
    enum: ["CDI", "CDD", "Stage", "Alternance", "Freelance", "Autre"],
    default: "CDI"
  }
}, { timestamps: true })

export default mongoose.models.Candidature || mongoose.model("Candidature", schema)
