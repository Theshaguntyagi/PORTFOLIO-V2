// ⚠️ Replace with real data imports
import blogData from "../data/blogData";
import projectData from "../data/projectData";
import certificateData from "../data/certificateData";

export function getDynamicRoutes() {
  const blogRoutes = blogData.map(post => `/blog/${post.id}`);
  const projectRoutes = projectData.map(p => `/project/${p.id}`);
  const certRoutes = certificateData.map(c => `/certificate/${c.id}`);

  return [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/testimonials",
    "/blog",
    "/contact",
    ...blogRoutes,
    ...projectRoutes,
    ...certRoutes,
  ];
}