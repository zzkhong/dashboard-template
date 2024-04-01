import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { ImageViewer } from "@/components/ui/image-viewer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { comments } from "@/constants/data";
import { formatDistanceToNow } from "date-fns";

const breadcrumbItems = [
  { title: "Topic", link: "/dashboard/topic" },
  { title: "View", link: "/dashboard/topic" },
];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Topic`} description="topic description" />
        </div>
      </div>

      <div className="flex-1 space-y-4 mx-4 pb-24">
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          <div className="col-span-1">
            <ImageViewer />
          </div>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>10 comments from users</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(60vh)]">
                {comments.map((item) => (
                  <div key={item.id} className="flex items-start mb-6">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/03.png" alt="Avatar" />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <div className="flex flex-row items-center">
                        <p className="text-sm font-medium leading-none">
                          {item.author}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium pl-2">
                          {formatDistanceToNow(new Date(item.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className="text-sm pt-2">{item.content}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
