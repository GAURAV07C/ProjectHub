import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.projectSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: "gaurav@example.com",
      userName: "gaurav07c",
      name: "Gaurav Chauhan",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=gaurav",
      bio: "Full-stack developer | Open source enthusiast | Building cool things with Next.js and TypeScript",
      location: "Delhi, India",
      website: "https://gaurav.dev",
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "priya@example.com",
      userName: "priya_codes",
      name: "Priya Sharma",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      bio: "Frontend wizard | React & Vue specialist | Design systems advocate",
      location: "Mumbai, India",
      website: "https://priya.dev",
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "arjun@example.com",
      userName: "arjun_dev",
      name: "Arjun Singh",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
      bio: "Backend engineer | Node.js & PostgreSQL | API architect",
      location: "Bangalore, India",
      website: "https://arjun.dev",
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: "neha@example.com",
      userName: "neha_designs",
      name: "Neha Gupta",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
      bio: "UI/UX Designer | Figma expert | Creating beautiful experiences",
      location: "Pune, India",
      website: "https://neha.design",
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  // Create Skills
  const skills = await prisma.skill.createMany({
    data: [
      { title: "Next.js", iconName: "nextjs" },
      { title: "TypeScript", iconName: "typescript" },
      { title: "React", iconName: "react" },
      { title: "Node.js", iconName: "nodejs" },
      { title: "PostgreSQL", iconName: "postgresql" },
      { title: "Tailwind CSS", iconName: "tailwind" },
      { title: "GraphQL", iconName: "graphql" },
      { title: "Docker", iconName: "docker" },
      { title: "AWS", iconName: "aws" },
      { title: "Figma", iconName: "figma" },
      { title: "MongoDB", iconName: "mongodb" },
      { title: "Python", iconName: "python" },
    ],
    skipDuplicates: true,
  });

  const allSkills = await prisma.skill.findMany();

  const getSkill = (title: string) => allSkills.find((s) => s.title === title)!;

  // Assign skills to users
  await prisma.userSkill.createMany({
    data: [
      { userId: user1.id, skillId: getSkill("Next.js").id },
      { userId: user1.id, skillId: getSkill("TypeScript").id },
      { userId: user1.id, skillId: getSkill("React").id },
      { userId: user1.id, skillId: getSkill("Tailwind CSS").id },
      { userId: user2.id, skillId: getSkill("React").id },
      { userId: user2.id, skillId: getSkill("Figma").id },
      { userId: user2.id, skillId: getSkill("TypeScript").id },
      { userId: user3.id, skillId: getSkill("Node.js").id },
      { userId: user3.id, skillId: getSkill("PostgreSQL").id },
      { userId: user3.id, skillId: getSkill("Docker").id },
      { userId: user4.id, skillId: getSkill("Figma").id },
      { userId: user4.id, skillId: getSkill("React").id },
      { userId: user4.id, skillId: getSkill("Tailwind CSS").id },
    ],
    skipDuplicates: true,
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description: "A full-stack e-commerce platform with payment integration and admin dashboard",
      excerpt: "Full-stack e-commerce solution with modern features",
      content: `# E-Commerce Platform\n\nA comprehensive e-commerce solution built with modern technologies.\n\n## Features\n\n- User authentication and authorization\n- Product catalog with search and filters\n- Shopping cart and checkout\n- Payment gateway integration\n- Admin dashboard for inventory management\n\n## Tech Stack\n\n- Next.js 14\n- TypeScript\n- PostgreSQL\n- Stripe\n- Tailwind CSS\n\n## Challenges\n\nBuilding a scalable payment system that handles multiple payment methods while maintaining security.\n\n## Outcomes\n\n- 40% increase in conversion rate\n- 99.9% uptime\n- 50k+ active users`,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      company: "TechStart Inc.",
      year: "2024",
      techStack: JSON.stringify(["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"]),
      tags: JSON.stringify(["ecommerce", "fullstack", "payment"]),
      liveLink: "https://example-ecommerce.com",
      sourceLink: "https://github.com/gaurav07c/ecommerce",
      isRecent: true,
      category: "Web Development",
      views: 1250,
      challenges: "Building a scalable payment system that handles multiple payment methods while maintaining security.",
      features: "User authentication, product catalog, shopping cart, checkout, payment integration, admin dashboard",
      outcomes: "40% increase in conversion rate, 99.9% uptime, 50k+ active users",
      authorId: user1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Task Management App",
      slug: "task-management-app",
      description: "A collaborative task management application with real-time updates",
      excerpt: "Real-time collaborative task management",
      content: `# Task Management App\n\nA collaborative task management tool for teams.\n\n## Features\n\n- Real-time collaboration\n- Drag and drop task boards\n- Team workspaces\n- Deadline reminders\n- Progress analytics\n\n## Tech Stack\n\n- React\n- Node.js\n- Socket.io\n- MongoDB\n\n## Outcomes\n\n- Used by 10+ teams\n- 30% improvement in productivity`,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      company: "Freelance",
      year: "2024",
      techStack: JSON.stringify(["React", "Node.js", "Socket.io", "MongoDB"]),
      tags: JSON.stringify(["productivity", "realtime", "collaboration"]),
      liveLink: "https://taskmanager-demo.com",
      sourceLink: "https://github.com/priya_codes/taskmanager",
      isRecent: true,
      category: "Productivity",
      views: 890,
      challenges: "Implementing real-time sync without conflicts",
      features: "Real-time collaboration, drag & drop, team workspaces, reminders, analytics",
      outcomes: "Used by 10+ teams, 30% productivity improvement",
      authorId: user2.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "API Gateway",
      slug: "api-gateway",
      description: "A high-performance API gateway with rate limiting and authentication",
      excerpt: "Scalable API gateway solution",
      content: `# API Gateway\n\nEnterprise-grade API gateway with advanced features.\n\n## Features\n\n- Rate limiting\n- Authentication & authorization\n- Request routing\n- Load balancing\n- Monitoring & logging\n\n## Tech Stack\n\n- Go\n- Redis\n- PostgreSQL\n- Docker\n\n## Outcomes\n\n- Handles 100k+ requests/second\n- 99.99% availability`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      company: "CloudScale",
      year: "2023",
      techStack: JSON.stringify(["Go", "Redis", "PostgreSQL", "Docker"]),
      tags: JSON.stringify(["api", "backend", "infrastructure"]),
      liveLink: "",
      sourceLink: "https://github.com/arjun_dev/apigateway",
      isRecent: false,
      category: "Backend",
      views: 2100,
      challenges: "Scaling to handle 100k+ RPS while maintaining low latency",
      features: "Rate limiting, auth, routing, load balancing, monitoring",
      outcomes: "100k+ RPS, 99.99% availability",
      authorId: user3.id,
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: "Design System",
      slug: "design-system",
      description: "A comprehensive design system with reusable components and documentation",
      excerpt: "Complete design system for modern apps",
      content: `# Design System\n\nA complete design system for building consistent UIs.\n\n## Features\n\n- 50+ reusable components\n- Theme customization\n- Accessibility compliant\n- Documentation site\n- Figma integration\n\n## Tech Stack\n\n- React\n- Storybook\n- Tailwind CSS\n- Figma API\n\n## Outcomes\n\n- Adopted by 5 product teams\n- 60% faster UI development`,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      company: "DesignFirst",
      year: "2024",
      techStack: JSON.stringify(["React", "Storybook", "Tailwind CSS", "Figma"]),
      tags: JSON.stringify(["design", "components", "ui"]),
      liveLink: "https://design-system-demo.com",
      sourceLink: "https://github.com/neha_designs/design-system",
      isRecent: true,
      category: "Design",
      views: 1560,
      challenges: "Creating components that are flexible yet consistent",
      features: "50+ components, theming, accessibility, documentation, Figma sync",
      outcomes: "Adopted by 5 teams, 60% faster UI dev",
      authorId: user4.id,
    },
  });

  // Assign skills to projects
  await prisma.projectSkill.createMany({
    data: [
      { projectId: project1.id, skillId: getSkill("Next.js").id },
      { projectId: project1.id, skillId: getSkill("TypeScript").id },
      { projectId: project1.id, skillId: getSkill("PostgreSQL").id },
      { projectId: project1.id, skillId: getSkill("Tailwind CSS").id },
      { projectId: project2.id, skillId: getSkill("React").id },
      { projectId: project2.id, skillId: getSkill("Node.js").id },
      { projectId: project2.id, skillId: getSkill("MongoDB").id },
      { projectId: project3.id, skillId: getSkill("Node.js").id },
      { projectId: project3.id, skillId: getSkill("PostgreSQL").id },
      { projectId: project3.id, skillId: getSkill("Docker").id },
      { projectId: project4.id, skillId: getSkill("React").id },
      { projectId: project4.id, skillId: getSkill("Tailwind CSS").id },
      { projectId: project4.id, skillId: getSkill("Figma").id },
    ],
    skipDuplicates: true,
  });

  // Create Follows
  await prisma.follows.createMany({
    data: [
      { followerId: user2.id, followingId: user1.id },
      { followerId: user3.id, followingId: user1.id },
      { followerId: user4.id, followingId: user1.id },
      { followerId: user1.id, followingId: user2.id },
      { followerId: user3.id, followingId: user2.id },
      { followerId: user1.id, followingId: user3.id },
      { followerId: user2.id, followingId: user4.id },
    ],
    skipDuplicates: true,
  });

  // Create Likes
  await prisma.like.createMany({
    data: [
      { userId: user2.id, projectId: project1.id },
      { userId: user3.id, projectId: project1.id },
      { userId: user4.id, projectId: project1.id },
      { userId: user1.id, projectId: project2.id },
      { userId: user3.id, projectId: project2.id },
      { userId: user1.id, projectId: project3.id },
      { userId: user2.id, projectId: project3.id },
      { userId: user4.id, projectId: project3.id },
      { userId: user1.id, projectId: project4.id },
      { userId: user3.id, projectId: project4.id },
    ],
    skipDuplicates: true,
  });

  // Create Comments
  const comment1 = await prisma.comment.create({
    data: {
      content: "Amazing work! The payment integration is seamless.",
      name: user2.name,
      email: user2.email,
      authorId: user2.id,
      projectId: project1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Thanks! Spent a lot of time on the UX.",
      name: user1.name,
      email: user1.email,
      authorId: user1.id,
      projectId: project1.id,
      parentId: comment1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: "The real-time features are incredible!",
      name: user3.name,
      email: user3.email,
      authorId: user3.id,
      projectId: project2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Socket.io made it really easy to implement.",
      name: user2.name,
      email: user2.email,
      authorId: user2.id,
      projectId: project2.id,
      parentId: comment2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Clean architecture and great documentation.",
      name: user4.name,
      email: user4.email,
      authorId: user4.id,
      projectId: project3.id,
    },
  });

  // Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        creatorId: user2.id,
        type: "LIKE",
        projectId: project1.id,
        read: false,
      },
      {
        userId: user1.id,
        creatorId: user3.id,
        type: "FOLLOW",
        read: true,
      },
      {
        userId: user2.id,
        creatorId: user1.id,
        type: "COMMENT",
        projectId: project2.id,
        commentId: comment2.id,
        read: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully!");
  console.log({
    users: [user1, user2, user3, user4],
    projects: [project1, project2, project3, project4],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
