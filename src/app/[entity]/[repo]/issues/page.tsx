"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { clsx } from "clsx";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  GitPullRequest,
  MessageSquare,
  Search,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IIssueData {
  id: string;
  entity: string;
  repo: string;
  title: string;
  number: string;
  date: string;
  author: string;
  tags: string[];
  taskTotal: number | null;
  taskCompleted: number | null;
  linkedPR: number;
  assignees: string[];
  comments: number;
}

export default function RepoIssuesPage() {
  const [issueStatus, setIssueStatus] = useState<"open" | "closed">("open");

  const [search, setSearch] = useState<string>(`is:open is:issue`);

  const [issues, setIssues] = useState<IIssueData[]>(openData);

  const pathname = usePathname() || "";

  useEffect(() => {
    if (issueStatus === "open") {
      setIssues(openData);
    } else {
      setIssues([]);
    }
  }, [issueStatus]);

  const handleIssueStatusOpen = useCallback(() => setIssueStatus("open"), []);
  const handleIssueStatusClosed = useCallback(
    () => setIssueStatus("closed"),
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(e.currentTarget.value),
    []
  );

  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 px-4 sm:px-0">
        <div className="flex w-full order-last mb-4 md:mb-0 md:order-none">
          <button className="flex items-center h-8 border border-gray hover:border-slate-400 bg-dark px-4 rounded-l-md text-slate-200 font-semibold">
            Filters <ChevronDown className="h-4 w-4 ml-1 mt-1" />
          </button>
          <label className="relative w-full text-slate-400">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center px-2">
              <Search className="h-4 w-4" />
            </span>
            <input
              className="block bg-[#0E1116] w-full h-8 rounded-r-md py-1 pl-9 pr-3 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 text-sm md:text-base"
              type="text"
              value={search}
              onChange={handleSearch}
            />
          </label>
        </div>

        <div className="flex gap-4 justify-between">
          <div className="flex">
            <button
              type="button"
              className="flex h-8 items-center border !border-gray hover:bg-dark rounded-l-md px-4 text-slate-200 font-semibold"
            >
              <Tag className="h-4 w-4 mr-2" /> Labels
            </button>
            <button
              type="button"
              className="flex h-8 items-center border !border-gray hover:bg-dark rounded-r-md px-4 text-slate-200 font-semibold"
            >
              <Tag className="h-4 w-4 mr-2" /> Milestones
            </button>
          </div>

          <Button
            variant={"success"}
            type="button"
            className="whitespace-nowrap h-8"
          >
            <Link className="text-white w-full" href={`${pathname}/new`}>
              New issue
            </Link>
          </Button>
        </div>
      </div>

      <main>
        <div className="mt-4">
          <div className="flex flex-col w-full rounded-md rounded-bl-none rounded-br-none border bg-dark py-2 px-4 !border-gray dark:text-slate-100">
            <div className="order-last md:flex w-full flex-col text-md py-2 items-start justify-between lg:flex-row lg:items-center">
              <div className="flex items-center lg:flex-row space-x-4 font-medium">
                <button
                  className={clsx("flex text-slate-400 hover:text-slate-200", {
                    "text-slate-50": issueStatus === `open`,
                  })}
                  onClick={handleIssueStatusOpen}
                >
                  <CircleDot className="h-5 w-5 mr-2 mt-0.5" /> 3 Open
                </button>
                <button
                  className={clsx("flex text-slate-400 hover:text-slate-200", {
                    "text-slate-50": issueStatus === `closed`,
                  })}
                  onClick={handleIssueStatusClosed}
                >
                  <Check className="h-5 w-5 mr-2 mt-0.5" /> 4 Closed
                </button>
              </div>
              <div className="mt-2 flex text-gray-400 lg:mt-0 space-x-6">
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Author <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Label <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="hidden md:flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Projects <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="hidden md:flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Milestones <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Assignee <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Sort <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-gray">
            <ul className="divide-y dark:divide-gray">
              {issues.map((item) => (
                <li
                  key={`${item.id} ${item.entity}`}
                  className="text-gray-400 grid grid-cols-8 p-2 text-sm hover:bg-dark"
                >
                  <div className="col-span-8 sm:col-span-6">
                    <div className="sm:flex items-center text-lg font-medium">
                      <span className="flex">
                        {issueStatus === "open" ? (
                          <CircleDot className="h-5 w-5 mr-2 mt-1 text-green-600" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-1 text-purple-600" />
                        )}
                        <a
                          className="text-slate-400 hover:text-purple-500"
                          href="#"
                        >
                          {item.entity}/{item.repo}
                        </a>
                      </span>

                      <a
                        className="text-slate-200 hover:text-purple-500 pl-7 sm:pl-3"
                        href="#"
                      >
                        {item.title}
                      </a>
                    </div>
                    <div className="ml-7 text-slate-400">
                      #{item.number} opened {item.date} by{" "}
                      <a className="hover:text-purple-500" href="#">
                        {item.author}
                      </a>
                    </div>
                  </div>

                  <div className="hidden sm:flex col-span-2 text-slate-400 justify-between pt-2 text-right pr-3 no-wrap">
                    <span className="ml-2 flex hover:text-purple-500 cursor-pointer font-medium">
                      {item.linkedPR ? (
                        <>
                          <GitPullRequest className="h-5 w-5 mr-2" />
                          {item.linkedPR}
                        </>
                      ) : null}
                    </span>
                    <span className="ml-2 "></span>
                    <span className="ml-2 flex hover:text-purple-500 cursor-pointer font-medium">
                      {item.comments ? (
                        <>
                          <MessageSquare className="h-5 w-5 mr-2" />
                          {item.comments}
                        </>
                      ) : null}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
}

const openData = [
  {
    id: "101",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "Make GHA required",
    number: "59",
    date: "2 hours ago",
    author: "pierresisson",
    tags: [],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 0,
  },
];
