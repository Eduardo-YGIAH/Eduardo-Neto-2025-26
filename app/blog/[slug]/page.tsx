import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts, getPostBySlug } from "../posts";
import { type JSX } from "react";

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input));
}

function RtkQueryArticle() {
  return (
    <>
      <section className="space-y-4">
        <p>
          In the world of modern web development, efficiently managing data fetching and caching is crucial for building
          performant and responsive applications. {""}
          <a
            href="https://redux-toolkit.js.org/rtk-query/overview"
            className="text-[#ff8820] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Redux Toolkit Query (RTK Query)
          </a>{" "}
          has emerged as a powerful tool within the Redux ecosystem to streamline these complex tasks. But is it always
          the right choice? This deep dive explores the ideal use cases for RTK Query, scenarios where it might not be the
          best fit, and a detailed look at its intelligent caching strategies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">The Sweet Spot: When RTK Query Shines</h2>
        <p>
          RTK Query is more than just a data fetching library; it&apos;s a comprehensive solution that seamlessly integrates
          with your {""}
          <a href="https://redux.js.org/" className="text-[#ff8820] hover:underline" target="_blank" rel="noreferrer">
            Redux
          </a>{" "}
          store. Here are the scenarios where it truly excels:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Existing Redux Applications:</span> If your project is already
            leveraging Redux for state management, incorporating RTK Query is a natural progression. It helps simplify your
            data fetching logic and keeps all your server cache and client-side state in a single, centralized location.
          </li>
          <li>
            <span className="font-medium text-white">Simplified Data Fetching and Caching:</span> RTK Query eliminates the
            boilerplate often associated with data fetching. It automatically handles loading states, caching, and
            background refetching, letting you focus on your application&apos;s core logic.
          </li>
          <li>
            <span className="font-medium text-white">Automatic Cache Invalidation:</span> Tag-based cache invalidation makes
            it easy to keep your UI fresh. When a mutation runs, RTK Query invalidates the relevant tags and refetches just
            the queries that need an update.
          </li>
          <li>
            <span className="font-medium text-white">Integration with Redux DevTools:</span> With {""}
            <a
              href="https://github.com/reduxjs/redux-devtools"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Redux DevTools
            </a>
            , it&apos;s easy to inspect when queries fire, how the cache updates, and what your API slice is doing in real time.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Proceed with Caution: When to Reconsider RTK Query</h2>
        <p>
          Despite its strengths, RTK Query isn&apos;t a one-size-fits-all solution. Here are some situations where you might
          want to explore other options:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Non-Redux Projects:</span> Pulling in the entire Redux Toolkit can be
            unnecessary overhead when you&apos;re not already using Redux. In this case, {""}
            <a
              href="https://tanstack.com/query/latest"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              TanStack Query
            </a>{" "}
            (formerly React Query) shines as a standalone solution.
          </li>
          <li>
            <span className="font-medium text-white">Large-Scale and Complex Applications:</span> A single API slice can
            become a maintenance bottleneck. RTK Query supports splitting endpoints with {""}
            <a
              href="https://redux-toolkit.js.org/rtk-query/api/createApi#injectendpoints"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <code>injectEndpoints</code>
            </a>
            , but decentralized options like TanStack Query or GraphQL clients (e.g. {""}
            <a
              href="https://www.apollographql.com/docs/react/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Apollo Client
            </a>
            ) might offer better ergonomics for very large teams.
          </li>
          <li>
            <span className="font-medium text-white">Need for a Standalone, Flexible Solution:</span> If you want to keep
            server cache completely separate from client state, TanStack Query gives you that separation out of the box.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">A Deep Dive into RTK Query&apos;s Caching Strategies</h2>
        <p>The magic of RTK Query lies in its sophisticated and largely automated caching mechanism. Let&apos;s break it down.</p>

        <h3 className="text-xl font-semibold text-white">1. Automatic Caching and Background Refetching</h3>
        <p>
          When you make a request, RTK Query caches the response and serves subsequent requests from the cache. It also
          refetches data when the browser refocuses or connectivity changes, keeping the UI responsive without extra code.
        </p>

        <h3 className="text-xl font-semibold text-white">2. Cache Invalidation with Tags</h3>
        <p>
          Tag-based invalidation is one of RTK Query&apos;s standout features. You associate queries with tags using the
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">providesTags</code> option and mark
          mutations with {""}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">invalidatesTags</code>. When a
          mutation succeeds, RTK Query automatically refetches the affected queries—no manual wiring required.
        </p>
        <p>
          The official documentation refers to this as {""}
          <a
            href="https://redux-toolkit.js.org/rtk-query/usage/automated-re-fetching"
            className="text-[#ff8820] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Automated Re-fetching
          </a>
          , and it&apos;s the backbone of how we keep dashboards live without flooding the network.
        </p>

        <h3 className="text-xl font-semibold text-white">3. Manual Cache Updates for Granular Control</h3>
        <p>
          Automatic invalidation covers most use cases, but advanced scenarios benefit from manual cache manipulation.
          RTK Query exposes lifecycle hooks such as {""}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">onQueryStarted</code> for optimistic
          and pessimistic updates.
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Optimistic Updates:</span> Update the cache immediately for a snappy
            UX, then roll back if the request fails. The RTK docs cover this pattern in {""}
            <a
              href="https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              detail
            </a>
            .
          </li>
          <li>
            <span className="font-medium text-white">Pessimistic Updates:</span> Wait for confirmation before writing to the
            cache for maximum consistency.
          </li>
          <li>
            <span className="font-medium text-white">Direct Cache Manipulation:</span> Use {""}
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">api.util.updateQueryData</code> to
            surgically adjust cached data when your use case requires it. The {""}
            <a
              href="https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#updating-cached-data-directly"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              documentation
            </a>
            {" "}
            includes ergonomic patterns for doing this without losing type safety.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Conclusion: Making the Right Choice</h2>
        <p>
          RTK Query is an exceptional choice when you&apos;re already invested in Redux. Its automatic caching,
          tag-invalidation, and Redux DevTools integration remove much of the ceremony around data fetching in complex
          interfaces.
        </p>
        <p>
          But every tool has trade-offs. For non-Redux apps or teams that prefer decentralized data fetching, TanStack
          Query or GraphQL clients offer compelling alternatives. By understanding RTK Query&apos;s strengths and the landscape
          of complementary tools, you can design a data layer that stays fast, transparent, and maintainable.
        </p>
      </section>
    </>
  );
}

