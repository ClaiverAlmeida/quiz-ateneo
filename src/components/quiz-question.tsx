import { useState } from 'react';

interface QuizQuestionProps {
  question: string;
  options: {
    text: string;
    score: number;
  }[];
  onAnswer: (optionIndex: number) => void;
  selectedOption: number | null;
  questionNumber: number;
}

export function QuizQuestion({ question, options, onAnswer, selectedOption, questionNumber }: QuizQuestionProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 mb-6 md:mb-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#5C2C1D]/5 to-transparent rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
        
        {/* Question number */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-[#5C2C1D] rounded-full flex items-center justify-center">
            <span className="text-white text-xs md:text-sm font-medium">{questionNumber}</span>
          </div>
          <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">Pergunta</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 mb-6 md:mb-8 lg:mb-10 leading-relaxed">
          {question}
        </h2>
        
        <div className="space-y-3 md:space-y-4">
          {options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isHovered = hoveredOption === index;
            
            return (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`w-full p-4 sm:p-5 md:p-6 text-left rounded-xl md:rounded-2xl border-2 transition-all duration-300 transform relative group active:scale-95 md:active:scale-[0.98] min-h-[60px] md:min-h-[72px] ${
                  isSelected
                    ? 'border-[#5C2C1D] bg-[#5C2C1D]/8 scale-[1.01] md:scale-[1.02] shadow-lg'
                    : isHovered
                    ? 'border-[#5C2C1D]/60 bg-[#5C2C1D]/5 scale-[1.005] md:scale-[1.01] shadow-md'
                    : 'border-gray-200 hover:border-[#5C2C1D]/40 hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                {/* Selection indicator */}
                <div className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#5C2C1D] bg-[#5C2C1D]' 
                    : 'border-gray-300 group-hover:border-[#5C2C1D]/60'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
                
                <div className="pl-7 md:pl-8 pr-2">
                  <span className={`text-base md:text-lg font-medium transition-colors duration-200 leading-relaxed ${
                    isSelected ? 'text-[#5C2C1D]' : 'text-gray-800'
                  }`}>
                    {option.text}
                  </span>
                </div>
                
                {/* Hover effect */}
                {isHovered && !isSelected && (
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-[#5C2C1D] rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}