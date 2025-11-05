export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  image?: {
    src: string;
    alt: string;
  };
  tags?: string[];
  comingSoon?: boolean;
};

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "when-and-when-not-to-use-rtk-query",
    title: "When (and When Not) to use RTK Query: A Deep Dive into Caching Strategies",
    excerpt:
      "How RTK Query streamlines data fetching, caching, and invalidation—plus when to choose alternatives.",
    publishedAt: "2025-01-15",
    readingTime: "12 min read",
    image: {
      src: "https://res.cloudinary.com/ygiah/image/upload/v1762363889/RTK_Query-min_h0b10o.png",
      alt: "Stylized RTK Query diagram illustrating caching flows",
    },
    tags: ["Redux", "RTK Query", "Caching"],
  },
  {
    slug: "mock-server-cut-blockers",
    title: "How We Cut Developer Blockers by 50% with a Mock Server",
    excerpt: "Mirage JS as a safety net for teams shipping fast without backend bottlenecks.",
    publishedAt: "2025-02-03",
    readingTime: "8 min read",
    image: {
      src: "https://res.cloudinary.com/ygiah/image/upload/v1762363889/Mock_server-min_ltfgrs.png",
      alt: "Mock server illustration with interconnected services",
    },
    tags: ["DX", "Mirage JS", "Tooling"],
    comingSoon: true,
  },
  {
    slug: "framework-for-reusable-components",
    title: "My Framework for Building Reusable Components that Cut Dev Time by 25%",
    excerpt: "Patterns for building design systems that stay fast, accessible, and maintainable.",
    publishedAt: "2025-02-20",
    readingTime: "9 min read",
    image: {
      src: "https://res.cloudinary.com/ygiah/image/upload/v1762363890/Framework-min_mc6sos.png",
      alt: "Framework diagram for reusable component strategy",
    },
    tags: ["Design Systems", "Components", "Architecture"],
    comingSoon: true,
  },
  {
    slug: "sommelier-to-software-five-lessons",
    title: "From Sommelier to Software Engineer: 5 Lessons in User Experience",
    excerpt: "Translating hospitality instincts into product intuition and leadership on engineering teams.",
    publishedAt: "2025-03-10",
    readingTime: "7 min read",
    tags: ["Career", "UX", "Leadership"],
    comingSoon: true,
  },
];

export function getPostBySlug(slug: string | string[] | null | undefined) {
  if (!slug) {
    return undefined;
  }

  const normalizedSlug = (Array.isArray(slug) ? slug[0] : slug).trim().toLowerCase();
  return blogPosts.find((post) => post.slug.toLowerCase() === normalizedSlug);
}

