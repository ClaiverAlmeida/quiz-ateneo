# 📧 Configuração do EmailJS

## ✅ **Solução implementada:**
- **EmailJS** integrado no frontend
- **Gratuito** até 200 emails/mês
- **Funciona** direto do browser (perfeito para FTP)

## 🔧 **Como configurar:**

### 1. **Criar conta no EmailJS:**
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita
- Confirme o email

### 2. **Configurar serviço de email:**
- Vá em **Email Services**
- Clique **Add New Service**
- Escolha **Gmail** (ou outro provedor)
- Configure com suas credenciais:
  - **Email:** mkt@ateneointeriores.com.br
  - **Senha:** (senha do email)

### 3. **Criar template:**
- Vá em **Email Templates**
- Clique **Create New Template**
- **Template ID:** `template_quiz_lead`
- **Subject:** `🎯 Novo Lead - {{profile}} - {{from_name}}`
- **Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #5C2C1D, #7A3726); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Novo Lead - Quiz Ateneo</h1>
  </div>
  
  <div style="padding: 30px; background: #f9f9f9;">
    <h2 style="color: #5C2C1D; margin-bottom: 20px;">📋 Dados do Cliente</h2>
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Nome:</strong> {{from_name}}</p>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Telefone:</strong> {{phone}}</p>
      <p><strong>Perfil Identificado:</strong> <span style="color: #5C2C1D; font-weight: bold;">{{profile}}</span></p>
      <p><strong>Score Médio:</strong> {{average_score}}/3.0</p>
    </div>

    <h2 style="color: #5C2C1D; margin-bottom: 20px;">📊 Respostas Detalhadas</h2>
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">{{answers}}</pre>
    </div>
  </div>
  
  <div style="background: #2c2c2c; color: white; padding: 20px; text-align: center;">
    <p style="margin: 0;">Ateneo Interiores - Sistema de Quiz</p>
    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Processado em {{timestamp}}</p>
  </div>
</div>
```

### 4. **Obter chaves:**
- Vá em **Account** > **General**
- Copie a **Public Key**
- Anote o **Service ID** (ex: `service_quiz_ateneo`)

### 5. **Atualizar o código:**
- No `index.html`, substitua `YOUR_PUBLIC_KEY` pela sua chave pública
- No `email-service.ts`, confirme os IDs:
  - `service_quiz_ateneo` (Service ID)
  - `template_quiz_lead` (Template ID)

## 🚀 **Resultado:**
- ✅ **Emails enviados** automaticamente
- ✅ **Template profissional** igual à API
- ✅ **Funciona no FTP** (sem backend)
- ✅ **Gratuito** até 200 emails/mês

## 📋 **Teste:**
1. Configure o EmailJS
2. Atualize as chaves no código
3. Teste o quiz
4. Verifique se o email chegou em `mkt@ateneointeriores.com.br`