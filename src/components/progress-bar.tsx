interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12 px-1">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#5C2C1D] rounded-full"></div>
          <span className="text-xs md:text-sm font-medium text-gray-700">Progresso</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-sm md:text-base font-medium text-[#5C2C1D]">{currentStep}</span>
          <span className="text-xs md:text-sm text-gray-400">/</span>
          <span className="text-xs md:text-sm text-gray-500">{totalSteps}</span>
        </div>
      </div>
      
      {/* Progress track */}
      <div className="relative">
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] h-2 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-2 md:mt-3">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full border-2 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-[#5C2C1D] border-[#5C2C1D] scale-110'
                  : index === currentStep - 1
                  ? 'bg-[#5C2C1D] border-[#5C2C1D] scale-125 ring-2 md:ring-4 ring-[#5C2C1D]/20'
                  : 'bg-gray-100 border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}