import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuizHeaderProps {
  showImage?: boolean;
}

export function QuizHeader({ showImage = true }: QuizHeaderProps) {
  return (
    <div className="text-center mb-8 md:mb-12 relative">
      {/* Hero Image */}
      {showImage && (
        <div className="relative mb-8 md:mb-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758448755952-42b404bc6f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBmdXJuaXR1cmUlMjBpbnRlcmlvciUyMGRlc2lnbiUyMHNvcGhpc3RpY2F0ZWR8ZW58MXx8fHwxNzU4ODE4NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Interior sofisticado Ateneo"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Logo overlay */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-lg">
              <span className="text-[#5C2C1D] text-lg md:text-xl font-medium tracking-wide">ATENEO</span>
            </div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-3 leading-tight">
              Descubra seu Estilo e Perfil de<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Investimento em Interiores de Luxo
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto md:mx-0">
              Responda a 7 perguntas rápidas e veja se o design Ateneo combina com você.
            </p>
          </div>
        </div>
      )}
      
      {/* Simple header for other pages */}
      {!showImage && (
        <>
          <div className="mb-6 md:mb-8">
            <div className="w-40 h-12 md:w-48 md:h-16 mx-auto bg-[#5C2C1D] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg md:text-xl font-medium tracking-wide">ATENEO</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-3 md:mb-4 leading-tight px-2">
            Descubra seu Estilo e Perfil de<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Investimento em Interiores de Luxo
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Responda a 7 perguntas rápidas e veja se o design Ateneo combina com você.
          </p>
        </>
      )}
    </div>
  );
}