const articleBySlug: Record<string, () => JSX.Element> = {
  "when-and-when-not-to-use-rtk-query": RtkQueryArticle,
  "mock-server-cut-blockers": () => (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-300">
      Detailed write-up is in progress. Subscribe to be notified when it ships.
    </div>
  ),
  "framework-for-reusable-components": () => (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-300">
      Detailed write-up is in progress. Subscribe to be notified when it ships.
    </div>
  ),
  "sommelier-to-software-five-lessons": () => (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-300">
      Detailed write-up is in progress. Subscribe to be notified when it ships.
    </div>
  ),
};

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found — Eduardo Neto",
    };
  }

  return {
    title: `${post.title} — Eduardo Neto`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderArticle = articleBySlug[post.slug];
  const articleContent = renderArticle ? renderArticle() : null;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="m12 6-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all posts
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/55 backdrop-blur-sm shadow-xl shadow-black/40">
          <div className="flex flex-col gap-10 p-8 lg:p-12">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600" aria-hidden />
                <span>{post.readingTime}</span>
              </div>
              <h1 className="text-3xl font-bold text-white lg:text-4xl">{post.title}</h1>
              <p className="max-w-3xl text-base text-zinc-300">{post.excerpt}</p>
            </header>

            {post.image ? (
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg shadow-black/40">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 70vw, 100vw"
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            ) : null}

            {articleContent ? (
              <article className="space-y-8 text-base leading-relaxed text-zinc-200 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
                {articleContent}
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

