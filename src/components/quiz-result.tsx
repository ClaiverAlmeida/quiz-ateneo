interface QuizResultProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function QuizResult({ onContinue, onBack }: QuizResultProps) {
  // Mensagem genérica positiva para todos os perfis
  const content = {
    title: 'Parabéns pelo Seu Bom Gosto!',
    badge: 'Cliente Ideal',
    description: 'Suas respostas revelam um excelente senso estético e uma visão refinada para interiores. Você tem o perfil perfeito para nossos projetos exclusivos.',
    message: 'A Ateneo Interiores tem a solução ideal para transformar seu espaço em um ambiente único e sofisticado. Nossa equipe especializada está pronta para criar algo extraordinário para você.',
    ctaText: 'Falar com Especialista',
    icon: '✨',
    color: 'from-[#5C2C1D] to-[#7A3726]',
    bgColor: 'bg-gradient-to-br from-[#5C2C1D]/10 to-[#7A3726]/5'
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`${content.bgColor} rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-12 text-center relative overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-x-16 -translate-y-16 md:-translate-x-20 md:-translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-full translate-x-12 translate-y-12 md:translate-x-16 md:translate-y-16"></div>
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-gray-700 mb-4 md:mb-6">
            <div className="w-2 h-2 bg-[#5C2C1D] rounded-full"></div>
            {content.badge}
          </div>
          
          {/* Icon */}
          <div className="text-4xl md:text-6xl mb-4 md:mb-6 animate-bounce">
            {content.icon}
          </div>
          
          {/* Main content */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-4 md:mb-6 px-2">{content.title}</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed max-w-2xl mx-auto px-2">{content.description}</p>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 mx-2">
              <p className="text-[#5C2C1D] font-medium text-base md:text-lg">{content.message}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:justify-center sm:items-center">
            {/* Botão Voltar */}
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-6 md:px-8 py-4 rounded-2xl font-medium hover:border-[#5C2C1D] hover:text-[#5C2C1D] hover:shadow-lg hover:scale-105 transition-all duration-300 group min-h-[56px] w-full sm:w-auto order-2 sm:order-1"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                <span className="flex-1 sm:flex-none">Refazer Quiz</span>
              </button>
            )}

            {/* CTA Button */}
            <button
              onClick={onContinue}
              className={`inline-flex items-center justify-center gap-3 bg-gradient-to-r ${content.color} text-white px-6 md:px-8 py-4 rounded-2xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 group min-h-[56px] w-full sm:w-auto order-1 sm:order-2`}
            >
              <span className="flex-1 sm:flex-none">{content.ctaText}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          {/* Additional info */}
          <p className="text-xs md:text-sm text-gray-500 mt-4 md:mt-6 px-2">
            Continue para deixar seus dados e nossa equipe entrará em contato
          </p>
        </div>
      </div>
    </div>
  );
}