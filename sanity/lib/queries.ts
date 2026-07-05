import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    "coverImage": {
      "url": coverImage.asset->url,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height,
    },
    "gallery": gallery[] {
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      caption,
      videoUrl,
    },
  }
`;

export type SanityGalleryItem = {
  url: string;
  width: number;
  height: number;
  caption?: string;
  videoUrl?: string;
};

export type SanityProject = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: SanityGalleryItem;
  gallery?: SanityGalleryItem[];
};
