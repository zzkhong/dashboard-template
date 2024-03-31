"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { cn } from "@/lib/utils";

const Image = dynamic(
  () => import("@samvera/clover-iiif/image").then((CloverImage) => CloverImage),
  {
    ssr: false,
  },
);

const openSeadragonConfig = {
  showRotationControl: false,
  //   autoHideControls: true,
  showFullPageControl: false,
  //   debugMode: true,
  navigatorPosition: "TOP_LEFT",
};

interface ImageViewerProps {
  className?: string | undefined;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ className }) => {
  const handleOpenSeadragonCallback = (viewer: any) => {
    // eslint-disable-next-line no-console
    console.log(viewer?.id);
    // openseadragon-my-defined-instance-id
  };

  return (
    <div
      className={cn("bg-secondary h-[calc(72vh)] w-full max-w-7xl", className)}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src="https://ids.lib.harvard.edu/ids/iiif/18772291/full/full/0/default.jpg"
        openSeadragonCallback={handleOpenSeadragonCallback}
        openSeadragonConfig={openSeadragonConfig}
      />
    </div>
  );
};
