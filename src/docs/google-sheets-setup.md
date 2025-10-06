# Configuração Google Sheets - Quiz Ateneo

## Método 1: Google Apps Script (Simples)

### 1. Criar a Planilha
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha: "Quiz Ateneo - Leads"
3. Configure o cabeçalho na primeira linha:
   ```
   Data/Hora | Nome | Email | Telefone | Perfil | Score Médio | P1 | P2 | P3 | P4 | P5 | P6 | P7 | Status
   ```

### 2. Configurar Google Apps Script
1. Na planilha, vá em `Extensões > Apps Script`
2. Cole o código abaixo:

```javascript
function doPost(e) {
  try {
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Preparar os dados para a linha
    const timestamp = new Date();
    const row = [
      timestamp,
      data.name,
      data.email, 
      data.phone,
      data.profile,
      data.averageScore,
      data.answers[0] || '',
      data.answers[1] || '',
      data.answers[2] || '',
      data.answers[3] || '',
      data.answers[4] || '',
      data.answers[5] || '',
      data.answers[6] || '',
      'Novo'
    ];
    
    // Adicionar linha na planilha
    sheet.appendRow(row);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Dados salvos com sucesso'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erro:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Quiz Ateneo API - Funcionando!'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Publicar como Web App
1. Clique em `Implantar > Nova implantação`
2. Escolha tipo: `Aplicativo da web`
3. Configurações:
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em `Implantar`
5. **Copie a URL** fornecida (exemplo: `https://script.google.com/macros/s/ABC123.../exec`)

### 4. Testar
- Acesse a URL no navegador
- Deve retornar: `{"message":"Quiz Ateneo API - Funcionando!"}`

## Método 2: Google Sheets API (Avançado)

### Pré-requisitos
1. Criar projeto no Google Cloud Console
2. Ativar Google Sheets API
3. Criar credenciais de service account
4. Baixar arquivo JSON das credenciais
5. Compartilhar planilha com email do service account

### Configuração
```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="quiz-service@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="1ABC123xyz..."
```

*Implementação disponível mediante solicitação*