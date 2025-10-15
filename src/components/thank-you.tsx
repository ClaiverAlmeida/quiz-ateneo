export function ThankYou() {
  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-100/50 to-transparent rounded-full -translate-x-16 -translate-y-16 md:-translate-x-20 md:-translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-[#5C2C1D]/10 to-transparent rounded-full translate-x-12 translate-y-12 md:translate-x-16 md:translate-y-16"></div>

        <div className="relative z-10">
          {/* Success animation */}
          <div className="mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center animate-bounce">
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 md:mb-6 px-2">
              Obrigado por participar! 🎉
            </h2>

            <div className="bg-gradient-to-r from-[#5C2C1D]/10 to-[#7A3726]/5 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 mx-2">
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Nossa equipe entrará em contato <strong>em até 24 horas</strong>{" "}
                para transformar seu ambiente com a sofisticação Ateneo.
              </p>
            </div>

            {/* CTA Button - Visitar Site */}
            <div className="mb-8 md:mb-10">
              <a
                href="https://ateneointeriores.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] text-white px-8 py-4 rounded-2xl font-medium text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[56px] group"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Conheça Nosso Showroom</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Next steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#5C2C1D]/10 rounded-xl md:rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#5C2C1D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 md:mb-2">
                1. Ligação
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Nossa equipe entrará em contato
              </p>
            </div>

            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#5C2C1D]/10 rounded-xl md:rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#5C2C1D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 md:mb-2">
                2. Consulta
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Análise do seu espaço e necessidades
              </p>
            </div>

            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#5C2C1D]/10 rounded-xl md:rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#5C2C1D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 md:mb-2">
                3. Projeto
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Desenvolvimento da proposta ideal
              </p>
            </div>
          </div>

          {/* Social section */}
          <div className="pt-6 md:pt-8 border-t border-gray-100">
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 px-2">
              Enquanto isso, acompanhe nossas inspirações
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
              <a
                href="#"
                className="group flex items-center justify-center gap-3 bg-gray-50 hover:bg-[#5C2C1D] text-gray-600 hover:text-white px-6 py-3 rounded-2xl transition-all duration-300 min-h-[48px]"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-sm md:text-base">Instagram</span>
              </a>

              <a
                href="#"
                className="group flex items-center justify-center gap-3 bg-gray-50 hover:bg-[#5C2C1D] text-gray-600 hover:text-white px-6 py-3 rounded-2xl transition-all duration-300 min-h-[48px]"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.726-1.378l-.737 2.81c-.267 1.011-.994 2.275-1.48 3.043a11.96 11.96 0 003.54.522c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
                <span className="text-sm md:text-base">Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
