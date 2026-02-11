import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Candidature from "@/models/Candidature"

// GET - récupérer une candidature par ID
export async function GET(req, { params }) {
  await dbConnect()
  try {
    const { id } = await params
    const item = await Candidature.findById(id)
    if (!item) return NextResponse.json({ error: "introuvable" }, { status: 404 })
    return NextResponse.json(item, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  await dbConnect()
  try {
    const { id } = await params
    const body = await req.json()
    const updatedCandidature = await Candidature.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!updatedCandidature) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
    return NextResponse.json(updatedCandidature, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  await dbConnect()
  try {
    const { id } = await params
    const deletedCandidature = await Candidature.findByIdAndDelete(id)
    if (!deletedCandidature) {
      return NextResponse.json({ error: "introuvable" }, { status: 404 })
    }
    return NextResponse.json({ message: "Candidature supprimée avec succès" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
