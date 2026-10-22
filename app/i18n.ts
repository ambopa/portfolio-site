export type Lang = "ru" | "en";

export const i18n = {
  ru: {
    name: "Алексей Шайхелисламов",
    bio: "14 лет в продуктовом дизайне.\nОтвечаю за результат целиком — от исследования и дизайн-стратегии до дизайн-систем и бизнес-метрик — на всём пользовательском пути и с учётом зрелости продукта и процессов.\nKaspersky, МТС, Правительство Москвы, S7 Airlines.\n\nС AI быстро запускаю и тестирую гипотезы, автоматизирую и оптимизирую процессы выпуска дизайн-решений.",
    role: "Principal Product Designer × AI",
    location: "Человек мира · Часовой пояс по договорённости",
    cvFile: "/cv-ru.pdf",
    cvFilename: "Алексей Шайхелисламов — CV.pdf",
    downloadCv: "Скачать CV",
    allProjects: "Все проекты",
    noProjects: "Нет проектов",
    footerCity: "Планета Земля",
  },
  en: {
    name: "Aleksei Shaikhelislamov",
    bio: "14 years in product design.\nI own the whole outcome — from research and design strategy to design systems and business metrics — across the entire user journey, adapted to the maturity of the product and its processes.\nKaspersky, MTS, Moscow City Government, S7 Airlines.\n\nWith AI, I rapidly launch and test hypotheses, and automate and optimize how design decisions get shipped.",
    role: "Principal Product Designer × AI",
    location: "Citizen of the World · Timezone negotiable",
    cvFile: "/cv-en.pdf",
    cvFilename: "Aleksei Shaikhelislamov — CV.pdf",
    downloadCv: "Download CV",
    allProjects: "All projects",
    noProjects: "No projects",
    footerCity: "Planet Earth",
  },
} as const;
