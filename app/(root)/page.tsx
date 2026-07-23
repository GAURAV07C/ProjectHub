import { headers } from "next/headers";
import Link from "next/link";
import ProjectCard from "@/components/projects/projectCard";
import { auth } from "@/lib/auth";
import { Project, User } from "@/types";
import {
  Home,
  Search,
  Bell,
  PenSquare,
  TrendingUp,
  Users,
} from "lucide-react";

const HomePage = async () => {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const session = await auth();
  const user = session?.user as User | undefined;

  let projects: Project[] = [];
  let trendingProjects: Project[] = [];
  let suggestedUsers: User[] = [];

  try {
    const projectsRes = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store",
    });
    const projectsData = await projectsRes.json();
    if (Array.isArray(projectsData)) {
      projects = projectsData;
      trendingProjects = [...projectsData]
        .sort((a, b) => (b._count?.likes || 0) - (a._count?.likes || 0))
        .slice(0, 5);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  try {
    const usersRes = await fetch(`${baseUrl}/api/users/random`, {
      cache: "no-store",
    });
    const usersData = await usersRes.json();
    if (Array.isArray(usersData)) {
      suggestedUsers = usersData;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Left Sidebar - Fixed */}
      <aside className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen w-64 border-r border-white/10 bg-[#0A0A0F] z-40">
        <div className="flex flex-col gap-2 p-4">
          <Link href="/" className="flex items-center gap-2 mb-6 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-white">ProjectHub</span>
          </Link>

          <nav className="flex flex-col gap-1">
            {[
              { href: "/", label: "Home", icon: Home },
              { href: "/feed", label: "Feed", icon: Search },
              { href: "/notifications", label: "Notifications", icon: Bell },
              { href: "/projects", label: "Projects", icon: PenSquare },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>

          <Link href="/create">
            <button className="w-full mt-4 bg-emerald-300 hover:bg-emerald-400 text-gray-950 font-semibold rounded-full py-3 transition-colors">
              Create
            </button>
          </Link>
        </div>

        {user && (
          <div className="p-4 border-t border-white/10">
            <Link
              href={`/${user.userName ?? user.email?.split("@")[0]}`}
              className="flex items-center gap-3 hover:bg-white/5 rounded-full p-2 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-blue-500 flex items-center justify-center text-white font-bold">
                {user.name?.[0] ?? user.userName?.[0] ?? "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <span className="text-xs text-gray-400">@{user.userName ?? user.email?.split("@")[0]}</span>
              </div>
            </Link>
          </div>
        )}
      </aside>

      {/* Center Feed - Scrollable */}
      <div className="md:ml-64 lg:mr-80">
        <div className="max-w-2xl mx-auto border-x border-white/10 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>

          {/* Create Project Button (for logged in users) */}
          {user && (
            <div className="p-4 border-b border-white/10">
              <Link href="/create">
                <button className="w-full bg-emerald-300 hover:bg-emerald-400 text-gray-950 font-semibold rounded-full py-3 transition-colors">
                  Create Project
                </button>
              </Link>
            </div>
          )}

          {/* Projects Feed */}
          <div>
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-2">No projects yet</p>
                <p className="text-sm">Be the first to create a project!</p>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  userId={user?.id || ""}
                  currentUser={user as NonNullable<User>}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      <aside className="hidden lg:flex flex-col fixed top-0 right-0 h-screen w-80 border-l border-white/10 bg-[#0A0A0F] z-40 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-300/50"
            />
          </div>

          {/* Trending Projects */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-300" />
              <h3 className="font-bold text-white text-lg">Trending Projects</h3>
            </div>
            <div className="space-y-3">
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
            <div className="space-y-3">
              {suggestedUsers.slice(0, 5).map((user) => (
                <Link
                  key={user.id}
                  href={`/${user.userName ?? user.email?.split("@")[0]}`}
                  className="flex items-center gap-3 hover:bg-white/5 rounded-xl p-2 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-blue-500 flex items-center justify-center text-white font-bold">
                    {user.name?.[0] ?? user.userName?.[0] ?? "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">@{user.userName ?? user.email?.split("@")[0]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;

