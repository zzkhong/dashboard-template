"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Topic, topics } from "./data";
import { Badge } from "@/components/ui/badge";
import { ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

interface TopicListProps {
  items: Topic[];
}

export default function MailPage({ items = topics }: TopicListProps) {
  const [topic, setTopic] = useState<Topic>();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>

        <Link
          href={"/dashboard/dashboard/new"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" />
          Post Topic
        </Link>
      </div>

      <Separator />

      <ScrollArea className="h-[calc(80vh)]">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {items?.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                topic?.id === item.id && "bg-muted",
              )}
              onClick={() => setTopic(item)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.name}</div>
                    {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      topic?.id === item.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 300)}
              </div>
              {item.labels.length ? (
                <div className="flex items-center gap-2">
                  {item.labels.map((label: string) => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
