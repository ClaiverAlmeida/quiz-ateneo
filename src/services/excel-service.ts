export interface ExcelData {
  name: string;
  email: string;
  phone: string;
  profile: string;
  quizAnswers: number[];
  averageScore: number;
  answersFormatted: string;
  timestamp: string;
}

export class ExcelService {
  private static getStoredLeads(): ExcelData[] {
    try {
      const stored = localStorage.getItem('quiz-leads');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao ler leads do localStorage:', error);
      return [];
    }
  }

  private static saveLeads(leads: ExcelData[]): void {
    try {
      localStorage.setItem('quiz-leads', JSON.stringify(leads));
    } catch (error) {
      console.error('Erro ao salvar leads no localStorage:', error);
    }
  }

  static async saveToExcel(data: ExcelData): Promise<boolean> {
    try {
      // Salvar no localStorage
      const existingLeads = this.getStoredLeads();
      const newLeads = [...existingLeads, data];
      this.saveLeads(newLeads);

      // Enviar para Google Sheets
      try {
        await this.sendToGoogleSheets(data);
        console.log('📊 Dados enviados para Google Sheets com sucesso');
      } catch (error) {
        console.warn('Falha ao enviar para Google Sheets, mas dados salvos localmente:', error);
      }

      console.log('📊 Dados salvos no localStorage');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  }

  private static async sendToGoogleSheets(data: ExcelData): Promise<void> {
    // Preparar dados para Google Sheets
    const sheetsData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      profile: data.profile,
      quizAnswers: data.quizAnswers,
      quizSnapshot: {
        averageScore: data.averageScore.toFixed(2),
        profileText: data.profile,
        totalScore: data.quizAnswers.reduce((sum, score) => sum + score, 0),
      },
      client: {
        userAgent: navigator.userAgent,
        timestamp: data.timestamp,
      },
      timestamp: data.timestamp,
    };

    // Usar fetch com no-cors para tentar enviar
    const response = await fetch("https://script.google.com/macros/s/AKfycbyJMlCIXGYql1LlRzpZzTAshscigK3ST8UPWq3_ZuyRhQDJWWZqZpV2-7ROojOYkRca/exec", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetsData),
    });

    console.log('📊 Tentativa de envio para Google Sheets realizada');
  }

  private static downloadCSV(leads: ExcelData[]): void {
    try {
      // Criar cabeçalho CSV
      const headers = ['Nome', 'Email', 'Telefone', 'Perfil', 'Score Médio', 'Respostas', 'Data/Hora'];
      
      // Converter dados para CSV
      const csvContent = [
        headers.join(','),
        ...leads.map(lead => [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.phone}"`,
          `"${lead.profile}"`,
          lead.averageScore.toFixed(2),
          `"${lead.answersFormatted.replace(/"/g, '""')}"`,
          `"${lead.timestamp}"`
        ].join(','))
      ].join('\n');

      // Criar e baixar arquivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `quiz-leads-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('📥 CSV baixado automaticamente');
    } catch (error) {
      console.error('Erro ao gerar CSV:', error);
    }
  }

  static async getLeads(): Promise<ExcelData[]> {
    try {
      return this.getStoredLeads();
    } catch (error) {
      console.error('Erro ao ler leads:', error);
      return [];
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      // Testar localStorage
      const testData = {
        name: 'Teste',
        email: 'teste@teste.com',
        phone: '(11) 99999-9999',
        profile: 'Teste',
        quizAnswers: [1, 2, 3],
        averageScore: 2.0,
        answersFormatted: 'Teste',
        timestamp: new Date().toISOString(),
      };
      
      this.saveLeads([testData]);
      const leads = this.getLeads();
      return (await leads).length > 0;
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      return false;
    }
  }

  static exportAllLeads(): void {
    const leads = this.getStoredLeads();
    if (leads.length > 0) {
      this.downloadCSV(leads);
    } else {
      console.log('Nenhum lead encontrado para exportar');
    }
  }
}
