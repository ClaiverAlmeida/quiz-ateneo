import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Teste básico do Google Apps Script
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      const testData = {
        name: 'Teste Sistema',
        email: 'teste@ateneo.com.br',
        phone: '(11) 99999-9999',
        profile: 'Alto Padrão (Teste)',
        averageScore: '2.85',
        answers: [3, 3, 2, 3, 2, 3, 1],
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      
      return NextResponse.json({
        success: true,
        message: 'Teste Google Sheets realizado com sucesso!',
        result: result,
        testData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'GOOGLE_APPS_SCRIPT_URL não configurada',
      });
    }
  } catch (error) {
    console.error('Erro no teste Google Sheets:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Teste manual com dados customizados
  try {
    const body = await request.json();
    
    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      return NextResponse.json({
        success: false,
        message: 'GOOGLE_APPS_SCRIPT_URL não configurada',
      });
    }

    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.text();
    
    return NextResponse.json({
      success: true,
      message: 'Dados enviados para Google Sheets!',
      result,
    });
  } catch (error) {
    console.error('Erro no teste manual:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}