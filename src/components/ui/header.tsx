"use client";

import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNostrContext } from "@/lib/nostr/NostrContext";
import useSession from "@/lib/nostr/useSession";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MainNav } from "../main-nav";

import { Button } from "./button";

const HeaderConfig = {
  mainNav: [
    {
      title: "Pull Requests",
      href: "/pulls",
    },
    {
      title: "Issues",
      href: "/issues",
    },
    {
      title: "Explore",
      href: "/explore",
    },
  ],
};

const DropdownItems = [
  {
    title: "Your Profile",
    href: "/profile",
  },
  {
    title: "Your Repositories",
    href: "/repositories",
  },
  {
    title: "Your organizations",
    href: "/organizations",
  },
  {
    title: "Your projects",
    href: "/projects",
  },
  {
    title: "Your stars",
    href: "/stars",
  },
  {
    title: "Your zaps",
    href: "/zaps",
  },
  {
    title: "Your relays",
    href: "/relays",
  },
  {
    title: "Your sponsors",
    href: "/sponsors",
  },
  {
    title: "Upgrade",
    href: "/upgrade",
  },
  {
    title: "Feature Preview",
    href: "/feature-preview",
  },
  {
    title: "Help",
    href: "/help",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

const PrimaryGitInfo = DropdownItems.slice(0, 8);
const restGitInfo = DropdownItems.slice(8);

export function Header() {
  const { picture, name, initials, isLoggedIn } = useSession();
  const { signOut } = useNostrContext();
  const router = useRouter();
  const handleSignOut = useCallback(() => {
    if (signOut) {
      signOut();
      router.push("/");
    }
  }, [router, signOut]);

  return (
    <header className="flex h-14 w-full items-center justify-between bg-[#171B21] px-8">
      <MainNav items={HeaderConfig.mainNav} />
      <div className="hidden items-center md:inline">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={picture} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {PrimaryGitInfo?.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />

                {restGitInfo?.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant={"outline"}
                  type="submit"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-1">
            <Button variant={"success"} type="submit" className="mr-2">
              <Link className="text-white" href="/login">
                Sign in
              </Link>
            </Button>
            <Button variant={"outline"} type="submit">
              <Link className="text-white" href="/signup">
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
