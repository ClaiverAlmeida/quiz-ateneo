import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Erro ao ler JSON do formulário:", parseError);
      return NextResponse.json(
        {
          error:
            "Não foi possível processar os dados enviados. Verifique sua conexão e tente novamente.",
        },
        { status: 400 },
      );
    }
    console.log("Requisição recebida em /api/submit-quiz:", body);
    const { name, email, phone, profile, quizAnswers } = body;

    // Validação básica
    if (
      !name ||
      !email ||
      !phone ||
      !profile ||
      !Array.isArray(quizAnswers) ||
      quizAnswers.length === 0
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios e o quiz deve ser concluído." },
        { status: 400 },
      );
    }

    // Configuração do transportador de email
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER || "envio@ateneointeriores.com.br",
        pass: process.env.SMTP_PASS,
      },
    });

    // Mapear respostas para texto legível
    const questionsText = [
      "Qual é sua prioridade ao renovar um ambiente?",
      "Qual sua faixa de investimento para móveis e decoração?",
      "Que tipo de acabamento mais te atrai?",
      "Com que frequência você compra móveis de alto padrão?",
      "Como você vê a exclusividade em móveis?",
      "Como você prefere escolher móveis e decoração?",
      "Qual seu prazo ideal para receber os móveis?",
    ];

    const optionsText = [
      [
        "Qualidade e durabilidade acima de tudo",
        "Design exclusivo e sofisticado",
        "Preço acessível e funcionalidade",
      ],
      [
        "Até R$ 15.000",
        "Entre R$ 15.000 e R$ 40.000",
        "Acima de R$ 40.000",
      ],
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

    // Construir respostas formatadas
    let answersFormatted = "";
    quizAnswers.forEach((score: number, index: number) => {
      const questionText = questionsText[index];
      let selectedOption = "";

      // Encontrar a opção baseada no score
      if (score === 3) {
        selectedOption =
          optionsText[index].find(
            (opt) =>
              opt.includes("qualidade") ||
              opt.includes("Acima") ||
              opt.includes("nobre") ||
              opt.includes("Frequentemente") ||
              opt.includes("única") ||
              opt.includes("consultoria") ||
              opt.includes("sob medida"),
          ) || optionsText[index][0];
      } else if (score === 2) {
        selectedOption =
          optionsText[index].find(
            (opt) =>
              opt.includes("Entre") ||
              opt.includes("Algumas") ||
              opt.includes("equilíbrio") ||
              opt.includes("Pesquiso") ||
              opt.includes("pronta-entrega"),
          ) || optionsText[index][1];
      } else {
        selectedOption =
          optionsText[index].find(
            (opt) =>
              opt.includes("acessível") ||
              opt.includes("Até") ||
              opt.includes("simples") ||
              opt.includes("Raramente") ||
              opt.includes("sozinho") ||
              opt.includes("imediata"),
          ) || optionsText[index][2];
      }

      answersFormatted += `${index + 1}. ${questionText}\n   Resposta: ${selectedOption} (Score: ${score})\n\n`;
    });

    // Calcular perfil por extenso
    const totalScore = quizAnswers.reduce(
      (sum: number, score: number) => sum + score,
      0,
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

    // Template do email
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
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Processado em ${new Date().toLocaleString("pt-BR")}</p>
        </div>
      </div>
    `;

    // Preparar dados para Google Sheets
    const sheetsData = {
      name,
      email,
      phone,
      profile: profileText,
      averageScore: averageScore.toFixed(2),
      answers: quizAnswers,
      timestamp: new Date().toISOString(),
    };

    // Funções de envio paralelas
    const promises = [];

    // 1. Enviar email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      promises.push(
        transporter.sendMail({
          from:
            process.env.SMTP_FROM ||
            "Quiz Ateneo <envio@ateneointeriores.com.br>",
          to: process.env.ADMIN_EMAIL || "mkt@ateneointeriores.com.br",
          subject: `🎯 Novo Lead - ${profileText} - ${name}`,
          html: emailHtml,
        })
      );
    }

    // 2. Enviar para Google Sheets (se configurado)
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      promises.push(
        fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetsData),
        })
      );
    }

    // Executar envios em paralelo
    const results = await Promise.allSettled(promises);
    
    // Verificar resultados
    let emailSent = false;
    let sheetsSent = false;
    let errors = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        if (index === 0) emailSent = true;
        if (index === 1) sheetsSent = true;
      } else {
        errors.push(`Erro no envio ${index === 0 ? 'email' : 'Google Sheets'}: ${result.reason}`);
      }
    });

    // Log para análise
    console.log("Lead processado:", {
      name,
      email,
      phone,
      profile: profileText,
      averageScore,
      emailSent,
      sheetsSent,
      timestamp: new Date().toISOString(),
      errors: errors.length > 0 ? errors : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Dados enviados com sucesso!",
      details: {
        emailSent,
        sheetsSent,
        errors: errors.length > 0 ? errors : undefined,
      },
    });
  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro interno do servidor";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
