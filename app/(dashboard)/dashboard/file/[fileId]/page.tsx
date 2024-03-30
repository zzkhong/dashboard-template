import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [
  { title: "File", link: "/dashboard/file" },
  { title: "View", link: "/dashboard/file" },
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`File title`} description="file description" />
        </div>
      </div>
    </>
  );
}
