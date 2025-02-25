import dbConnect from "@/lib/dbConnect";
import All from "@/models/Alls";
import { NextResponse } from "next/server";


 

export async function GET() {
    await dbConnect();
    const alls = await All.find();
    return NextResponse.json({ alls });
}

 

