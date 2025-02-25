import { cookies } from "next/headers";

const ADMIN_CREDENTIALS = {
  username: "Admiral",
  password: "372024",
};

export async function POST(req) {
  const { username, password } = await req.json();
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    cookies().set("session", "authenticated", { httpOnly: true, path: "/" });
    return new Response(null, { status: 200 });
  }
  
  return new Response(null, { status: 401 });
}

export async function GET() {
  const session = cookies().get("session");
  return session ? new Response(null, { status: 200 }) : new Response(null, { status: 401 });
}

export async function DELETE() {
  cookies().delete("session");
  return new Response(null, { status: 200 });
}
