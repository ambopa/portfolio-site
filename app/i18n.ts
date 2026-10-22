export type Lang = "ru" | "en";

export const i18n = {
  ru: {
    name: "Алексей Шайхелисламов",
    bio: "14 лет в продуктовом дизайне.\nОтвечаю за результат целиком — от исследования и дизайн-стратегии до дизайн-систем и бизнес-метрик. Kaspersky, МТС, Правительство Москвы, S7 Airlines.\n\nС AI в короткие сроки запускаю и тестирую гипотезы, автоматизирую и оптимизирую процессы, а также повышаю качество и стабильность дизайн-решений.",
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
    bio: "14 years in product design.\nI own the whole outcome — from research and design strategy to design systems and business metrics. Kaspersky, MTS, Moscow City Government, S7 Airlines.\n\nWith AI, I rapidly launch and test hypotheses, automate and optimize processes, and raise the quality and consistency of design decisions.",
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
