import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcZgHosQ7U-Oyq5lF0BdELOji9-joZI9slLa2Bynq-RpWNQxbZvLGRNEvNyhy4zFcm4w/exec';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Nome e email são obrigatórios' }, { status: 400 });
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({ success: true, message: 'Lead salvo com sucesso!' });
    } else {
      throw new Error(data.message || 'Erro no Apps Script');
    }
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json({ 
      error: 'Erro ao salvar dados. Tente novamente.' 
    }, { status: 500 });
  }
}