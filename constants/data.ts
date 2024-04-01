import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Comment = {
  id: number;
  author: string;
  content: string;
  created_at: Date;
};

export const comments: Comment[] = [
  {
    id: 1,
    author: "Alice",
    content:
      "Great work! I really appreciate the effort everyone has put into this project.",
    created_at: new Date("2024-03-30T08:00:00"),
  },
  {
    id: 2,
    author: "Bob",
    content:
      "I agree with Alice! The progress we've made so far is impressive, and I'm excited to see it continue.",
    created_at: new Date("2024-03-29T14:30:00"),
  },
  {
    id: 3,
    author: "Charlie",
    content:
      "Keep it up! The dedication shown by the team is inspiring, and I'm confident we'll achieve great things together.",
    created_at: new Date("2024-03-28T10:15:00"),
  },
  {
    id: 4,
    author: "David",
    content:
      "Interesting discussion. I appreciate the different perspectives shared during the meeting, and I think it's beneficial for our project.",
    created_at: new Date("2024-03-27T16:45:00"),
  },
  {
    id: 5,
    author: "Emma",
    content:
      "I have a question. Regarding the latest update, could you clarify the approach we're taking for the next phase of the project?",
    created_at: new Date("2024-03-26T11:20:00"),
  },
  {
    id: 6,
    author: "Frank",
    content:
      "Thanks for sharing! The insights provided in the presentation were enlightening, and I look forward to exploring them further.",
    created_at: new Date("2024-03-25T09:30:00"),
  },
  {
    id: 7,
    author: "Grace",
    content:
      "This is helpful. The documentation provided has been instrumental in understanding the project requirements, and I appreciate the clarity.",
    created_at: new Date("2024-03-24T15:00:00"),
  },
  {
    id: 8,
    author: "Hannah",
    content:
      "I have some ideas. After reviewing the data, I believe there are opportunities for optimization that could enhance our project outcomes.",
    created_at: new Date("2024-03-23T12:45:00"),
  },
  {
    id: 9,
    author: "Ian",
    content:
      "Interesting point of view. I hadn't considered that perspective before, and it adds depth to our discussions.",
    created_at: new Date("2024-03-22T08:45:00"),
  },
  {
    id: 10,
    author: "Jessica",
    content:
      "Looking forward to the next meeting! It's always productive to collaborate with the team and move closer to our goals.",
    created_at: new Date("2024-03-21T16:00:00"),
  },
];

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "topic",
    label: "Home",
  },
  {
    title: "File",
    href: "/dashboard/file",
    icon: "folder",
    label: "file",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "users",
    label: "user",
  },
  {
    title: "Activity",
    href: "/dashboard/activity",
    icon: "activity",
    label: "activity",
  },
];
