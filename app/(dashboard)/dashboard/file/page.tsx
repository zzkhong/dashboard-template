import BreadCrumb from "@/components/breadcrumb";
import { FileBoard } from "@/components/file/file-board";
import NewTaskDialog from "@/components/file/new-task-dialog";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [{ title: "File", link: "/dashboard/file" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`File`} description="Manage tasks by dnd" />
          <NewTaskDialog />
        </div>
        <FileBoard />
      </div>
    </>
  );
}
