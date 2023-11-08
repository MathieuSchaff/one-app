import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  console.log("request route login, ")
  try {

    const body: RequestBody = await request.json();
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPass } = user;
      const result = {
        ...userWithoutPass,
      };
      console.log("result route login, ", result);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.log("error route login, ", error);
    return new Response(
      null, {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
    );
  }
}
