import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "./posts";

export const metadata = { title: "Blog — Eduardo Neto" };

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input));
}

export default function Blog() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Blog</h1>
      <p className="mt-2 max-w-2xl text-zinc-300">
        Deep dives into front-end performance, team enablement, and the craft of building thoughtful products.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          const href = `/blog/${post.slug}`;

          return (
            <Link
              key={post.slug}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-[#ff8820] hover:bg-black/55"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    priority={post.slug === blogPosts[0].slug}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2d2d2d] via-[#1f1f1f] to-[#161616] text-sm font-medium text-zinc-500">
                    Artwork coming soon
                  </div>
                )}

                {post.comingSoon ? (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ff8820]">
                    Coming soon
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-600" aria-hidden />
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="mt-3 text-lg font-semibold text-white transition duration-300 group-hover:text-[#ff8820]">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">{post.excerpt}</p>

                {post.tags ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/5 bg-black/40 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ff8820]">
                  {post.comingSoon ? "Preview" : "Read article"}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M5 10h10m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


