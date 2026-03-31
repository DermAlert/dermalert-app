# Dermalert

Dermalert é uma aplicação móvel desenvolvida com React Native e Expo para auxiliar profissionais de saúde na gestão de pacientes dermatológicos. O app permite o registro e acompanhamento de lesões cutâneas, avaliação de riscos para câncer de pele, gestão de pacientes e muito mais, com suporte a diferentes perfis de usuário (pacientes, profissionais e supervisores).

## Funcionalidades Principais

- **Autenticação e Autorização**: Sistema de login com diferentes níveis de permissão (profissional e supervisor).
- **Gestão de Pacientes**: Visualização, busca e gerenciamento de pacientes associados a unidades de saúde.
- **Registro de Lesões**: Suporte para registro de lesões em categorias como Oncodermatologia (câncer de pele) e Úlceras.
- **Avaliação de Riscos**: Ferramentas para avaliação de fototipos, histórico familiar, fatores de risco e protetores.
- **Captura de Imagens**: Integração com câmera e galeria para documentar lesões.
- **Geração de Relatórios**: Capacidade de gerar PDFs com dados de pacientes e lesões.
- **Interface Adaptável**: Design responsivo com suporte a tablets e diferentes plataformas (Android, iOS, Web).

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicações móveis nativas.
- **Expo**: Plataforma para desenvolvimento, build e deploy de apps React Native.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **NativeWind**: Biblioteca para estilização com Tailwind CSS no React Native.
- **Expo Router**: Roteamento baseado em arquivos para navegação.
- **Axios**: Cliente HTTP para integração com APIs.
- **AsyncStorage**: Armazenamento local de dados.
- **Expo Camera e Image Picker**: Para captura e seleção de imagens.
- **React Hook Form**: Gerenciamento de formulários.
- **Phosphor Icons**: Biblioteca de ícones.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo ou emulador Android/iOS para testes

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/DermAlert/dermalert-app.git
   cd dermalert-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npx expo start --clear
   ```

## Como Usar

- **Desenvolvimento Geral**: `npx expo start --clear`
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`
- **Testes**: `npm test`

Para executar em um dispositivo físico, escaneie o QR code gerado pelo Expo ou use o Expo Go app.

## Estrutura do Projeto

```
src/
├── app/                 # Páginas e layouts (usando Expo Router)
│   ├── (app)/           # Rotas autenticadas
│   ├── (auth)/          # Rotas de autenticação
│   └── ...
├── components/          # Componentes reutilizáveis
├── contexts/            # Contextos para gerenciamento de estado
├── hooks/               # Hooks customizados
├── services/            # Serviços de API
├── storage/             # Utilitários de armazenamento
├── styles/              # Estilos globais e temas
├── types/               # Definições de tipos TypeScript
└── utils/               # Funções utilitárias
```

## Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.