import mongoose from "mongoose"

let isConnected = false

async function dbConnect() {
  if (isConnected) return

  if (!process.env.MONGODB_URI) {
    throw new Error("Il manque MONGODB_URI dans le .env.local")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
  } catch (err) {
    console.log("Erreur connexion MongoDB :", err)
    throw err
  }
}

export default dbConnect
