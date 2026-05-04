export const siteConfig = {
  name: "Adelino B. Carvalho Instalações Elétricas Lda",
  shortName: "Adelino B. Carvalho",
  tagline: "Desde 1974 no setor elétrico",
  description:
    "Instalações elétricas seguras, eficientes e certificadas para habitação, comércio e indústria. Mais de 50 anos de experiência acumulada.",
  founded: 1974,
  incorporated: 2002,
  yearsAsCompany: 24,
  yearsExperience: 50,
  phone: "+351 000 000 000",
  email: "geral@adelinobcarvalho.pt",
  whatsapp: "351000000000",
  heroBackgroundImage: "",
  leadershipPhoto: "/foto-patroes-hero.png",
  address: {
    street: "",
    city: "Portugal",
    postalCode: "",
    country: "Portugal",
  },
  businessHours: "Seg–Sex: 8h–18h | Sáb: 8h–13h",
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "residencial",
    title: "Instalações Residenciais",
    description:
      "Instalações elétricas completas para habitação — do projeto à certificação e inspeção final.",
    icon: "Home",
  },
  {
    id: "comercial",
    title: "Instalações Comerciais",
    description:
      "Soluções elétricas para espaços comerciais, lojas, escritórios e restauração.",
    icon: "Building2",
  },
  {
    id: "industrial",
    title: "Instalações Industriais",
    description:
      "Infraestruturas elétricas robustas para indústria, armazéns e grandes instalações.",
    icon: "Factory",
  },
  {
    id: "quadros",
    title: "Quadros Elétricos",
    description:
      "Fornecimento, instalação e atualização de quadros elétricos com proteções certificadas.",
    icon: "LayoutGrid",
  },
  {
    id: "iluminacao",
    title: "Iluminação LED",
    description:
      "Projetos de iluminação LED eficientes para habitação, comércio e indústria.",
    icon: "Lightbulb",
  },
  {
    id: "certificacao",
    title: "Certificação e Inspeção",
    description:
      "Emissão de certificados elétricos e acompanhamento de inspeções pela CERTIEL/EDP.",
    icon: "ShieldCheck",
  },
  {
    id: "redes",
    title: "Redes e Infraestruturas",
    description:
      "Infraestruturas técnicas para telecomunicações, redes estruturadas e sistemas de dados.",
    icon: "Network",
  },
  {
    id: "carregadores",
    title: "Carregadores para VE",
    description:
      "Instalação de postos de carregamento para veículos elétricos em habitações e empresas.",
    icon: "Zap",
  },
  {
    id: "remodelacoes",
    title: "Remodelações Elétricas",
    description:
      "Atualização e remodelação de instalações elétricas antigas, com adequação às normas vigentes.",
    icon: "Hammer",
  },
];

export type PortfolioItem = {
  image: string;
  title: string;
  category: string;
  description: string;
  location?: string;
  service: string;
};

// Replace image paths with real photos in public/images/portfolio/
export const portfolio: PortfolioItem[] = [
  {
    image: "/images/portfolio/projeto-1.jpg",
    title: "Instalação Elétrica Residencial",
    category: "Residencial",
    description:
      "Instalação elétrica completa em moradia unifamiliar, incluindo quadro elétrico e iluminação.",
    location: "Lisboa",
    service: "Instalações Residenciais",
  },
  {
    image: "/images/portfolio/projeto-2.jpg",
    title: "Quadro Elétrico Industrial",
    category: "Industrial",
    description:
      "Fornecimento e instalação de quadro elétrico em unidade industrial, com proteções certificadas.",
    location: "Setúbal",
    service: "Quadros Elétricos",
  },
  {
    image: "/images/portfolio/projeto-3.jpg",
    title: "Iluminação LED Comercial",
    category: "Comercial",
    description:
      "Projeto de iluminação LED em espaço comercial, com redução de consumo energético de 60%.",
    location: "Almada",
    service: "Iluminação LED",
  },
  {
    image: "/images/portfolio/projeto-5.jpg",
    title: "Infraestrutura Técnica Empresarial",
    category: "Comercial",
    description:
      "Infraestrutura elétrica e de dados completa para edifício de escritórios.",
    location: "Lisboa",
    service: "Redes e Infraestruturas",
  },
  {
    image: "/images/portfolio/projeto-6.jpg",
    title: "Posto de Carregamento VE",
    category: "Residencial",
    description:
      "Instalação de carregador para veículo elétrico em moradia particular, com contador dedicado.",
    location: "Cascais",
    service: "Carregadores para VE",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "João Silva",
    role: "Proprietário de habitação",
    text: "Trabalho sério, limpo e com garantia. Recomendo sem hesitar a qualquer pessoa que precise de instalações elétricas de confiança.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Responsável de empresa",
    text: "Profissionais experientes e rigorosos. Cumpriram os prazos e o orçamento. A qualidade do trabalho é excelente.",
    rating: 5,
  },
  {
    name: "Carlos Rodrigues",
    role: "Empresário do setor industrial",
    text: "Já trabalhámos com a Adelino B. Carvalho em vários projetos industriais. A experiência e o profissionalismo fazem toda a diferença.",
    rating: 5,
  },
  {
    name: "Ana Ferreira",
    role: "Gerente de espaço comercial",
    text: "Reformulámos toda a instalação elétrica do nosso espaço e ficámos muito satisfeitos. Atendimento rápido e transparente.",
    rating: 5,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Que tipo de trabalhos realizam?",
    answer:
      "Realizamos instalações elétricas residenciais, comerciais e industriais, montagem de quadros elétricos, iluminação LED, certificação de instalações, infraestruturas técnicas e instalação de carregadores para veículos elétricos.",
  },
  {
    question: "Como posso pedir um orçamento?",
    answer:
      "Pode pedir um orçamento através do formulário de contacto nesta página, por telefone ou por email. Respondemos habitualmente dentro de 24 horas úteis. Dependendo do tipo de trabalho, podemos fazer uma visita técnica sem compromisso.",
  },
  {
    question: "Têm certificação para realizar instalações elétricas?",
    answer:
      "Sim. Somos uma empresa certificada, devidamente registada na DGEG (Direção-Geral de Energia e Geologia), e realizamos todos os trabalhos em conformidade com as normas técnicas e a legislação em vigor em Portugal.",
  },
  {
    question: "Emitem certificado elétrico após as obras?",
    answer:
      "Sim. Após a conclusão das obras, emitimos a declaração de conformidade das instalações e acompanhamos todo o processo de inspeção e certificação junto da entidade competente.",
  },
  {
    question: "Trabalham em todo o país?",
    answer:
      "A nossa área de atuação principal é Portugal Continental. Para projetos fora da área habitual, consulte-nos para verificar a disponibilidade.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Contacto e Diagnóstico",
    description:
      "Entre em contacto por telefone, email ou formulário. Analisamos o seu pedido e agendamos uma visita técnica se necessário.",
  },
  {
    step: "02",
    title: "Proposta e Orçamento",
    description:
      "Apresentamos uma proposta detalhada com orçamento claro, sem custos ocultos. Toda a documentação técnica é fornecida.",
  },
  {
    step: "03",
    title: "Execução e Acompanhamento",
    description:
      "Os trabalhos são executados por técnicos qualificados, com rigor técnico e respeito pelo espaço e prazos acordados.",
  },
  {
    step: "04",
    title: "Certificação e Entrega",
    description:
      "Após conclusão, emitimos toda a documentação de conformidade. A instalação fica certificada e entregue com garantia.",
  },
];
