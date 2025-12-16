import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  width?: number;
  height?: number;
  imageHint: string;
};

// Explicit: export exactly what's in the JSON. The `imageUrl` fields must
// be precise local paths like "/assets/hero.jpg" that you will manage.
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
