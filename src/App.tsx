import { useState } from 'react';
import { QuizHeader } from './components/quiz-header';
import { ProgressBar } from './components/progress-bar';
import { QuizQuestion } from './components/quiz-question';
import { QuizResult } from './components/quiz-result';
import { ContactForm } from './components/contact-form';
import { ThankYou } from './components/thank-you';

const quizQuestions = [
  {
    question: "Qual é sua prioridade ao renovar um ambiente?",
    options: [
      { text: "Qualidade e durabilidade acima de tudo", score: 3 },
      { text: "Design exclusivo e sofisticado", score: 3 },
      { text: "Preço acessível e funcionalidade", score: 1 }
    ]
  },
  {
    question: "Qual sua faixa de investimento para móveis e decoração?",
    options: [
      { text: "Até R$ 15.000", score: 1 },
      { text: "Entre R$ 15.000 e R$ 40.000", score: 2 },
      { text: "Acima de R$ 40.000", score: 3 }
    ]
  },
  {
    question: "Que tipo de acabamento mais te atrai?",
    options: [
      { text: "Madeira nobre e materiais naturais", score: 3 },
      { text: "Couro legítimo e tecidos premium", score: 3 },
      { text: "Materiais simples e funcionais", score: 1 }
    ]
  },
  {
    question: "Com que frequência você compra móveis de alto padrão?",
    options: [
      { text: "Frequentemente, busco sempre o melhor", score: 3 },
      { text: "Algumas vezes, quando vale o investimento", score: 2 },
      { text: "Raramente ou nunca", score: 1 }
    ]
  },
  {
    question: "Como você vê a exclusividade em móveis?",
    options: [
      { text: "Prefiro peças únicas e exclusivas", score: 3 },
      { text: "Busco equilíbrio entre exclusividade e preço", score: 2 },
      { text: "Priorizo opções mais acessíveis", score: 1 }
    ]
  },
  {
    question: "Como você prefere escolher móveis e decoração?",
    options: [
      { text: "Com consultoria especializada e projeto personalizado", score: 3 },
      { text: "Pesquiso bastante e escolho com orientação profissional", score: 2 },
      { text: "Prefiro escolher sozinho(a) em lojas tradicionais", score: 1 }
    ]
  },
  {
    question: "Qual seu prazo ideal para receber os móveis?",
    options: [
      { text: "Aceito esperar por peças sob medida e exclusivas", score: 3 },
      { text: "Prefiro pronta-entrega de linha selecionada", score: 2 },
      { text: "Preciso de entrega imediata e prática", score: 1 }
    ]
  }
];

type QuizStep = 'intro' | 'questions' | 'result' | 'contact' | 'thank-you';
type Profile = 'alto' | 'medio' | 'baixo';

export default function App() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<Profile>('baixo');

  const calculateProfile = (scores: number[]): Profile => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;
    
    if (averageScore >= 2.5) return 'alto';
    if (averageScore >= 1.8) return 'medio';
    return 'baixo';
  };

  const handleStartQuiz = () => {
    setCurrentStep('questions');
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Pega o score da opção selecionada
    const selectedScore = quizQuestions[currentQuestionIndex].options[selectedOption].score;
    const newAnswers = [...answers, selectedScore];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const profile = calculateProfile(newAnswers);
      setUserProfile(profile);
      setCurrentStep('result');
    }
  };

  const handleShowContact = () => {
    setCurrentStep('contact');
  };

  const handleSubmitContact = () => {
    setCurrentStep('thank-you');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'questions':
        if (currentQuestionIndex > 0) {
          // Voltar para pergunta anterior
          const newQuestionIndex = currentQuestionIndex - 1;
          const newAnswers = answers.slice(0, -1); // Remove a última resposta
          setCurrentQuestionIndex(newQuestionIndex);
          setAnswers(newAnswers);
          
          // Se há uma resposta anterior para esta pergunta, encontrar seu índice
          if (newAnswers[newQuestionIndex] !== undefined) {
            const previousScore = newAnswers[newQuestionIndex];
            const previousOptionIndex = quizQuestions[newQuestionIndex].options.findIndex(opt => opt.score === previousScore);
            setSelectedOption(previousOptionIndex);
          } else {
            setSelectedOption(null);
          }
        } else {
          // Voltar para intro se estiver na primeira pergunta
          setCurrentStep('intro');
          setCurrentQuestionIndex(0);
          setAnswers([]);
          setSelectedOption(null);
        }
        break;
      case 'result':
        // Voltar para a última pergunta
        setCurrentStep('questions');
        setCurrentQuestionIndex(quizQuestions.length - 1);
        
        // Restaurar a última resposta se existir
        if (answers.length > 0) {
          const lastScore = answers[answers.length - 1];
          const lastOptionIndex = quizQuestions[quizQuestions.length - 1].options.findIndex(opt => opt.score === lastScore);
          setSelectedOption(lastOptionIndex);
        } else {
          setSelectedOption(null);
        }
        break;
      case 'contact':
        // Voltar para resultado
        setCurrentStep('result');
        break;
      default:
        break;
    }
  };

  const showBackButton = currentStep !== 'intro' && currentStep !== 'thank-you';

  const renderContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="text-center">
            <QuizHeader showImage={true} />
            <div className="mt-6 md:mt-8">
              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 group min-h-[56px] w-full sm:w-auto"
              >
                <span>Iniciar Quiz</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              <p className="text-xs md:text-sm text-gray-500 mt-4 px-2">
                ⏱️ Apenas 2 minutos • 📊 Resultado personalizado • 🎯 100% gratuito
              </p>
            </div>
          </div>
        );

      case 'questions':
        return (
          <div>
            <QuizHeader showImage={false} />
            <ProgressBar 
              currentStep={currentQuestionIndex + 1} 
              totalSteps={quizQuestions.length} 
            />
            <QuizQuestion
              question={quizQuestions[currentQuestionIndex].question}
              options={quizQuestions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
              selectedOption={selectedOption}
              questionNumber={currentQuestionIndex + 1}
            />
            {/* Action buttons */}
            <div className="mt-6 md:mt-8">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-center md:items-center">
                {/* Botão Voltar */}
                <button
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 px-6 md:px-8 py-4 rounded-2xl font-medium hover:border-[#5C2C1D] hover:text-[#5C2C1D] hover:shadow-lg hover:scale-105 transition-all duration-300 group min-h-[56px] w-full md:w-auto order-2 md:order-1"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span className="text-center flex-1 md:flex-none">Voltar</span>
                </button>

                {/* Botão Próximo/Resultado */}
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] text-white px-6 md:px-8 py-4 rounded-2xl font-medium hover:shadow-xl hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 group min-h-[56px] w-full md:w-auto order-1 md:order-2"
                >
                  <span className="text-center flex-1 md:flex-none">
                    {currentQuestionIndex < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Meu Resultado'}
                  </span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div>
            <QuizHeader showImage={false} />
            <QuizResult 
              onContinue={handleShowContact}
              onBack={handleBack}
            />
          </div>
        );

      case 'contact':
        return (
          <div>
            <QuizHeader showImage={false} />
            <ContactForm
              profile={userProfile}
              quizAnswers={answers}
              onSubmit={handleSubmitContact}
              onBack={handleBack}
            />
          </div>
        );

      case 'thank-you':
        return (
          <div>
            <QuizHeader showImage={false} />
            <ThankYou />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-5xl">
        {renderContent()}
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#5C2C1D]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#5C2C1D]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}