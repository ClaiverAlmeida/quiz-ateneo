import { EmailService, EmailData } from './email-service';
import { ExcelService, ExcelData } from './excel-service';

export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  profile: 'alto' | 'medio' | 'baixo';
  quizAnswers: number[];
}

export interface QuizResult {
  success: boolean;
  message: string;
  details?: {
    emailSent?: boolean;
    excelSaved?: boolean;
    errors?: string[]; 
  };
}

export class QuizService {
  private static formatAnswers(quizAnswers: number[]): string {
    const questions = [
      "Qual é sua prioridade ao renovar um ambiente?",
      "Qual sua faixa de investimento para móveis e decoração?",
      "Que tipo de acabamento mais te atrai?",
      "Com que frequência você compra móveis de alto padrão?",
      "Como você vê a exclusividade em móveis?",
      "Como você prefere escolher móveis e decoração?",
      "Qual seu prazo ideal para receber os móveis?",
    ];

    const options = [
      [
        "Qualidade e durabilidade acima de tudo",
        "Design exclusivo e sofisticado",
        "Preço acessível e funcionalidade",
      ],
      ["Até R$ 15.000", "Entre R$ 15.000 e R$ 40.000", "Acima de R$ 40.000"],
      [
        "Madeira nobre e materiais naturais",
        "Couro legítimo e tecidos premium",
        "Materiais simples e funcionais",
      ],
      [
        "Frequentemente, busco sempre o melhor",
        "Algumas vezes, quando vale o investimento",
        "Raramente ou nunca",
      ],
      [
        "Prefiro peças únicas e exclusivas",
        "Busco equilíbrio entre exclusividade e preço",
        "Priorizo opções mais acessíveis",
      ],
      [
        "Com consultoria especializada e projeto personalizado",
        "Pesquiso bastante e escolho com orientação profissional",
        "Prefiro escolher sozinho(a) em lojas tradicionais",
      ],
      [
        "Aceito esperar por peças sob medida e exclusivas",
        "Prefiro pronta-entrega de linha selecionada",
        "Preciso de entrega imediata e prática",
      ],
    ];

    let answersFormatted = "";
    quizAnswers.forEach((score: number, index: number) => {
      if (index >= questions.length || index >= options.length) {
        answersFormatted += `${index + 1}. Pergunta não encontrada\n   Resposta: Score ${score}\n\n`;
        return;
      }

      const questionText = questions[index];
      const currentOptions = options[index];
      let selectedOption = "";

      if (!currentOptions || !Array.isArray(currentOptions)) {
        answersFormatted += `${index + 1}. ${questionText}\n   Resposta: Score ${score} (opções não disponíveis)\n\n`;
        return;
      }

      // Encontrar a opção baseada no score
      if (score === 3) {
        selectedOption =
          currentOptions.find(
            (opt) =>
              opt.includes("qualidade") ||
              opt.includes("Acima") ||
              opt.includes("nobre") ||
              opt.includes("Frequentemente") ||
              opt.includes("única") ||
              opt.includes("consultoria") ||
              opt.includes("sob medida")
          ) || currentOptions[0];
      } else if (score === 2) {
        selectedOption =
          currentOptions.find(
            (opt) =>
              opt.includes("Entre") ||
              opt.includes("Algumas") ||
              opt.includes("equilíbrio") ||
              opt.includes("Pesquiso") ||
              opt.includes("pronta-entrega")
          ) || currentOptions[1];
      } else {
        selectedOption =
          currentOptions.find(
            (opt) =>
              opt.includes("acessível") ||
              opt.includes("Até") ||
              opt.includes("simples") ||
              opt.includes("Raramente") ||
              opt.includes("sozinho") ||
              opt.includes("imediata")
          ) || currentOptions[2];
      }

      answersFormatted += `${index + 1}. ${questionText}\n   Resposta: ${selectedOption} (Score: ${score})\n\n`;
    });

    return answersFormatted;
  }

  private static calculateProfile(quizAnswers: number[]): { profile: string; averageScore: number } {
    const totalScore = quizAnswers.reduce((sum: number, score: number) => sum + score, 0);
    const averageScore = totalScore / quizAnswers.length;
    
    let profileText = "";
    if (averageScore >= 2.5) {
      profileText = "Alto Padrão (Cliente Premium)";
    } else if (averageScore >= 1.8) {
      profileText = "Médio Padrão (Cliente Equilibrado)";
    } else {
      profileText = "Baixo Padrão (Cliente Potencial)";
    }

    return { profile: profileText, averageScore };
  }

  static async submitQuiz(data: QuizSubmission): Promise<QuizResult> {
    try {
      const { profile, averageScore } = this.calculateProfile(data.quizAnswers);
      const answersFormatted = this.formatAnswers(data.quizAnswers);
      const timestamp = new Date().toISOString();

      // Preparar dados para email
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        profile,
        quizAnswers: data.quizAnswers,
        averageScore,
        answersFormatted,
      };

      // Preparar dados para Excel
      const excelData: ExcelData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        profile,
        quizAnswers: data.quizAnswers,
        averageScore,
        answersFormatted,
        timestamp,
      };

      // Executar operações em paralelo
      const [emailSent, excelSaved] = await Promise.all([
        EmailService.sendQuizEmail(emailData),
        ExcelService.saveToExcel(excelData),
      ]);

      const errors: string[] = [];
      if (!emailSent) errors.push('Falha ao enviar email');
      if (!excelSaved) errors.push('Falha ao salvar no Excel');

      return {
        success: emailSent || excelSaved, // Sucesso se pelo menos uma operação funcionou
        message: emailSent && excelSaved 
          ? 'Dados enviados com sucesso!'
          : 'Dados processados com sucesso (algumas operações falharam)',
        details: {
          emailSent,
          excelSaved,
          errors: errors.length > 0 ? errors : undefined,
        },
      };

    } catch (error) {
      console.error('Erro ao processar quiz:', error);
      return {
        success: false,
        message: 'Erro ao processar dados. Tente novamente.',
        details: {
          emailSent: false,
          excelSaved: false,
          errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
        },
      };
    }
  }
}
