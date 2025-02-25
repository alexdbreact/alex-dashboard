import dbConnect from "@/lib/dbConnect";
import Main from "@/models/Mains";
import { NextResponse } from "next/server";

 


 

export async function GET() {
  await dbConnect();
  const mains = await Main.find();
  return NextResponse.json({ mains });
}  
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Main.findByIdAndDelete(id);
  return NextResponse.json({ message: "main deleted" }, { status: 200 });
}
