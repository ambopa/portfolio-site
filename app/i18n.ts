export type Lang = "ru" | "en";

export const i18n = {
  ru: {
    name: "Алексей Шайхелисламов",
    bio: "14 лет в продуктовом дизайне. Отвечаю не за экраны, а за продуктовое направление: стратегию, дизайн-системы и бизнес-результат, который они приносят — Kaspersky, МТС, Правительство Москвы, S7 Airlines.\n\nПри этом довожу гипотезу до работающего продукта, а не до макета: последний собрал за 26 дней в одиночку, AI вместо команды разработки.",
    role: "Principal Product Designer × AI Prototyping",
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
    bio: "14 years in product design. I own the product direction, not individual screens — strategy, design systems, and the business result behind them: Kaspersky, MTS, Moscow City Government, S7 Airlines.\n\nAnd I take a hypothesis all the way to a working product, not a mockup: the last one built solo in 26 days, AI instead of an engineering team.",
    role: "Principal Product Designer × AI Prototyping",
    location: "Citizen of the World · Timezone negotiable",
    cvFile: "/cv-en.pdf",
    cvFilename: "Aleksei Shaikhelislamov — CV.pdf",
    downloadCv: "Download CV",
    allProjects: "All projects",
    noProjects: "No projects",
    footerCity: "Planet Earth",
  },
} as const;
