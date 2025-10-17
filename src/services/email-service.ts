export interface EmailData {
  name: string;
  email: string;
  phone: string;
  profile: string;
  quizAnswers: number[];
  averageScore: number;
  answersFormatted: string;
}

export class EmailService {
  static async sendQuizEmail(data: EmailData): Promise<boolean> {
    try {
      const { name, email, phone, profile, quizAnswers } = data;

      // Validação básica
      if (
        !name ||
        !email ||
        !phone ||
        !profile ||
        !Array.isArray(quizAnswers) ||
        quizAnswers.length === 0
      ) {
        console.error("Dados inválidos para envio de email");
        return false;
      }

      // Mapear respostas para texto legível (EXATO da API)
      const questionsText = [
        "Qual é sua prioridade ao renovar um ambiente?",
        "Qual sua faixa de investimento para móveis e decoração?",
        "Que tipo de acabamento mais te atrai?",
        "Com que frequência você compra móveis de alto padrão?",
        "Como você vê a exclusividade em móveis?",
        "Como você prefere escolher móveis e decoração?",
        "Qual seu prazo ideal para receber os móveis?",
        "Pergunta adicional (dados extras)", // Para cobrir caso de 8 respostas
      ];

      const optionsText = [
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
        [
          "Dados extras - opção 1",
          "Dados extras - opção 2", 
          "Dados extras - opção 3",
        ],
      ];

      // Construir respostas formatadas (EXATO da API)
      let answersFormatted = "";
      quizAnswers.forEach((score: number, index: number) => {
        // Verificar se o índice existe nos arrays
        if (index >= questionsText.length || index >= optionsText.length) {
          console.warn(`Índice ${index} fora do range dos arrays. questionsText: ${questionsText.length}, optionsText: ${optionsText.length}`);
          answersFormatted += `${index + 1}. Pergunta não encontrada\n   Resposta: Score ${score}\n\n`;
          return;
        }

        const questionText = questionsText[index];
        const currentOptions = optionsText[index];
        let selectedOption = "";

        // Verificar se currentOptions existe e é um array
        if (!currentOptions || !Array.isArray(currentOptions)) {
          console.warn(`Opções não encontradas para índice ${index}`);
          answersFormatted += `${index + 1}. ${questionText}\n   Resposta: Score ${score} (opções não disponíveis)\n\n`;
          return;
        }

        // Encontrar a opção baseada no score (EXATO da API)
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

        answersFormatted += `${
          index + 1
        }. ${questionText}\n   Resposta: ${selectedOption} (Score: ${score})\n\n`;
      });

      // Calcular perfil por extenso (EXATO da API)
      const totalScore = quizAnswers.reduce(
        (sum: number, score: number) => sum + score,
        0
      );
      const averageScore = totalScore / quizAnswers.length;
      let profileText = "";

      if (averageScore >= 2.5) {
        profileText = "Alto Padrão (Cliente Premium)";
      } else if (averageScore >= 1.8) {
        profileText = "Médio Padrão (Cliente Equilibrado)";
      } else {
        profileText = "Baixo Padrão (Cliente Potencial)";
      }

      // Template do email (EXATO da API)
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #5C2C1D, #7A3726); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Novo Lead - Quiz Ateneo</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #5C2C1D; margin-bottom: 20px;">📋 Dados do Cliente</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${phone}</p>
              <p><strong>Perfil Identificado:</strong> <span style="color: #5C2C1D; font-weight: bold;">${profileText}</span></p>
              <p><strong>Score Médio:</strong> ${averageScore.toFixed(2)}/3.0</p>
            </div>

            <h2 style="color: #5C2C1D; margin-bottom: 20px;">📊 Respostas Detalhadas</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">${answersFormatted}</pre>
            </div>

            <div style="background: #5C2C1D; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
              <h3 style="margin: 0 0 10px 0;">🎯 Recomendação de Abordagem</h3>
              <p style="margin: 0; font-size: 16px;">
                ${
                  profile === "alto"
                    ? "Cliente com alto potencial! Priorize consultoria premium e peças exclusivas."
                    : profile === "medio"
                    ? "Cliente equilibrado. Foque em qualidade com bom custo-benefício."
                    : "Cliente potencial. Apresente opções acessíveis e inspire gradualmente."
                }
              </p>
            </div>
          </div>
          
          <div style="background: #2c2c2c; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">Ateneo Interiores - Sistema de Quiz</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Processado em ${new Date().toLocaleString(
              "pt-BR"
            )}</p>
          </div>
        </div>
      `;

      // ENVIAR EMAIL VIA EMAILJS (gratuito e funciona no frontend)
      const emailjs = (window as any).emailjs;
      
      if (!emailjs) {
        console.error('EmailJS não carregado');
        return false;
      }

      // Preparar dados para EmailJS (apenas variáveis)
      const recommendation = profile === "alto"
        ? "Cliente com alto potencial! Priorize consultoria premium e peças exclusivas."
        : profile === "medio"
        ? "Cliente equilibrado. Foque em qualidade com bom custo-benefício."
        : "Cliente potencial. Apresente opções acessíveis e inspire gradualmente.";

      const emailData = {
        to_email: 'mkt@ateneointeriores.com.br',
        from_name: name,
        from_email: email,
        phone: phone,
        profile: profileText,
        average_score: averageScore.toFixed(2),
        answers: answersFormatted,
        recommendation: recommendation,
        timestamp: new Date().toLocaleString('pt-BR'),
        subject: `🎯 Novo Lead - ${profileText} - ${name}`
      };

      try {
        // Enviar via EmailJS
        const result = await emailjs.send(
          'service_09h7ubh', // SUBSTITUA pelo seu Service ID real do EmailJS
          'template_93e9zwf',   // SUBSTITUA pelo seu Template ID real do EmailJS
          emailData
        );

        console.log('📧 Email enviado com sucesso via EmailJS:', result);
        return true;
      } catch (error) {
        console.error('Erro ao enviar via EmailJS:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao preparar email:', error);
      return false;
    }
  }

  static getPendingEmails(): any[] {
    try {
      return JSON.parse(localStorage.getItem('pending-emails') || '[]');
    } catch (error) {
      console.error('Erro ao ler emails pendentes:', error);
      return [];
    }
  }

  static clearPendingEmails(): void {
    localStorage.removeItem('pending-emails');
    console.log('📧 Emails pendentes removidos');
  }

  static exportPendingEmails(): void {
    const emails = this.getPendingEmails();
    if (emails.length === 0) {
      console.log('Nenhum email pendente para exportar');
      return;
    }

    // Criar CSV com emails pendentes
    const headers = ['Data/Hora', 'Para', 'Assunto', 'Nome', 'Email', 'Telefone', 'Perfil', 'Score'];
    const csvContent = [
      headers.join(','),
      ...emails.map(email => [
        `"${email.timestamp}"`,
        `"${email.to}"`,
        `"${email.subject}"`,
        `"${email.lead.name}"`,
        `"${email.lead.email}"`,
        `"${email.lead.phone}"`,
        `"${email.lead.profile}"`,
        `"${email.lead.averageScore}"`
      ].join(','))
    ].join('\n');

    // Baixar CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `emails-pendentes-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 CSV de emails pendentes baixado');
  }
}