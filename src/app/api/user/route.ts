
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import * as z from "zod";
interface RequestBody {
  email: string;
  username: string;
  password: string;
}
const userSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }).max(20, {
    message: "username must be at most 20 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }).email().max(20, {
    message: "email must be at most 20 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { email, username, password } = userSchema.parse(body);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    }
    );
    if (existingUser) {
      return NextResponse.json({ error: 'Email already taken!' }, { status: 409 })
    }
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(body?.password, 10),
      },
    });
    const { password: userPassword, ...result } = user;
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
