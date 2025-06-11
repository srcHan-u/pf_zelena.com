export type PortfolioCardT = {
  image: { url: string }[];
  preferredSizeCmMin: number;
  preferredSizeInchMin: number;
  priceDollarMin: number;
  priceDollarMax: number;
  preferredSizeInchMax: number;
  preferredSizeCmMax: number;
  size: "Medium" | "Large" | "Small";
  lastModified: string;
};
