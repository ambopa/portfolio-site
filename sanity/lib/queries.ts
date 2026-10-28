import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    titleEn,
    description,
    descriptionEn,
    "coverImage": {
      "url": coverImage.asset->url,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height,
    },
    "gallery": gallery[] {
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "lqip": image.asset->metadata.lqip,
      caption,
      videoUrl,
      videoAv1Url,
      videoHdUrl,
      videoHdAv1Url,
    },
  }
`;

export type SanityGalleryItem = {
  url: string;
  width: number;
  height: number;
  caption?: string;
  lqip?: string;
  videoUrl?: string;
  videoAv1Url?: string;
  videoHdUrl?: string;
  videoHdAv1Url?: string;
};

export type SanityProject = {
  _id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  coverImage?: SanityGalleryItem;
  gallery?: SanityGalleryItem[];
};
