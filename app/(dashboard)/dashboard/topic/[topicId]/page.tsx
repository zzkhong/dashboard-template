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
  { title: "Topic", link: "/dashboard/topic" },
  { title: "View", link: "/dashboard/topic" },
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Topic`} description="topic description" />
        </div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        label="File Title"
        src="https://ids.lib.harvard.edu/ids/iiif/18772291/full/full/0/default.jpg"
      />
    </>
  );
}
