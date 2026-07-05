import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Проект",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название проекта",
      type: "string",
      description: "Например: Finframe, MTS Bank, Kaspersky",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание проекта",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coverImage",
      title: "Обложка",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Галерея",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          title: "Элемент галереи",
          fields: [
            defineField({
              name: "image",
              title: "Изображение",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Подпись",
              type: "string",
            }),
            defineField({
              name: "videoUrl",
              title: "Ссылка на видео (MP4)",
              type: "url",
              description: "Опционально — если вместо изображения нужно видео",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Без подписи", media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Порядок в списке",
      type: "number",
      description: "Меньшее число — выше в списке",
    }),
  ],
  orderings: [{ title: "Порядок", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
