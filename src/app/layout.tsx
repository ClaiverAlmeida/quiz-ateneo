import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quiz Ateneo Interiores - Descubra Seu Perfil',
  description: 'Descubra seu perfil de investimento em interiores de luxo com nosso quiz interativo. Receba consultoria personalizada da Ateneo Interiores.',
  keywords: 'interiores, móveis de luxo, decoração, design de interiores, consultoria',
  authors: [{ name: 'Ateneo Interiores' }],
  openGraph: {
    title: 'Quiz Ateneo Interiores - Descubra Seu Perfil',
    description: 'Descubra seu perfil de investimento em interiores de luxo',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}