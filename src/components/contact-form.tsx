import { useState } from 'react';
import { getSubmitQuizEndpoint } from '../utils/api-endpoints';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ContactFormProps {
  profile: 'alto' | 'medio' | 'baixo';
  quizAnswers: number[];
  onSubmit: () => void;
  onBack?: () => void;
}

export function ContactForm({ profile, quizAnswers, onSubmit, onBack }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : '';
      case 'email':
        return !value.includes('@') || !value.includes('.') ? 'E-mail inválido' : '';
      case 'phone':
        return value.length < 10 ? 'Telefone inválido' : '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar todos os campos
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Enviar dados para a API
      const endpoint = getSubmitQuizEndpoint();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profile,
          quizAnswers,
        }),
      });

      const rawResponse = await response.text();
      let result: any = null;

      if (rawResponse) {
        try {
          result = JSON.parse(rawResponse);
        } catch (parseError) {
          console.error('Resposta inválida da API:', rawResponse, parseError);
          throw new Error('Resposta inválida do servidor. Tente novamente em instantes.');
        }
      }

      if (!response.ok) {
        console.error(
          'Resposta da API (status):',
          response.status,
          rawResponse
        );
        if (response.status === 404) {
          throw new Error(
            'Endpoint de envio não encontrado. Verifique se a API está ativa e configure a variável de ambiente VITE_API_BASE_URL ou NEXT_PUBLIC_API_BASE_URL.'
          );
        }
        const messageFromApi =
          result && typeof result === 'object' && 'error' in result
            ? result.error
            : null;
        throw new Error(messageFromApi || `Erro ao enviar dados (status ${response.status})`);
      }

      setIsSubmitting(false);
      onSubmit();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao enviar dados. Tente novamente.';
      setErrors({ submit: message });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && Object.keys(errors).length === 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#5C2C1D]/5 to-transparent rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] rounded-2xl mx-auto mb-4 md:mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2 md:mb-3">
              Quase lá! 🎉
            </h2>
            <p className="text-base md:text-lg text-gray-600 px-2">
              Deixe seus dados para que nossa equipe entre em contato e transforme seu ambiente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Nome */}
            <div className="group">
              <Label htmlFor="name" className="text-gray-700 font-medium text-sm md:text-base">Nome completo</Label>
              <div className="relative mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-12 md:h-14 pl-10 md:pl-12 pr-4 border-2 rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#5C2C1D] focus:ring-[#5C2C1D]/20'
                  }`}
                  placeholder="Seu nome completo"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs md:text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm md:text-base">E-mail</Label>
              <div className="relative mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-12 md:h-14 pl-10 md:pl-12 pr-4 border-2 rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#5C2C1D] focus:ring-[#5C2C1D]/20'
                  }`}
                  placeholder="seu@email.com"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div className="group">
              <Label htmlFor="phone" className="text-gray-700 font-medium text-sm md:text-base">Telefone</Label>
              <div className="relative mt-2">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-12 md:h-14 pl-10 md:pl-12 pr-4 border-2 rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-200 ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#5C2C1D] focus:ring-[#5C2C1D]/20'
                  }`}
                  placeholder="(11) 99999-9999"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs md:text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Erro geral */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-3 md:space-y-0 md:space-x-4 md:flex md:flex-row-reverse">
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full md:flex-1 h-12 md:h-14 bg-gradient-to-r from-[#5C2C1D] to-[#7A3726] text-white rounded-xl md:rounded-2xl font-medium hover:shadow-xl hover:scale-[1.02] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 min-h-[48px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm md:text-base">Enviando...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm md:text-base">Finalizar e Receber Contato</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Botão Voltar */}
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="w-full md:w-auto h-12 md:h-14 bg-white border-2 border-gray-200 text-gray-700 rounded-xl md:rounded-2xl font-medium hover:border-[#5C2C1D] hover:text-[#5C2C1D] hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 min-h-[48px] px-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span className="text-sm md:text-base">Voltar</span>
                </button>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-3 md:gap-4 pt-3 md:pt-4 text-xs md:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Dados seguros</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sem spam</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
