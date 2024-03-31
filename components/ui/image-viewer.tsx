"use client";

import dynamic from "next/dynamic";

const Image = dynamic(
  () =>
    import("@samvera/clover-iiif/image").then((CloverImage) => {
      console.log("OpenSeadragon loaded successfully", CloverImage);
      return CloverImage;
    }),
  {
    ssr: false,
  },
);

const openSeadragonConfig = {
  showRotationControl: false,
  autoHideControls: true,
  showFullPageControl: false,
  debugMode: true,
  navigatorPosition: "TOP_LEFT",
};

export const ImageViewer = () => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      src="https://ids.lib.harvard.edu/ids/iiif/18772291/full/full/0/default.jpg"
      openSeadragonConfig={openSeadragonConfig}
    />
  );
};
