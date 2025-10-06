// Google Sheets API Integration (Método Avançado)
// Requer configuração de Service Account

import { GoogleAuth } from 'google-auth-library';
import { sheets_v4, google } from 'googleapis';

interface QuizData {
  name: string;
  email: string;
  phone: string;
  profile: string;
  averageScore: string;
  answers: number[];
  timestamp: string;
}

export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor() {
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Google Sheets credentials não configuradas');
    }

    const auth = new GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  }

  async addQuizData(data: QuizData) {
    try {
      const values = [
        [
          new Date(data.timestamp).toLocaleString('pt-BR'),
          data.name,
          data.email,
          data.phone,
          data.profile,
          data.averageScore,
          data.answers[0] || '',
          data.answers[1] || '',
          data.answers[2] || '',
          data.answers[3] || '',
          data.answers[4] || '',
          data.answers[5] || '',
          data.answers[6] || '',
          'Novo'
        ]
      ];

      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:N', // Ajuste conforme sua planilha
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      return { success: true, updatedRows: result.data.updates?.updatedRows };
    } catch (error) {
      console.error('Erro ao adicionar dados no Google Sheets:', error);
      throw error;
    }
  }

  async createSheet() {
    try {
      const headers = [
        'Data/Hora',
        'Nome', 
        'Email',
        'Telefone',
        'Perfil',
        'Score Médio',
        'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7',
        'Status'
      ];

      const result = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:N1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      return { success: true, result };
    } catch (error) {
      console.error('Erro ao criar cabeçalho:', error);
      throw error;
    }
  }
}

// Uso alternativo para API route
export async function addToGoogleSheets(data: QuizData) {
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    console.log('Google Sheets API não configurada, usando Apps Script...');
    return null;
  }

  try {
    const service = new GoogleSheetsService();
    return await service.addQuizData(data);
  } catch (error) {
    console.error('Erro Google Sheets API:', error);
    throw error;
  }
}