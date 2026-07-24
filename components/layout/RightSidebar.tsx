"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Project, User } from "@/types";
import FollowButton from "@/components/FollowButton";

interface RightSidebarProps {
  trendingProjects: Project[];
  suggestedUsers: User[];
}

const RightSidebar = ({ trendingProjects, suggestedUsers: initialSuggestedUsers }: RightSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>(initialSuggestedUsers);

  const handleFollowSuccess = (targetId: string, isFollowing: boolean) => {
    if (isFollowing) {
      setSuggestedUsers((prev) => prev.filter((u) => u.id !== targetId));
    }
  };

  return (
    <aside className="w-full">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-300/50"
          />
        </div>

        {/* Trending Projects */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-white text-lg">Trending Projects</h3>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto scrollbar-hide">
            {trendingProjects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.slug || project.id}`}
                className="block hover:bg-white/5 rounded-xl p-2 transition-colors"
              >
                <p className="text-sm font-medium text-white line-clamp-1">{project.title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {project._count.likes} likes • {project._count.comments} comments
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested Users */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-lg">Who to Follow</h3>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto scrollbar-hide">
            {suggestedUsers.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 hover:bg-white/5 rounded-xl p-2 transition-colors"
              >
                <Link href={`/${user.userName ?? user.email?.split("@")[0]}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {user.name?.[0] ?? user.userName?.[0] ?? "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">@{user.userName ?? user.email?.split("@")[0]}</p>
                  </div>
                </Link>
                <FollowButton targetId={user.id} onFollowSuccess={handleFollowSuccess} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
