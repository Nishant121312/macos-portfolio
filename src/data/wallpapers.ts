export interface Wallpaper {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}

export const wallpapers: Wallpaper[] = [
  {
    id: "sonoma-1",
    name: "Sonoma Hills",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
  },
  {
    id: "sonoma-2",
    name: "Alpine Lake",
    url: "https://images.unsplash.com/photo-1464822759021-fed622ff2c3b?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759021-fed622ff2c3b?w=200&q=80",
  },
  {
    id: "sonoma-3",
    name: "Desert Sunset",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&q=80",
  },
  {
    id: "sonoma-4",
    name: "Northern Lights",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&q=80",
  },
  {
    id: "sonoma-5",
    name: "Ocean Waves",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&q=80",
  },
  {
    id: "gradient-1",
    name: "Aurora Gradient",
    url: "gradient-aurora",
    thumbnail: "",
  },
  {
    id: "gradient-2",
    name: "Sunset Gradient",
    url: "gradient-sunset",
    thumbnail: "",
  },
];

export const defaultWallpaper = wallpapers[0].url;
