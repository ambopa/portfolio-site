export type Project =
  | "Qandy"
  | "MTS Bank"
  | "Kaspersky"
  | "Mos.ru"
  | "Multitransfer";

export const PROJECTS: Project[] = [
  "Qandy",
  "MTS Bank",
  "Kaspersky",
  "Mos.ru",
  "Multitransfer",
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
  { id: 1,  project: "Qandy",         label: "Qandy — главный экран",      aspectW: 1920, aspectH: 1080 },
  { id: 2,  project: "Qandy",         label: "Qandy — онбординг",          aspectW: 1920, aspectH: 1080 },
  { id: 3,  project: "MTS Bank",      label: "MTS Bank — дашборд",         aspectW: 2132, aspectH: 2132 },
  { id: 4,  project: "MTS Bank",      label: "MTS Bank — карты",           aspectW: 3200, aspectH: 2400 },
  { id: 5,  project: "Kaspersky",     label: "Kaspersky — антивирус",      aspectW: 3200, aspectH: 3200 },
  { id: 6,  project: "Kaspersky",     label: "Kaspersky — B2B портал",     aspectW: 3840, aspectH: 2160 },
  { id: 7,  project: "Mos.ru",        label: "Mos.ru — главная",           aspectW: 1600, aspectH: 1200 },
  { id: 8,  project: "Mos.ru",        label: "Mos.ru — услуги",            aspectW: 1920, aspectH: 1080 },
  { id: 9,  project: "Multitransfer", label: "Multitransfer — главная",    aspectW: 1920, aspectH: 1080 },
  { id: 10, project: "Multitransfer", label: "Multitransfer — переводы",   aspectW: 1920, aspectH: 1080 },
];
