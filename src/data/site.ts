export const siteConfig = {
  name: "Adelino B. Carvalho Instalações Elétricas Lda",
  shortName: "Adelino B. Carvalho",
  tagline: "Execução cuidada, obra limpa e acompanhamento próximo",
  description:
    "Trabalhos elétricos para habitação, comércio e indústria, com atenção ao detalhe, cumprimento das normas e acompanhamento claro em cada fase.",
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
      "Planeamento e execução para moradias, apartamentos e remodelações, com soluções ajustadas ao uso diário da casa.",
    icon: "Home",
  },
  {
    id: "comercial",
    title: "Instalações Comerciais",
    description:
      "Infraestruturas pensadas para lojas, escritórios e restauração, com atenção a iluminação, segurança e continuidade de funcionamento.",
    icon: "Building2",
  },
  {
    id: "industrial",
    title: "Instalações Industriais",
    description:
      "Redes dimensionadas para ambientes exigentes, armazéns e unidades produtivas com maiores necessidades de carga.",
    icon: "Factory",
  },
  {
    id: "quadros",
    title: "Quadros Elétricos",
    description:
      "Montagem e atualização de quadros com organização, proteção adequada e identificação clara dos circuitos.",
    icon: "LayoutGrid",
  },
  {
    id: "iluminacao",
    title: "Iluminação LED",
    description:
      "Estudo e aplicação de iluminação eficiente para melhorar conforto, consumo e apresentação dos espaços.",
    icon: "Lightbulb",
  },
  {
    id: "certificacao",
    title: "Certificação e Inspeção",
    description:
      "Preparação da documentação necessária e apoio nos processos de inspeção junto das entidades competentes.",
    icon: "ShieldCheck",
  },
  {
    id: "redes",
    title: "Redes e Infraestruturas",
    description:
      "Cablagem técnica, telecomunicações e redes estruturadas para espaços preparados para crescer.",
    icon: "Network",
  },
  {
    id: "carregadores",
    title: "Carregadores para VE",
    description:
      "Instalação de pontos de carregamento para veículos elétricos em contexto particular ou empresarial.",
    icon: "Zap",
  },
  {
    id: "remodelacoes",
    title: "Remodelações Elétricas",
    description:
      "Renovação de circuitos antigos para tornar o espaço mais seguro, funcional e preparado para novas necessidades.",
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
      "Execução completa em moradia, com distribuição organizada, quadro renovado e pontos de luz adaptados ao projeto.",
    location: "Lisboa",
    service: "Instalações Residenciais",
  },
  {
    image: "/images/portfolio/projeto-2.jpg",
    title: "Quadro Elétrico Industrial",
    category: "Industrial",
    description:
      "Quadro preparado para utilização intensiva, com proteções adequadas e identificação cuidada dos circuitos.",
    location: "Setúbal",
    service: "Quadros Elétricos",
  },
  {
    image: "/images/portfolio/projeto-3.jpg",
    title: "Iluminação LED Comercial",
    category: "Comercial",
    description:
      "Reformulação de iluminação para valorizar o espaço, reduzir consumos e melhorar a experiência de utilização.",
    location: "Almada",
    service: "Iluminação LED",
  },
  {
    image: "/images/portfolio/projeto-5.jpg",
    title: "Infraestrutura Técnica Empresarial",
    category: "Comercial",
    description:
      "Rede elétrica e dados preparada para equipas, postos de trabalho e expansão futura.",
    location: "Lisboa",
    service: "Redes e Infraestruturas",
  },
  {
    image: "/images/portfolio/projeto-6.jpg",
    title: "Posto de Carregamento VE",
    category: "Residencial",
    description:
      "Ponto de carregamento dedicado em moradia, integrado com a instalação existente.",
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
    text: "Trabalho organizado, limpo e explicado com clareza do início ao fim.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Responsável de empresa",
    text: "Cumpriram o combinado e deixaram tudo pronto a funcionar sem complicações.",
    rating: 5,
  },
  {
    name: "Carlos Rodrigues",
    role: "Empresário do setor industrial",
    text: "A equipa mostrou capacidade para responder a um projeto exigente sem perder detalhe.",
    rating: 5,
  },
  {
    name: "Ana Ferreira",
    role: "Gerente de espaço comercial",
    text: "A intervenção foi bem coordenada e permitiu-nos reabrir o espaço dentro do prazo.",
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
      "Trabalhamos em habitações, comércio e indústria. Fazemos quadros, iluminação, redes técnicas, carregadores para veículos elétricos e apoio à certificação.",
  },
  {
    question: "Como posso pedir um orçamento?",
    answer:
      "Pode usar o formulário, telefone ou email. Quanto mais detalhe enviar sobre o espaço e o trabalho pretendido, mais rápido conseguimos orientar o pedido.",
  },
  {
    question: "Têm certificação para realizar instalações elétricas?",
    answer:
      "Sim. Os trabalhos são realizados de acordo com as normas técnicas aplicáveis e com a legislação em vigor em Portugal.",
  },
  {
    question: "Emitem certificado elétrico após as obras?",
    answer:
      "Quando aplicável, preparamos a documentação necessária e acompanhamos o processo junto da entidade competente.",
  },
  {
    question: "Trabalham em todo o país?",
    answer:
      "A disponibilidade depende da localização e dimensão do trabalho. Envie-nos o pedido para avaliarmos a melhor forma de avançar.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Contacto e Diagnóstico",
    description:
      "Recebemos o pedido, percebemos o contexto e definimos se é necessária uma visita ao local.",
  },
  {
    step: "02",
    title: "Proposta e Orçamento",
    description:
      "Preparamos uma proposta objetiva, com o âmbito do trabalho e as condições bem definidas.",
  },
  {
    step: "03",
    title: "Execução e Acompanhamento",
    description:
      "Acompanhamos a obra no terreno, mantendo organização, limpeza e comunicação durante a execução.",
  },
  {
    step: "04",
    title: "Certificação e Entrega",
    description:
      "No final, verificamos o trabalho, tratamos da documentação aplicável e deixamos a instalação pronta a usar.",
  },
];
