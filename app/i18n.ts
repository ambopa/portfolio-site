export type Lang = "ru" | "en";

export const i18n = {
  ru: {
    name: "Алексей Шайхелисламов",
    bio: "Строю дизайн-стратегию под бизнес-цели с учётом зрелости продукта и выстраиваю дизайн-процессы в кросс-функциональной команде. А так-же: провожу исследования, приоритизирую, и перевожу инсайты в измеримый результат.",
    role: "Principal Product Designer / Lead Designer",
    location: "Москва, Россия · Готов к переезду",
    downloadCv: "Скачать CV",
    allProjects: "Все проекты",
    noProjects: "Нет проектов",
    footerCity: "Москва, Россия",
  },
  en: {
    name: "Aleksei Shaikhelislamov",
    bio: "I build design strategy aligned with business goals and product maturity, establish design processes in cross-functional teams. I also conduct research, prioritise, and translate insights into measurable outcomes.",
    role: "Principal Product Designer / Lead Designer",
    location: "Moscow, Russia · Open to relocation",
    downloadCv: "Download CV",
    allProjects: "All projects",
    noProjects: "No projects",
    footerCity: "Moscow, Russia",
  },
} as const;
