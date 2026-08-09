export type Lang = "ru" | "en";

export const i18n = {
  ru: {
    name: "Алексей Шайхелисламов",
    bio: "Строю дизайн-стратегию под бизнес-цели с учётом зрелости продукта и выстраиваю дизайн-процессы в кросс-функциональной команде. А так-же: провожу исследования, приоритизирую, и перевожу инсайты в измеримый результат.",
    role: "Principal Product Designer / Lead Designer",
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
    bio: "I build design strategy aligned with business goals and product maturity, establish design processes in cross-functional teams. I also conduct research, prioritise, and translate insights into measurable outcomes.",
    role: "Principal Product Designer / Lead Designer",
    location: "Citizen of the World · Timezone negotiable",
    cvFile: "/cv-en.pdf",
    cvFilename: "Aleksei Shaikhelislamov — CV.pdf",
    downloadCv: "Download CV",
    allProjects: "All projects",
    noProjects: "No projects",
    footerCity: "Planet Earth",
  },
} as const;
