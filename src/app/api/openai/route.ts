import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: "How to say hello in french?",
      temperature: 0.6,
    });
    const responseText = completion.choices[0].message.content
    return NextResponse.json({ responseText })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
