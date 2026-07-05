export type ArchiveItemType = {
  id: number;
  label: string;
  aspectW: number;
  aspectH: number;
  imageSrc?: string;
  videoSrc?: string;
  poster?: string;
};

/*
 * ЗАМЕНИТЕ: добавьте свои файлы в /public/media/ и обновите этот список.
 * Для видео: укажите poster (первый кадр .webp) и videoSrc (файл .mp4 или .webm).
 * Для изображений: укажите только imageSrc.
 * Оставьте поля пустыми — будет показан серый placeholder.
 */
export const archiveItems: ArchiveItemType[] = [
  {
    id: 1,
    label: "Project 1",
    aspectW: 1920,
    aspectH: 1080,
    // poster: "/media/project-1-poster.webp",
    // videoSrc: "/media/project-1.mp4",
  },
  {
    id: 2,
    label: "Project 2",
    aspectW: 1920,
    aspectH: 1080,
    // poster: "/media/project-2-poster.webp",
    // videoSrc: "/media/project-2.mp4",
  },
  {
    id: 3,
    label: "Project 3",
    aspectW: 2132,
    aspectH: 2132,
    // imageSrc: "/media/project-3.webp",
  },
  {
    id: 4,
    label: "Project 4",
    aspectW: 3200,
    aspectH: 2400,
    // imageSrc: "/media/project-4.webp",
  },
  {
    id: 5,
    label: "Project 5",
    aspectW: 1920,
    aspectH: 1920,
    // imageSrc: "/media/project-5.webp",
  },
  {
    id: 6,
    label: "Project 6",
    aspectW: 3840,
    aspectH: 2160,
    // imageSrc: "/media/project-6.webp",
  },
  {
    id: 7,
    label: "Project 7",
    aspectW: 3200,
    aspectH: 3200,
    // imageSrc: "/media/project-7.webp",
  },
  {
    id: 8,
    label: "Project 8",
    aspectW: 3840,
    aspectH: 2160,
    // poster: "/media/project-8-poster.webp",
    // videoSrc: "/media/project-8.mp4",
  },
  {
    id: 9,
    label: "Project 9",
    aspectW: 1600,
    aspectH: 1200,
    // imageSrc: "/media/project-9.webp",
  },
  {
    id: 10,
    label: "Project 10",
    aspectW: 1920,
    aspectH: 1080,
    // imageSrc: "/media/project-10.webp",
  },
  {
    id: 11,
    label: "Project 11",
    aspectW: 3200,
    aspectH: 3200,
    // imageSrc: "/media/project-11.webp",
  },
  {
    id: 12,
    label: "Project 12",
    aspectW: 1920,
    aspectH: 1920,
    // poster: "/media/project-12-poster.webp",
    // videoSrc: "/media/project-12.mp4",
  },
];
