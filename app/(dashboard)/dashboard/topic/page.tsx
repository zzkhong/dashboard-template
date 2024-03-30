"use client";

import { Separator } from "@/components/ui/separator";
import NewTopicDialog from "@/components/topic/new-topic-dialog";
import { TopicList } from "@/components/topic/topic-list";

export default function Page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
        <NewTopicDialog />
      </div>

      <Separator />
      <TopicList />
    </div>
  );
}
