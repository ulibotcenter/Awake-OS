import type { PrivacyDoc } from './types';

export const privacyPt: PrivacyDoc = {
  lastUpdated: '23 de julho de 2026',
  legalLabel: 'LEGAL',
  contentsLabel: 'Conteúdo',
  metaDescription:
    'Política de Privacidade, proteção de dados, direitos autorais e avisos legais do Awake OS por Ariel Uri · Somatic Labs Publishing.',
  footerCopy: 'Copyright © 2026 Ariel Uri / Somatic Labs Publishing. Todos os direitos reservados.',
  contactOrg: 'Somatic Labs Publishing',
  contactAttn: 'A/C: Ariel Uri — Privacidade e Legal',
  emailLabel: 'Email',
  websiteLabel: 'Site',
  toc: [
    { id: 'introduction', label: '1. Introdução' },
    { id: 'information-collected', label: '2. Informações que Coletamos' },
    { id: 'how-we-use', label: '3. Como Usamos suas Informações' },
    { id: 'data-sharing', label: '4. Compartilhamento e Terceiros' },
    { id: 'cookies', label: '5. Cookies e Analytics' },
    { id: 'data-security', label: '6. Segurança dos Dados' },
    { id: 'user-rights', label: '7. Direitos do Usuário' },
    { id: 'copyright', label: '8. Direitos Autorais e Propriedade Intelectual' },
    { id: 'disclaimer', label: '9. Isenção de Responsabilidade e Aviso Médico' },
    { id: 'changes', label: '10. Alterações nesta Política' },
    { id: 'contact', label: '11. Contato' },
  ],
  sections: [
    {
      id: 'introduction',
      title: '1. Introdução',
      blocks: [
        {
          type: 'p',
          text: 'Esta página de Privacidade e Legal ("Política") rege o seu acesso e uso do site Awake OS em {{site}} (o "Site"), do livro Awake OS e materiais relacionados (o "Conteúdo"), e de qualquer lista de pré-lançamento operada por Ariel Uri e Somatic Labs Publishing (em conjunto, "nós", "nos" ou "nosso").',
        },
        {
          type: 'p',
          text: 'Ao acessar o Site, enviar informações por nossos formulários, entrar na lista de pré-lançamento ou usar qualquer Conteúdo, você declara ter lido, compreendido e concordado com esta Política na íntegra. Se não concordar, deve interromper imediatamente o uso do Site e do Conteúdo.',
        },
        {
          type: 'p',
          text: 'Esta Política busca observar princípios aplicáveis de proteção de dados, inclusive os refletidos no GDPR e na Lei Geral de Proteção de Dados (LGPD), na medida em que se apliquem às nossas atividades de tratamento. Nada nesta Política constitui aconselhamento jurídico a você.',
        },
      ],
    },
    {
      id: 'information-collected',
      title: '2. Informações que Coletamos',
      blocks: [
        { type: 'p', text: 'Podemos coletar as seguintes categorias de informações:' },
        {
          type: 'list',
          items: [
            {
              label: 'Dados de registro na pré-lançamento:',
              text: 'Ao entrar na lista de pré-lançamento, coletamos seu nome e endereço de email enviados voluntariamente pelo formulário do Site.',
            },
            {
              label: 'Dados técnicos e de uso:',
              text: 'Tipo de navegador, informações do dispositivo, endereço IP, URLs de referência, páginas visitadas, carimbos de data/hora e dados diagnósticos semelhantes coletados automaticamente quando você interage com o Site (incluindo, com consentimento, analytics agregados).',
            },
            {
              label: 'Dados em armazenamento local:',
              text: 'O Site pode guardar preferências ou dados de sessão no navegador (ex.: localStorage) para funcionalidade, idioma e memória de consentimento de cookies.',
            },
            {
              label: 'Comunicações:',
              text: 'Qualquer correspondência que você nos envie, incluindo dúvidas, suporte ou avisos legais.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Você declara e garante que todas as informações fornecidas são precisas, atuais e completas. Você é o único responsável pelas informações enviadas. Não coletamos conscientemente dados de menores de 18 anos. Se souber de dados de um menor, contate-nos imediatamente.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: '3. Como Usamos suas Informações',
      blocks: [
        {
          type: 'p',
          text: 'Tratamos dados pessoais somente quando há base legal, incluindo consentimento, legítimo interesse, necessidade contratual ou obrigação legal. Podemos usar suas informações para:',
        },
        {
          type: 'list',
          items: [
            { text: 'Gerir a lista de pré-lançamento e comunicações de lançamento;' },
            { text: 'Enviar atualizações e comunicações relacionadas ao Awake OS;' },
            { text: 'Operar, manter, proteger e melhorar o Site e o Conteúdo;' },
            { text: 'Medir tráfego e comportamento agregado do site (quando houver consentimento de analytics);' },
            { text: 'Responder a solicitações e fazer valer nossos direitos sob esta Política;' },
            { text: 'Cumprir leis, regulamentos e ordens legais aplicáveis;' },
            { text: 'Detectar, prevenir e tratar fraude, abuso ou incidentes de segurança.' },
          ],
        },
        {
          type: 'p',
          text: 'Ao enviar nome e email para a lista de pré-lançamento, você consente expressamente com esse tratamento. Você pode retirar o consentimento a qualquer momento contatando-nos; a retirada não afeta a licitude do tratamento anterior e pode resultar na remoção da lista.',
        },
        {
          type: 'p',
          text: 'Nós **não** vendemos, alugamos ou negociamos seus dados pessoais. Não usamos seus dados para decisões automatizadas com efeitos jurídicos ou igualmente significativos sem revisão humana.',
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '4. Compartilhamento e Terceiros',
      blocks: [
        {
          type: 'p',
          text: 'Não compartilhamos seus dados pessoais com terceiros, exceto nas situações limitadas abaixo. Qualquer compartilhamento ocorre com salvaguardas adequadas e apenas na medida necessária.',
        },
        {
          type: 'p',
          text: 'Utilizamos os seguintes prestadores / operadores de dados:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Google Analytics 4 (GA4):',
              text: 'Usado para análise agregada de tráfego e comportamento no site, somente quando você permite cookies de analytics no banner de consentimento.',
            },
            {
              label: 'Google Sheets / Google Apps Script:',
              text: 'Usados para armazenar leads da lista de pré-lançamento (nome e email) enviados pelo formulário de registro.',
            },
            {
              label: 'Vercel:',
              text: 'Hospedagem e infraestrutura de entrega do Site.',
            },
            {
              label: 'Outros prestadores de serviço:',
              text: 'Fornecedores de confiança que possam auxiliar com envio de email ou infraestrutura relacionada, vinculados a obrigações de confidencialidade e tratamento de dados;',
            },
            {
              label: 'Parceiros de lançamento:',
              text: 'Plataformas usadas para distribuir o livro ou gerir acesso antecipado, apenas para cumprir solicitações relacionadas ao lançamento;',
            },
            {
              label: 'Exigências legais:',
              text: 'Quando exigido por lei, ordem judicial, autoridade governamental ou para proteger nossos direitos, segurança ou propriedade;',
            },
            {
              label: 'Transferências empresariais:',
              text: 'Em conexão com fusão, aquisição ou venda de ativos, sujeitas à proteção contínua dos seus dados.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Sites de terceiros linkados a partir do Site regem-se por suas próprias políticas de privacidade. Não somos responsáveis pelas práticas, conteúdo ou segurança de qualquer site ou serviço de terceiro. O uso de links de terceiros é por sua conta e risco.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '5. Cookies e Analytics',
      blocks: [
        {
          type: 'p',
          text: 'O Site pode usar cookies, local storage, session storage e tecnologias semelhantes para funções essenciais, preferências, memória de consentimento e — somente se você permitir — compreensão de uso agregado via Google Analytics 4.',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Necessários:',
              text: 'Essenciais para operação básica do Site, segurança, preferência de idioma e lembrar sua escolha de cookies neste dispositivo.',
            },
            {
              label: 'Analytics (opcional):',
              text: 'Google Analytics 4 para tráfego e comportamento agregados. Carregado apenas se você escolher "Aceitar todos os cookies" ou "Aceitar apenas cookies necessários" no banner (ambas as opções habilitam analytics neste momento). Se recusar todos os cookies, os scripts de analytics não são carregados.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Você pode bloquear cookies nas configurações do navegador; alguns recursos do Site podem ser afetados. Analytics não essenciais são apresentados na interface de consentimento antes do carregamento, em conformidade com a legislação aplicável.',
        },
        {
          type: 'p',
          text: 'Não usamos cookies ou tecnologias de rastreamento para criar perfis de publicidade de terceiros sem o seu consentimento explícito.',
        },
      ],
    },
    {
      id: 'data-security',
      title: '6. Segurança dos Dados',
      blocks: [
        {
          type: 'p',
          text: 'Implementamos medidas administrativas, técnicas e organizacionais razoáveis para proteger dados pessoais contra acesso, alteração, divulgação ou destruição não autorizados. Isso pode incluir criptografia em trânsito, controles de acesso e ambientes de hospedagem seguros.',
        },
        {
          type: 'p',
          text: '**Nenhum método de transmissão ou armazenamento é 100% seguro.** Embora nos esforcemos para proteger suas informações, não podemos e não garantimos segurança absoluta. Você reconhece e aceita fornecer informações por sua conta e risco. Isentamo-nos de responsabilidade por acessos não autorizados, violações de dados ou incidentes além do nosso controle razoável.',
        },
        {
          type: 'p',
          text: 'Você é responsável por manter a confidencialidade de credenciais ou links que lhe forem fornecidos. Notifique-nos imediatamente em {{email}} se suspeitar de uso não autorizado das suas informações.',
        },
      ],
    },
    {
      id: 'user-rights',
      title: '7. Direitos do Usuário (LGPD / GDPR)',
      blocks: [
        {
          type: 'p',
          text: 'Conforme sua jurisdição, você pode ter os seguintes direitos sobre seus dados pessoais. Pedidos podem exigir verificação de identidade e sujeitar-se a limites legais:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Acesso:',
              text: 'Solicitar confirmação de tratamento e obter cópia dos dados;',
            },
            {
              label: 'Retificação:',
              text: 'Solicitar correção de dados inexatos ou incompletos;',
            },
            {
              label: 'Eliminação:',
              text: 'Solicitar exclusão dos dados, sujeita a obrigações legais de retenção;',
            },
            {
              label: 'Restrição:',
              text: 'Solicitar limitação do tratamento em certas circunstâncias;',
            },
            {
              label: 'Portabilidade:',
              text: 'Receber seus dados em formato estruturado e de uso comum, quando tecnicamente viável;',
            },
            {
              label: 'Oposição:',
              text: 'Opor-se a tratamentos baseados em legítimo interesse;',
            },
            {
              label: 'Retirada de consentimento:',
              text: 'Quando o tratamento se baseia em consentimento, retirá-lo a qualquer momento;',
            },
            {
              label: 'Reclamação:',
              text: 'Apresentar reclamação à autoridade de proteção de dados (ex.: ANPD no Brasil ou autoridade supervisora da UE).',
            },
          ],
        },
        {
          type: 'p',
          text: 'Para exercer qualquer direito, contate {{email}}. Responderemos no prazo exigido pela lei aplicável. Reservamo-nos o direito de recusar pedidos manifestamente infundados, excessivos ou proibidos por lei.',
        },
        {
          type: 'p',
          text: 'Usuários internacionais reconhecem que os dados podem ser tratados em jurisdições com padrões diferentes de proteção. Quando exigido, implementamos salvaguardas adequadas para transferências internacionais.',
        },
      ],
    },
    {
      id: 'copyright',
      title: '8. Direitos Autorais e Propriedade Intelectual',
      blocks: [
        {
          type: 'p',
          text: 'Copyright © 2026 Ariel Uri. Todos os direitos reservados.\nAWAKE OS™ é marca em processo de registro.\nPublicado por Somatic Labs Publishing.',
        },
        {
          type: 'p',
          text: 'Nenhuma parte deste livro pode ser reproduzida de qualquer forma ou por quaisquer meios eletrônicos ou mecânicos, incluindo sistemas de armazenamento e recuperação de informações, sem permissão escrita do autor, exceto o uso de citações breves em resenha. Nenhuma parte desta publicação pode ser usada ou reproduzida para treinar tecnologias de inteligência artificial ou modelos de aprendizado de máquina sem permissão escrita expressa da editora.',
        },
        {
          type: 'p',
          text: 'Todas as histórias deste livro são reais. Nomes e detalhes menores de identificação foram alterados para proteger a privacidade, mas os eventos, cronologias e desfechos ocorreram exatamente como descritos.',
        },
        {
          type: 'p',
          text: 'Todo o Conteúdo deste Site — incluindo textos, gráficos, logotipos, capas, imagens, software e o nome e marca Awake OS — é propriedade exclusiva de Ariel Uri e/ou Somatic Labs Publishing e está protegido por leis internacionais de direitos autorais, marcas e propriedade intelectual. Reprodução, distribuição, modificação, exibição pública, scraping ou uso derivativo não autorizados são estritamente proibidos e podem gerar responsabilidade civil e criminal.',
        },
        {
          type: 'meta',
          lines: ['Primeira edição: abril de 2026', 'ISBN paperback: 978-84-09-85373-1'],
        },
      ],
    },
    {
      id: 'disclaimer',
      title: '9. Isenção de Responsabilidade e Aviso Médico',
      blocks: [
        {
          type: 'p',
          text: '**O Awake OS não é aconselhamento médico, psicológico ou terapêutico.** O livro, o Site e materiais relacionados são ferramentas educacionais para desenvolvimento pessoal e auto-observação. **Não** substituem diagnóstico, tratamento, terapia ou cuidados de médico, psicólogo, psiquiatra ou outro profissional de saúde qualificado e licenciado.',
        },
        {
          type: 'p',
          text: 'Nada no Awake OS tem por objetivo diagnosticar, tratar, curar ou prevenir qualquer doença ou condição de saúde mental. Procure sempre o conselho do seu médico ou de outro profissional de saúde qualificado com qualquer dúvida sobre uma condição médica ou psicológica. Nunca ignore orientação profissional nem adie busca de cuidado por algo que leu no Conteúdo.',
        },
        {
          type: 'p',
          text: 'Os exercícios, protocolos, metáforas e conceitos do Awake OS (incluindo frames de sistema nervoso, software/hardware e contemplativos) são oferecidos **apenas para fins educacionais e de desenvolvimento pessoal**. Podem despertar emoções fortes, memórias ou sensações físicas. Se se sentir sobrecarregado, pare imediatamente e consulte um profissional de saúde mental ou médica licenciado.',
        },
        {
          type: 'p',
          text: '**Você é o único responsável** por como aplica, interpreta ou ignora qualquer parte do Conteúdo. Você decide o que é adequado ao seu corpo, mente e circunstâncias. O autor e a editora não assumem responsabilidade por perda, dano, lesão ou sofrimento — emocional, psicológico ou físico — decorrente do uso ou mau uso das informações, exercícios ou ideias apresentados.',
        },
        {
          type: 'p',
          text: 'Ao ler o livro ou usar o Site, você concorda que, em nenhuma hipótese, Ariel Uri, Somatic Labs Publishing ou afiliados são responsáveis por perdas, diretas ou indiretas, decorrentes do Conteúdo, incluindo erros, omissões ou imprecisões.',
        },
        {
          type: 'p',
          text: '**Limitações adicionais:** O Site, o Conteúdo e a lista Awake OS são fornecidos "NO ESTADO EM QUE SE ENCONTRAM" e "CONFORME DISPONÍVEL", sem garantias de qualquer tipo, expressas, implícitas ou legais, incluindo, sem limitação, comerciabilidade, adequação a um fim específico, precisão, não violação ou disponibilidade ininterrupta.',
        },
        {
          type: 'p',
          text: 'Na máxima extensão permitida pela lei aplicável, Ariel Uri, Somatic Labs Publishing e seus diretores, colaboradores, agentes e afiliados não serão responsáveis por danos diretos, indiretos, incidentais, especiais, consequenciais, exemplares ou punitivos decorrentes do uso do Site, Conteúdo ou lista Awake OS — incluindo perda de lucros, dados, goodwill ou lesão pessoal — mesmo se avisados da possibilidade de tais danos.',
        },
        {
          type: 'p',
          text: 'Você concorda em indenizar, defender e isentar Ariel Uri e Somatic Labs Publishing de quaisquer reclamações, danos, perdas, responsabilidades e despesas (incluindo honorários advocatícios razoáveis) decorrentes do seu uso do Site ou Conteúdo, da violação desta Política ou da infração de direitos de terceiros.',
        },
      ],
    },
    {
      id: 'changes',
      title: '10. Alterações nesta Política',
      blocks: [
        {
          type: 'p',
          text: 'Reservamo-nos o direito de modificar, emendar ou substituir esta Política a qualquer momento, a nosso exclusivo critério, sem aviso prévio. As alterações passam a valer com a publicação nesta página e a atualização da data "Última atualização".',
        },
        {
          type: 'p',
          text: 'O uso continuado do Site ou do Conteúdo após qualquer modificação constitui aceitação vinculante da Política revisada. Se não concordar com a Política atualizada, deve cessar todo o uso imediatamente.',
        },
        {
          type: 'p',
          text: 'Recomendamos revisar esta página periodicamente. Alterações materiais que afetem seus direitos podem, quando exigido por lei, ser comunicadas por email ou aviso destacado no Site.',
        },
      ],
    },
    {
      id: 'contact',
      title: '11. Contato',
      blocks: [
        {
          type: 'p',
          text: 'Para solicitações de privacidade, consultas legais, permissões de direitos autorais ou dúvidas sobre esta Política, contate:',
        },
        { type: 'contact' },
        {
          type: 'p',
          text: 'Buscamos responder a todas as solicitações legítimas em até 30 dias, ou antes quando a lei de proteção de dados exigir.',
        },
      ],
    },
  ],
};
