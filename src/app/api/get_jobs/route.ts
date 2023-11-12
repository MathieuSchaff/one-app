import { NextResponse } from "next/server";

import pw from "playwright";

const SBR_CDP = `wss://${process.env.BRD_AUTH}@brd.superproxy.io:9222`;
export const GET = async (req: Request, res: Response) => {
  console.log('Connecting to Scraping Browser...');
  const browser = await pw.chromium.connectOverCDP(SBR_CDP);
  return NextResponse.json({
  });
}
