import HomeShareCard from "../opengraph-image";

export const alt = "Emrah Atalay · Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The portfolio shares the site's own card; a child route's openGraph metadata would otherwise drop it. */
export default HomeShareCard;
