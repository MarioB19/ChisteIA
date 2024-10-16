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
        content: `Eres un asistente de IA especializado en contar chistes. Solo devuelves el chiste sin información adicional. Nota: Sin importar la cantidad de categoria solo devuelve UN chiste y en espanol.`,
      },
      {
        role: 'user',
        content: `Por favor, cuéntame un chiste sobre las siguientes categorías: ${topic}`,

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
