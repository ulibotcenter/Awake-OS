import type { PrivacyDoc } from './types';

export const privacyEs: PrivacyDoc = {
  lastUpdated: '23 de julio de 2026',
  legalLabel: 'LEGAL',
  contentsLabel: 'Contenido',
  metaDescription:
    'Política de Privacidad, protección de datos, derechos de autor y avisos legales de Awake OS por Ariel Uri · Somatic Labs Publishing.',
  footerCopy: 'Copyright © 2026 Ariel Uri / Somatic Labs Publishing. Todos los derechos reservados.',
  contactOrg: 'Somatic Labs Publishing',
  contactAttn: 'A/A: Ariel Uri — Privacidad y Legal',
  emailLabel: 'Email',
  websiteLabel: 'Sitio web',
  toc: [
    { id: 'introduction', label: '1. Introducción' },
    { id: 'information-collected', label: '2. Información que Recopilamos' },
    { id: 'how-we-use', label: '3. Cómo Usamos su Información' },
    { id: 'data-sharing', label: '4. Compartición y Terceros' },
    { id: 'cookies', label: '5. Cookies y Analytics' },
    { id: 'data-security', label: '6. Seguridad de los Datos' },
    { id: 'user-rights', label: '7. Derechos del Usuario' },
    { id: 'copyright', label: '8. Derechos de Autor y Propiedad Intelectual' },
    { id: 'disclaimer', label: '9. Descargo de Responsabilidad y Aviso Médico' },
    { id: 'changes', label: '10. Cambios a esta Política' },
    { id: 'contact', label: '11. Contacto' },
  ],
  sections: [
    {
      id: 'introduction',
      title: '1. Introducción',
      blocks: [
        {
          type: 'p',
          text: 'Esta página de Privacidad y Legal ("Política") rige su acceso y uso del sitio Awake OS en {{site}} (el "Sitio"), del libro Awake OS y materiales relacionados (el "Contenido"), y de cualquier lista de pre-lanzamiento operada por Ariel Uri y Somatic Labs Publishing (en conjunto, "nosotros", "nos" o "nuestro").',
        },
        {
          type: 'p',
          text: 'Al acceder al Sitio, enviar información mediante nuestros formularios, unirse a la lista de pre-lanzamiento o usar cualquier Contenido, usted reconoce haber leído, comprendido y aceptado esta Política en su totalidad. Si no está de acuerdo, debe interrumpir de inmediato el uso del Sitio y del Contenido.',
        },
        {
          type: 'p',
          text: 'Esta Política busca observar principios aplicables de protección de datos, incluidos los reflejados en el GDPR y en la LGPD, en la medida en que se apliquen a nuestras actividades de tratamiento. Nada en esta Política constituye asesoramiento jurídico para usted.',
        },
      ],
    },
    {
      id: 'information-collected',
      title: '2. Información que Recopilamos',
      blocks: [
        { type: 'p', text: 'Podemos recopilar las siguientes categorías de información:' },
        {
          type: 'list',
          items: [
            {
              label: 'Datos de registro de pre-lanzamiento:',
              text: 'Al unirse a la lista de pre-lanzamiento, recopilamos su nombre y dirección de email enviados voluntariamente a través del formulario del Sitio.',
            },
            {
              label: 'Datos técnicos y de uso:',
              text: 'Tipo de navegador, información del dispositivo, dirección IP, URL de referencia, páginas vistas, marcas de tiempo y datos de diagnóstico similares recopilados automáticamente cuando interactúa con el Sitio (incluido, con consentimiento, analytics agregado).',
            },
            {
              label: 'Datos en almacenamiento local:',
              text: 'El Sitio puede guardar preferencias o datos de sesión en el navegador (p. ej., localStorage) para funcionalidad, idioma y memoria de consentimiento de cookies.',
            },
            {
              label: 'Comunicaciones:',
              text: 'Cualquier correspondencia que nos envíe, incluidas consultas, soporte o avisos legales.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Usted declara y garantiza que toda la información proporcionada es precisa, actual y completa. Usted es el único responsable de la información que envía. No recopilamos conscientemente datos de menores de 18 años. Si cree que un menor ha proporcionado datos, contáctenos de inmediato.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: '3. Cómo Usamos su Información',
      blocks: [
        {
          type: 'p',
          text: 'Tratamos datos personales solo cuando tenemos una base legal, incluido el consentimiento, el interés legítimo, la necesidad contractual o la obligación legal. Podemos usar su información para:',
        },
        {
          type: 'list',
          items: [
            { text: 'Gestionar la lista de pre-lanzamiento y las comunicaciones de lanzamiento;' },
            { text: 'Enviar actualizaciones y comunicaciones relacionadas con Awake OS;' },
            { text: 'Operar, mantener, proteger y mejorar el Sitio y el Contenido;' },
            { text: 'Medir el tráfico y el comportamiento agregado del sitio (cuando hay consentimiento de analytics);' },
            { text: 'Responder a consultas y hacer valer nuestros derechos bajo esta Política;' },
            { text: 'Cumplir leyes, reglamentos y solicitudes legales aplicables;' },
            { text: 'Detectar, prevenir y abordar fraude, abuso o incidentes de seguridad.' },
          ],
        },
        {
          type: 'p',
          text: 'Al enviar su nombre y email para la lista de pre-lanzamiento, usted consiente expresamente dicho tratamiento. Puede retirar el consentimiento en cualquier momento contactándonos; la retirada no afecta la licitud del tratamiento previo y puede resultar en la eliminación de la lista.',
        },
        {
          type: 'p',
          text: '**No** vendemos, alquilamos ni comercializamos sus datos personales. No usamos sus datos para decisiones automatizadas con efectos jurídicos o igualmente significativos sin revisión humana.',
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '4. Compartición y Terceros',
      blocks: [
        {
          type: 'p',
          text: 'No compartimos sus datos personales con terceros excepto en las circunstancias limitadas descritas a continuación. Cualquier compartición se realiza con salvaguardas adecuadas y solo en la medida necesaria.',
        },
        {
          type: 'p',
          text: 'Utilizamos los siguientes proveedores / encargados del tratamiento:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Google Analytics 4 (GA4):',
              text: 'Usado para el análisis agregado de tráfico y comportamiento del sitio, solo cuando usted permite cookies de analytics en el banner de consentimiento.',
            },
            {
              label: 'Google Sheets / Google Apps Script:',
              text: 'Usados para almacenar leads de la lista de pre-lanzamiento (nombre y email) enviados mediante el formulario de registro.',
            },
            {
              label: 'Vercel:',
              text: 'Alojamiento e infraestructura de entrega del Sitio.',
            },
            {
              label: 'Otros proveedores de servicios:',
              text: 'Proveedores de confianza que puedan ayudar con el envío de email o infraestructura relacionada, sujetos a confidencialidad y obligaciones de tratamiento de datos;',
            },
            {
              label: 'Socios de lanzamiento:',
              text: 'Plataformas usadas para distribuir el libro o gestionar acceso anticipado, únicamente para cumplir solicitudes relacionadas con el lanzamiento;',
            },
            {
              label: 'Requisitos legales:',
              text: 'Cuando lo exija la ley, una orden judicial, una autoridad gubernamental o para proteger nuestros derechos, seguridad o propiedad;',
            },
            {
              label: 'Transferencias empresariales:',
              text: 'En relación con una fusión, adquisición o venta de activos, sujeta a la protección continua de sus datos.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Los sitios de terceros enlazados desde el Sitio se rigen por sus propias políticas de privacidad. No somos responsables de las prácticas, el contenido o la seguridad de ningún sitio o servicio de terceros. El uso de enlaces de terceros es bajo su propio riesgo.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '5. Cookies y Analytics',
      blocks: [
        {
          type: 'p',
          text: 'El Sitio puede usar cookies, local storage, session storage y tecnologías similares para funcionalidad esencial, preferencias, memoria de consentimiento y — solo si usted lo permite — comprensión del uso agregado mediante Google Analytics 4.',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Necesarias:',
              text: 'Requeridas para la operación básica del Sitio, seguridad, preferencia de idioma y recordar su elección de cookies en este dispositivo.',
            },
            {
              label: 'Analytics (opcional):',
              text: 'Google Analytics 4 para tráfico y comportamiento agregados. Se carga solo si elige "Aceptar todas las cookies" o "Aceptar solo cookies necesarias" en el banner (ambas opciones habilitan analytics en este momento). Si rechaza todas las cookies, no se cargan scripts de analytics.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Puede bloquear cookies en la configuración del navegador; algunas funciones del Sitio pueden verse afectadas. Los analytics no esenciales se presentan en la interfaz de consentimiento antes de la carga, de conformidad con la ley aplicable.',
        },
        {
          type: 'p',
          text: 'No usamos cookies ni tecnologías de seguimiento para crear perfiles de publicidad de terceros sin su consentimiento explícito.',
        },
      ],
    },
    {
      id: 'data-security',
      title: '6. Seguridad de los Datos',
      blocks: [
        {
          type: 'p',
          text: 'Implementamos medidas administrativas, técnicas y organizativas razonables diseñadas para proteger los datos personales frente a acceso, alteración, divulgación o destrucción no autorizados. Estas medidas pueden incluir cifrado en tránsito, controles de acceso y entornos de alojamiento seguros.',
        },
        {
          type: 'p',
          text: '**Ningún método de transmisión o almacenamiento es 100% seguro.** Aunque nos esforzamos por proteger su información, no podemos ni garantizamos seguridad absoluta. Usted reconoce y acepta que proporciona información bajo su propio riesgo. Renunciamos a toda responsabilidad por accesos no autorizados, violaciones de datos o incidentes fuera de nuestro control razonable.',
        },
        {
          type: 'p',
          text: 'Usted es responsable de mantener la confidencialidad de cualquier credencial o enlace que se le proporcione. Notifíquenos de inmediato en {{email}} si sospecha un uso no autorizado de su información.',
        },
      ],
    },
    {
      id: 'user-rights',
      title: '7. Derechos del Usuario (LGPD / GDPR)',
      blocks: [
        {
          type: 'p',
          text: 'Según su jurisdicción, puede tener los siguientes derechos respecto a sus datos personales. Las solicitudes pueden estar sujetas a verificación de identidad y limitaciones legales:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Acceso:',
              text: 'Solicitar confirmación de si tratamos sus datos y obtener una copia;',
            },
            {
              label: 'Rectificación:',
              text: 'Solicitar la corrección de datos inexactos o incompletos;',
            },
            {
              label: 'Supresión:',
              text: 'Solicitar la eliminación de sus datos, sujeta a obligaciones legales de retención;',
            },
            {
              label: 'Restricción:',
              text: 'Solicitar la limitación del tratamiento en determinadas circunstancias;',
            },
            {
              label: 'Portabilidad:',
              text: 'Recibir sus datos en un formato estructurado y de uso común cuando sea técnicamente viable;',
            },
            {
              label: 'Oposición:',
              text: 'Oponerse al tratamiento basado en intereses legítimos;',
            },
            {
              label: 'Retirar el consentimiento:',
              text: 'Cuando el tratamiento se base en el consentimiento, retirarlo en cualquier momento;',
            },
            {
              label: 'Reclamación:',
              text: 'Presentar una reclamación ante su autoridad local de protección de datos (p. ej., ANPD en Brasil o su autoridad supervisora de la UE).',
            },
          ],
        },
        {
          type: 'p',
          text: 'Para ejercer cualquier derecho, contacte {{email}}. Responderemos en el plazo exigido por la ley aplicable. Nos reservamos el derecho a denegar solicitudes manifiestamente infundadas, excesivas o prohibidas por la ley.',
        },
        {
          type: 'p',
          text: 'Los usuarios internacionales reconocen que los datos pueden tratarse en jurisdicciones con distintos estándares de protección. Cuando se requiera, implementamos salvaguardas adecuadas para transferencias internacionales.',
        },
      ],
    },
    {
      id: 'copyright',
      title: '8. Derechos de Autor y Propiedad Intelectual',
      blocks: [
        {
          type: 'p',
          text: 'Copyright © 2026 Ariel Uri. Todos los derechos reservados.\nAWAKE OS™ es una marca en trámite.\nPublicado por Somatic Labs Publishing.',
        },
        {
          type: 'p',
          text: 'Ninguna parte de este libro puede reproducirse de ninguna forma ni por medios electrónicos o mecánicos, incluidos sistemas de almacenamiento y recuperación de información, sin permiso escrito del autor, salvo el uso de citas breves en una reseña. Ninguna parte de esta publicación puede usarse o reproducirse para entrenar tecnologías de inteligencia artificial o modelos de aprendizaje automático sin permiso escrito expreso del editor.',
        },
        {
          type: 'p',
          text: 'Todas las historias de este libro son reales. Los nombres y detalles menores de identificación se han modificado para proteger la privacidad, pero los hechos, cronologías y resultados ocurrieron exactamente como se describen.',
        },
        {
          type: 'p',
          text: 'Todo el Contenido de este Sitio — incluidos textos, gráficos, logotipos, portadas, imágenes, software y el nombre y marca Awake OS — es propiedad exclusiva de Ariel Uri y/o Somatic Labs Publishing y está protegido por leyes internacionales de derechos de autor, marcas y propiedad intelectual. La reproducción, distribución, modificación, exhibición pública, scraping o uso derivado no autorizados están estrictamente prohibidos y pueden generar responsabilidad civil y penal.',
        },
        {
          type: 'meta',
          lines: ['Primera edición: abril de 2026', 'ISBN rústica: 978-84-09-85373-1'],
        },
      ],
    },
    {
      id: 'disclaimer',
      title: '9. Descargo de Responsabilidad y Aviso Médico',
      blocks: [
        {
          type: 'p',
          text: '**Awake OS no es consejo médico, psicológico ni terapéutico.** El libro, el Sitio y los materiales relacionados son herramientas educativas para el desarrollo personal y la auto-observación. **No** sustituyen el diagnóstico, el tratamiento, la terapia ni la atención de un médico, psicólogo, psiquiatra u otro profesional de la salud cualificado y colegiado.',
        },
        {
          type: 'p',
          text: 'Nada en Awake OS pretende diagnosticar, tratar, curar o prevenir ninguna enfermedad o condición de salud mental. Busque siempre el consejo de su médico u otro profesional de la salud cualificado ante cualquier duda sobre una condición médica o psicológica. Nunca ignore el consejo médico profesional ni demore su búsqueda por algo leído en el Contenido.',
        },
        {
          type: 'p',
          text: 'Los ejercicios, protocolos, metáforas y conceptos de Awake OS (incluidos marcos de sistema nervioso, software/hardware y contemplativos) se ofrecen **únicamente con fines educativos y de desarrollo personal**. Pueden suscitar emociones intensas, recuerdos o sensaciones físicas. Si se siente abrumado, deténgase de inmediato y consulte a un profesional de salud mental o médica colegiado.',
        },
        {
          type: 'p',
          text: '**Usted es el único responsable** de cómo aplica, interpreta o ignora cualquier parte del Contenido. Usted decide qué es apropiado para su cuerpo, mente y circunstancias. El autor y el editor no aceptan responsabilidad por pérdida, daño, lesión o sufrimiento — emocional, psicológico o físico — derivado del uso o mal uso de la información, ejercicios o ideas presentados.',
        },
        {
          type: 'p',
          text: 'Al leer el libro o usar el Sitio, usted acepta que en ninguna circunstancia Ariel Uri, Somatic Labs Publishing o sus afiliados son responsables de pérdidas, directas o indirectas, derivadas del Contenido, incluidos errores, omisiones o inexactitudes.',
        },
        {
          type: 'p',
          text: '**Limitaciones adicionales:** El Sitio, el Contenido y la lista Awake OS se proporcionan "TAL CUAL" y "SEGÚN DISPONIBILIDAD", sin garantías de ningún tipo, expresas, implícitas o legales, incluidas, entre otras, comerciabilidad, idoneidad para un fin particular, exactitud, no infracción o disponibilidad ininterrumpida.',
        },
        {
          type: 'p',
          text: 'En la máxima medida permitida por la ley aplicable, Ariel Uri, Somatic Labs Publishing y sus directivos, empleados, agentes y afiliados no serán responsables de daños directos, indirectos, incidentales, especiales, consecuentes, ejemplares o punitivos derivados del uso del Sitio, Contenido o lista Awake OS — incluida la pérdida de beneficios, datos, goodwill o lesiones personales — incluso si se les advirtió de la posibilidad de tales daños.',
        },
        {
          type: 'p',
          text: 'Usted acepta indemnizar, defender y eximir de responsabilidad a Ariel Uri y Somatic Labs Publishing de cualquier reclamación, daño, pérdida, responsabilidad y gasto (incluidos honorarios legales razonables) derivados de su uso del Sitio o Contenido, de su violación de esta Política o de la infracción de derechos de terceros.',
        },
      ],
    },
    {
      id: 'changes',
      title: '10. Cambios a esta Política',
      blocks: [
        {
          type: 'p',
          text: 'Nos reservamos el derecho de modificar, enmendar o reemplazar esta Política en cualquier momento, a nuestra sola discreción, sin previo aviso. Los cambios surten efecto al publicarse en esta página con una fecha de "Última actualización" revisada.',
        },
        {
          type: 'p',
          text: 'El uso continuado del Sitio o del Contenido tras cualquier modificación constituye su aceptación vinculante de la Política revisada. Si no está de acuerdo con la Política actualizada, debe cesar todo uso de inmediato.',
        },
        {
          type: 'p',
          text: 'Le animamos a revisar esta página periódicamente. Los cambios materiales que afecten sus derechos pueden, cuando lo exija la ley, comunicarse por email o mediante un aviso destacado en el Sitio.',
        },
      ],
    },
    {
      id: 'contact',
      title: '11. Contacto',
      blocks: [
        {
          type: 'p',
          text: 'Para solicitudes de privacidad, consultas legales, permisos de derechos de autor o cualquier pregunta sobre esta Política, contacte:',
        },
        { type: 'contact' },
        {
          type: 'p',
          text: 'Procuramos responder a todas las solicitudes legítimas en un plazo de 30 días, o antes cuando lo exija la ley de protección de datos aplicable.',
        },
      ],
    },
  ],
};
