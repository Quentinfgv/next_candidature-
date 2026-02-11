import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Candidature from "@/models/Candidature"

// GET - récupérer toutes les candidatures
export async function GET(req) {
  await dbConnect()
  try {
    const candidatures = await Candidature.find({}).sort({ createdAt: -1 })
    return NextResponse.json(candidatures, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  await dbConnect()
  try {
    const body = await req.json()
    const candidature = await Candidature.create(body)
    return NextResponse.json(candidature, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 

  export async function DELETE(request,{params}){
  await  dbConnect()
  try{
    const {id}= await params
    const deleted=await Candidature.findByIdAndDelete(request.method === "DELETE" && !id ? null : id)
    if(!deleted) return NextResponse.json({error:"introuvable"},{status:404})
    return NextResponse.json(deleted,{status:200})
  }catch(error){
    return NextResponse.json({error:error.message},{status:500})
  } 
} 