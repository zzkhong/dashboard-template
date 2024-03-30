"use client";

import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import dynamic from "next/dynamic";

const Image = dynamic(
  () => import("@samvera/clover-iiif/image").then((Clover) => Clover),
  {
    ssr: false,
  },
);

const breadcrumbItems = [
  { title: "File", link: "/dashboard/file" },
  { title: "View", link: "/dashboard/file" },
];

export default function page() {
  const handleOpenSeadragonCallback = (viewer: any) => {
    // eslint-disable-next-line no-console
    console.log(viewer);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`File title`} description="file description" />
        </div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        label="File Title"
        src="https://ids.lib.harvard.edu/ids/iiif/18772291/full/full/0/default.jpg"
        openSeadragonCallback={handleOpenSeadragonCallback}
      />
    </>
  );
}
