export type Project =
  | "Finframe"
  | "MTS Bank"
  | "IntellectoKids"
  | "Kaspersky"
  | "Mos.ru"
  | "S7 Airlines";

export const PROJECTS: Project[] = [
  "Finframe",
  "MTS Bank",
  "IntellectoKids",
  "Kaspersky",
  "Mos.ru",
  "S7 Airlines",
];

export type ArchiveItemType = {
  id: number;
  label: string;
  project: Project;
  aspectW: number;
  aspectH: number;
  imageSrc?: string;
  videoSrc?: string;
  poster?: string;
};

/*
 * Добавьте свои файлы в /public/media/ и укажите пути ниже.
 * Каждый элемент относится к одному из проектов через поле `project`.
 */
export const archiveItems: ArchiveItemType[] = [
  { id: 1,  project: "Finframe",       label: "Finframe — главный экран",   aspectW: 1920, aspectH: 1080 },
  { id: 2,  project: "Finframe",       label: "Finframe — онбординг",       aspectW: 1920, aspectH: 1080 },
  { id: 3,  project: "MTS Bank",       label: "MTS Bank — дашборд",         aspectW: 2132, aspectH: 2132 },
  { id: 4,  project: "MTS Bank",       label: "MTS Bank — карты",           aspectW: 3200, aspectH: 2400 },
  { id: 5,  project: "IntellectoKids", label: "IntellectoKids — главная",   aspectW: 1920, aspectH: 1920 },
  { id: 6,  project: "IntellectoKids", label: "IntellectoKids — урок",      aspectW: 3840, aspectH: 2160 },
  { id: 7,  project: "Kaspersky",      label: "Kaspersky — антивирус",      aspectW: 3200, aspectH: 3200 },
  { id: 8,  project: "Kaspersky",      label: "Kaspersky — B2B портал",     aspectW: 3840, aspectH: 2160 },
  { id: 9,  project: "Mos.ru",         label: "Mos.ru — главная",           aspectW: 1600, aspectH: 1200 },
  { id: 10, project: "Mos.ru",         label: "Mos.ru — услуги",            aspectW: 1920, aspectH: 1080 },
  { id: 11, project: "S7 Airlines",    label: "S7 — поиск рейсов",          aspectW: 3200, aspectH: 3200 },
  { id: 12, project: "S7 Airlines",    label: "S7 — регистрация",           aspectW: 1920, aspectH: 1920 },
];
