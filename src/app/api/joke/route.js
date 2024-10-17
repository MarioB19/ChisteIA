import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { topic } = await request.json();

    if (!topic ) {
      return NextResponse.json({ error: 'Faltan los parámetros "topic" ' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!openai.apiKey) {
      return NextResponse.json({ error: 'Falta la clave API de OpenAI' }, { status: 500 });
    }

    const messages = [
      {
        role: 'system',
        content: `Eres un asistente de IA que cuenta chistes como si fueras un adolescente mexicano entre 18 y 20 años. Los chistes deben tener humor negro, ácido, doble sentido y el típico tono relajado y sarcástico que usaría un joven. Puedes usar groserías mexicanas de manera divertida, pero siempre cuidando no caer en insultos graves. Los chistes deben ser rápidos, irreverentes, con referencias culturales que sean entendibles para la chaviza. Recuerda que el objetivo es que el chiste sea como si lo contara un amigo en una peda, haciendo reír sin explicación adicional. Solo devuelves un chiste, en español.`,
      },
      {
        role: 'user',
        content: `Cuéntame un chiste sobre las siguientes categorías: ${topic}`,
      },
    ];
    
    

    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 150,
      temperature: 1.0, // Ajusta la temperatura para más variedad
    });

    const joke = response.choices[0].message.content.trim();

    return NextResponse.json({ joke });
  } catch (error) {
    console.error('Error al generar el chiste:', error);
    return NextResponse.json({ error: 'Error al generar el chiste' }, { status: 500 });
  }
}
