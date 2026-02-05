import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts, getPostBySlug } from "../posts";
import CodePane from "@/app/components/demos/CodePane";
import { type JSX } from "react";
import { buildCloudinaryUrl, CLOUDINARY_BLUR_DATA_URL } from "@/lib/cloudinary";

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


function ReconciliationPerformanceArticle() {
  const stateColocationCode = [
    "// Optimized pattern: State colocated with its consumers",
    "function Dashboard() {",
    "  return (",
    "    <Layout>",
    "      <Sidebar>",
    "        <FilterSection /> {/* State lives inside here */}",
    "      </Sidebar>",
    "      <MainContent>",
    "        <DataSection />",
    "      </MainContent>",
    "    </Layout>",
    "  );",
    "}",
    "",
    "function FilterSection() {",
    "  const [filter, setFilter] = useState('all');",
    "  ",
    "  return <FilterControls filter={filter} onChange={setFilter} />;",
    "}",
  ].join("\n");

  const compositionCode = [
    "// Optimized: ExpensiveComponent passed as children",
    "// When Dashboard updates its own state (count), ExpensiveComponent ",
    "// is NOT re-rendered because the \"children\" prop reference remains stable.",
    "function Dashboard({ children }) {",
    "  const [count, setCount] = useState(0);",
    "  ",
    "  return (",
    "    <div>",
    "      <button onClick={() => setCount(c => c + 1)}>",
    "        Count: {count}",
    "      </button>",
    "      {children}",
    "    </div>",
    "  );",
    "}",
    "",
    "// Usage",
    "<Dashboard>",
    "  <ExpensiveComponent />",
    "</Dashboard>",
  ].join("\n");

  return (
    <>
      <section className="space-y-4">
        <p>
          React&apos;s declarative programming model has revolutionized how we build user interfaces, but beneath its
          elegant surface lies a complex reconciliation algorithm that can make or break your application&apos;s
          performance. While most developers understand that unnecessary re-renders are &quot;bad,&quot; few truly grasp
          the cascading performance implications of React&apos;s rendering process—or how to architect applications that
          work with, rather than against, React&apos;s model.
        </p>
        <p>
          In this deep dive, we&apos;ll explore the true performance characteristics of React, examine real-world
          scenarios where conventional wisdom fails, and discuss architectural patterns that can dramatically improve your
          application&apos;s performance profile.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Understanding React&apos;s Rendering Process: Render and Commit
        </h2>
        <p>
          React&apos;s updates are often misunderstood as a three-step process, but officially, the framework models
          updates in two primary phases. Understanding this distinction is vital for performance tuning.
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">The Render Phase:</span> React calls your components to determine
            what should appear on the screen. During this phase, React compares the new result with the previous one
            (this comparison is often called &quot;reconciliation&quot;) to calculate the necessary changes.
          </li>
          <li>
            <span className="font-medium text-white">The Commit Phase:</span> React applies those calculated changes to
            the actual DOM.
          </li>
        </ul>
        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">React Documentation Insights</p>
          <p className="italic">
            &quot;Trigger a render -&gt; React renders your components -&gt; React commits changes to the DOM&quot;
          </p>
          <p className="mt-1 text-sm text-zinc-400">— React Documentation: Render and Commit</p>
        </div>
        <p>
          While the commit phase is expensive (DOM mutations are slow), the render phase can also become a bottleneck in
          large applications. Even if no changes are committed to the DOM, the computational cost of generating
          component trees and diffing them can block the main thread, leading to a sluggish UI.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">The Specifics of Optimization Boundaries</h2>
        <p>
          Modern React applications emphasize component composition. However, large component trees can introduce overhead
          if updates aren&apos;t managed correctly.
        </p>
        <p>
          A common misconception is that React must always traverse the &quot;entire tree&quot; to reconcile updates. In
          reality, React optimizes this process using memoization. When a component is wrapped in{" "}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">React.memo</code>, React checks
          if the props have changed. If the props are identical to the previous render, React skips executing the
          component function and reuses the previously rendered Fiber subtree. This effectively avoids the render work
          for that entire branch.
        </p>
        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">React Documentation Insights</p>
          <p className="italic">
            &quot;React normally re-renders a component whenever its parent re-renders. With memo, you can create a
            component that React will not re-render when its parent re-renders so long as its new props are the same as
            the old props.&quot;
          </p>
          <p className="mt-1 text-sm text-zinc-400">— React Documentation: Skipping re-renders with memo</p>
        </div>
        <p>
          This means the cost is not a full tree traversal of new elements, but rather the cost of the prop comparison
          and reusing the existing Fiber nodes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">State Colocation: A Powerful Performance Pattern</h2>
        <p>
          One of the most effective—yet underutilized—performance optimization techniques is state colocation: moving
          state as close as possible to where it&apos;s actually used. This approach minimizes the rendering scope by
          ensuring that state updates only trigger re-renders in the specific subtree that depends on that state.
        </p>

        <CodePane
          items={[
            {
              title: "State Colocation Example",
              language: "tsx",
              code: stateColocationCode,
            },
          ]}
        />

        <p>
          By colocating the filter state within <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">FilterSection</code>,
          we create a natural performance boundary. When the filter changes, only the FilterSection subtree renders—the
          rest of the application remains untouched.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">The Context API Performance Nuance</h2>
        <p>
          React&apos;s Context API is excellent for avoiding prop drilling, but it comes with a performance caveat: All
          consumers that read a context will re-render when the context value changes.
        </p>
        <p>
          Crucially, React determines &quot;change&quot; using object identity (
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">Object.is</code>). If you pass a
          new object to your Provider during every render (e.g.,{" "}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">value=&#123;&#123; user, setUser &#125;&#125;</code>
          ), all consumers will re-render even if the underlying data hasn&apos;t changed.
        </p>
        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">React Documentation Insights</p>
          <p className="italic">
            &quot;React automatically re-renders all the children that use a particular context starting from the
            provider that receives a different value. The previous and the next values are compared with the Object.is
            comparison.&quot;
          </p>
          <p className="mt-1 text-sm text-zinc-400">— React Documentation: useContext Caveats</p>
        </div>
        <p>
          To solve this, you should split contexts based on their update frequency (e.g., separating UserContext from
          ThemeContext) or use{" "}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">useMemo</code> to ensure the
          context value object maintains referential identity unless its dependencies change.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Composition Over Memoization</h2>
        <p>
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">React.memo()</code>,{" "}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">useMemo()</code>, and{" "}
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">useCallback()</code> are powerful
          tools, but they add code complexity. A more fundamental approach is to leverage component composition.
        </p>
        <p>
          When a wrapper component updates its own state, it must re-render. However, if the props it passes to its
          children (specifically the children prop) are referentially equal to the previous render, React&apos;s
          reconciliation algorithm detects this stability. It will then reuse the existing Fiber subtree for those
          children, avoiding the need to run their component functions again.
        </p>
        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">React Documentation Insights</p>
          <p className="italic">
            &quot;When a component visually wraps other components, let it accept JSX as children. This way, when the
            wrapper component updates its own state, React knows that its children don&apos;t need to re-render.&quot;
          </p>
          <p className="mt-1 text-sm text-zinc-400">— React Documentation: Memoization Principles</p>
        </div>

        <CodePane
          items={[
            {
              title: "Composition Example",
              language: "tsx",
              code: compositionCode,
            },
          ]}
        />

        <p>
          Because <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">ExpensiveComponent</code>{" "}
          is instantiated in the parent scope (which didn&apos;t re-render), the children prop passed into Dashboard is
          the exact same object instance as before. React detects this identity match and bails out of rendering the
          children slot.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Measuring What Matters: Performance Profiling</h2>
        <p>
          The most critical skill for optimizing React applications is knowing where to optimize. The React DevTools
          Profiler provides detailed insights into your application&apos;s rendering behavior.
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Flame graphs</span> visualize which components re-render and how
            long they take.
          </li>
          <li>
            <span className="font-medium text-white">Ranked charts</span> identify the most expensive components in your
            tree.
          </li>
          <li>
            <span className="font-medium text-white">&quot;Why did this render?&quot; tool</span> highlights exactly
            which prop or state change triggered the update.
          </li>
        </ul>
        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">React Documentation Insights</p>
          <p className="italic">
            &quot;If a specific interaction still feels laggy, use the React Developer Tools profiler to see which
            components would benefit the most from memoization.&quot;
          </p>
          <p className="mt-1 text-sm text-zinc-400">— React Documentation: Profiling</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Architectural Patterns for Scale</h2>
        <p>
          As applications grow, architectural decisions have outsized performance implications. Consider these patterns
          for large-scale React applications:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Boundary Components:</span> Create explicit performance boundaries
            using context and composition to prevent state changes in one feature from triggering reconciliation in
            unrelated features.
          </li>
          <li>
            <span className="font-medium text-white">Windowing for Large Lists:</span> For lists with hundreds of items,
            use virtual scrolling libraries like{" "}
            <a
              href="https://github.com/bvaughn/react-window"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              react-window
            </a>{" "}
            to render only the visible items.
          </li>
          <li>
            <span className="font-medium text-white">Code Splitting by Route:</span> Lazy-loading route components with{" "}
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">React.lazy()</code> and{" "}
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">Suspense</code> ensures that
            you only load and reconcile the code needed for the current view.
          </li>
          <li>
            <span className="font-medium text-white">External State Management:</span> For complex state interactions,
            libraries like{" "}
            <a
              href="https://github.com/pmndrs/zustand"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Zustand
            </a>
            ,{" "}
            <a
              href="https://jotai.org/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Jotai
            </a>
            , or{" "}
            <a
              href="https://redux-toolkit.js.org/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Redux Toolkit
            </a>{" "}
            allow for fine-grained subscriptions that can sometimes bypass the top-down React render cycle for specific
            updates.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Conclusion: Performance is Architecture</h2>
        <p>
          React&apos;s rendering model is remarkably efficient, but it operates within constraints defined by your
          architecture. The most significant performance gains come not from micro-optimizations, but from thoughtful
          decisions like state colocation and component composition.
        </p>
        <p>
          By understanding the distinct phases of rendering and leveraging React&apos;s built-in composition model, you
          can build applications that remain responsive and performant even as they scale.
        </p>
      </section>
    </>
  );
}

function DefensiveReactArticle() {
  const errorBoundaryCode = [
    "class ErrorBoundary extends Component<Props, State> {",
    "  state: State = { hasError: false, error: null };",
    "",
    "  static getDerivedStateFromError(error: Error): State {",
    "    return { hasError: true, error };",
    "  }",
    "",
    "  componentDidCatch(error: Error, info: ErrorInfo) {",
    "    // Log to your error tracking service",
    "    errorService.capture(error, {",
    "      componentStack: info.componentStack,",
    "      userId: this.props.userId,",
    "    });",
    "  }",
    "",
    "  render() {",
    "    if (this.state.hasError) {",
    "      return this.props.fallback ?? <DefaultErrorUI />;",
    "    }",
    "    return this.props.children;",
    "  }",
    "}",
  ].join("\\n");

  const granularBoundariesCode = [
    "function Dashboard() {",
    "  return (",
    "    <Layout>",
    "      {/* Critical path: isolated boundary */}",
    "      <ErrorBoundary fallback={<ChartPlaceholder />}>",
    "        <RevenueChart />",
    "      </ErrorBoundary>",
    "",
    "      {/* Non-critical: shared boundary */}",
    "      <ErrorBoundary fallback={<WidgetsFallback />}>",
    "        <NotificationsWidget />",
    "        <ActivityFeed />",
    "        <QuickActions />",
    "      </ErrorBoundary>",
    "",
    "      {/* Must never fail: multiple layers */}",
    "      <ErrorBoundary fallback={<EmergencyNav />}>",
    "        <Navigation />",
    "      </ErrorBoundary>",
    "    </Layout>",
    "  );",
    "}",
  ].join("\\n");

  const safePropAccessCode = [
    "// ❌ Fragile: assumes shape exists",
    "function UserCard({ user }) {",
    "  return <span>{user.profile.name}</span>;",
    "}",
    "",
    "// ✅ Defensive: graceful fallbacks",
    "function UserCard({ user }) {",
    "  const name = user?.profile?.name ?? 'Anonymous';",
    "  const avatar = user?.profile?.avatar;",
    "",
    "  return (",
    "    <div className=\\\"flex items-center gap-3\\\">",
    "      {avatar ? (",
    "        <img src={avatar} alt={name} />",
    "      ) : (",
    "        <DefaultAvatar />",
    "      )}",
    "      <span>{name}</span>",
    "    </div>",
    "  );",
    "}",
  ].join("\\n");

  const asyncBoundaryCode = [
    "function AsyncBoundary({ children, fallback, errorFallback }) {",
    "  return (",
    "    <ErrorBoundary fallback={errorFallback}>",
    "      <Suspense fallback={fallback}>",
    "        {children}",
    "      </Suspense>",
    "    </ErrorBoundary>",
    "  );",
    "}",
    "",
    "// Usage: unified loading + error handling",
    "<AsyncBoundary",
    "  fallback={<TableSkeleton rows={10} />}",
    "  errorFallback={<TableError onRetry={refetch} />}",
    ">",
    "  <DataTable />",
    "</AsyncBoundary>",
  ].join("\\n");

  const retryPatternCode = [
    "function useRetryableFetch<T>(fetcher: () => Promise<T>) {",
    "  const [state, setState] = useState<{",
    "    data: T | null;",
    "    error: Error | null;",
    "    isLoading: boolean;",
    "    retryCount: number;",
    "  }>({ data: null, error: null, isLoading: true, retryCount: 0 });",
    "",
    "  const execute = useCallback(async () => {",
    "    setState(s => ({ ...s, isLoading: true, error: null }));",
    "    try {",
    "      const data = await fetcher();",
    "      setState({ data, error: null, isLoading: false, retryCount: 0 });",
    "    } catch (error) {",
    "      setState(s => ({",
    "        ...s,",
    "        error: error as Error,",
    "        isLoading: false,",
    "        retryCount: s.retryCount + 1,",
    "      }));",
    "    }",
    "  }, [fetcher]);",
    "",
    "  const retry = useCallback(() => execute(), [execute]);",
    "",
    "  return { ...state, retry };",
    "}",
  ].join("\\n");

  return (
    <>
      <section className="space-y-4">
        <p>
          In production, things break. APIs return unexpected shapes. Third-party scripts fail to load. Users interact
          with your UI in ways you never anticipated. The difference between a frustrating experience and a resilient
          one often comes down to how thoughtfully you&apos;ve handled the unexpected.
        </p>
        <p>
          After years of building and maintaining large-scale React applications, I&apos;ve learned that defensive
          programming isn&apos;t paranoia—it&apos;s professionalism. This article explores the patterns and strategies
          that keep users happy even when things go wrong.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">The Philosophy of Graceful Degradation</h2>
        <p>
          Before diving into code, let&apos;s establish a mental model. Graceful degradation means that when a component
          fails, the failure should be:{" "}
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Contained:</span> A broken widget shouldn&apos;t crash the entire
            page.
          </li>
          <li>
            <span className="font-medium text-white">Informative:</span> Users should understand something went wrong,
            without technical jargon.
          </li>
          <li>
            <span className="font-medium text-white">Recoverable:</span> Where possible, offer a path forward—retry,
            refresh, or navigate elsewhere.
          </li>
          <li>
            <span className="font-medium text-white">Observable:</span> Your team should know about failures before users
            report them.
          </li>
        </ul>
        <p>
          This philosophy shapes everything from component architecture to API integration patterns.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Error Boundaries: Your First Line of Defense</h2>
        <p>
          React&apos;s{" "}
          <a
            href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
            className="text-[#ff8820] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Error Boundaries
          </a>{" "}
          catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors.
          They&apos;re the foundation of defensive React architecture.
        </p>

        <CodePane
          items={[
            {
              title: "Error Boundary Implementation",
              language: "tsx",
              code: errorBoundaryCode,
            },
          ]}
        />

        <div className="rounded-l border-l-4 border-[#ff8820] bg-white/5 p-4 text-zinc-300">
          <p className="font-medium text-white">Important Limitation</p>
          <p className="italic">
            Error boundaries do not catch errors in event handlers, async code (like setTimeout or fetch), or
            server-side rendering. You&apos;ll need complementary patterns for those scenarios.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Strategic Boundary Placement</h2>
        <p>
          Where you place error boundaries matters as much as having them. Too few boundaries and a single failure
          cascades everywhere. Too many and you&apos;re drowning in boilerplate.
        </p>
        <p>
          I recommend thinking in terms of <span className="font-medium text-white">blast radius</span>: how much of
          your UI should be affected if this component fails?
        </p>

        <CodePane
          items={[
            {
              title: "Granular Boundary Placement",
              language: "tsx",
              code: granularBoundariesCode,
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-white">Boundary Placement Heuristics</h3>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Route level:</span> Wrap each route&apos;s content to prevent
            navigation failures from breaking the entire app.
          </li>
          <li>
            <span className="font-medium text-white">Feature level:</span> Independent features (dashboards, settings,
            profiles) should have their own boundaries.
          </li>
          <li>
            <span className="font-medium text-white">Third-party integrations:</span> Any component rendering content
            from external sources (embeds, widgets, iframes) deserves isolation.
          </li>
          <li>
            <span className="font-medium text-white">Dynamic content:</span> User-generated content, markdown
            rendering, and data visualizations are high-risk areas.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Defensive Data Access</h2>
        <p>
          API responses lie. Even well-documented endpoints occasionally return unexpected shapes, null values, or empty
          arrays where you expected objects. Defensive data access patterns protect against these realities.
        </p>

        <CodePane
          items={[
            {
              title: "Safe Property Access",
              language: "tsx",
              code: safePropAccessCode,
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-white">Runtime Validation</h3>
        <p>
          For critical data, consider runtime validation with libraries like{" "}
          <a
            href="https://zod.dev/"
            className="text-[#ff8820] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Zod
          </a>{" "}
          or{" "}
          <a
            href="https://github.com/Effect-TS/effect"
            className="text-[#ff8820] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Effect Schema
          </a>
          . They let you validate API responses at the boundary and fail fast with meaningful errors rather than
          propagating undefined through your component tree.
        </p>
        <p>
          The investment pays off especially in TypeScript codebases, where runtime validation bridges the gap between
          compile-time types and runtime reality.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">The AsyncBoundary Pattern</h2>
        <p>
          Modern React applications often use Suspense for data fetching. Combining Suspense with error boundaries
          creates a powerful pattern I call the &quot;AsyncBoundary&quot;—a single wrapper that handles both loading
          and error states.
        </p>

        <CodePane
          items={[
            {
              title: "AsyncBoundary Component",
              language: "tsx",
              code: asyncBoundaryCode,
            },
          ]}
        />

        <p>
          This pattern shines in data-heavy applications where every async operation needs consistent loading and error
          treatment. It also makes the happy path code remarkably clean—your data components can focus purely on
          rendering data, trusting that the boundary handles everything else.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Retry Mechanisms and User Recovery</h2>
        <p>
          A static error message is a dead end. Wherever possible, give users a path forward. The simplest pattern is a
          retry button, but the implementation details matter.
        </p>

        <CodePane
          items={[
            {
              title: "Retryable Fetch Hook",
              language: "tsx",
              code: retryPatternCode,
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-white">Retry UX Considerations</h3>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Exponential backoff:</span> For automatic retries, increase delay
            between attempts to avoid hammering failing services.
          </li>
          <li>
            <span className="font-medium text-white">Retry limits:</span> Track retry count and show different messaging
            after repeated failures (&quot;Still having trouble? Contact support.&quot;).
          </li>
          <li>
            <span className="font-medium text-white">Optimistic feedback:</span> Show immediate feedback when retry is
            clicked—a spinner or &quot;Retrying...&quot; message—so users know their action registered.
          </li>
          <li>
            <span className="font-medium text-white">Preserve context:</span> If a form submission fails, don&apos;t
            clear the form. Let users retry without re-entering data.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Observability: Know Before Users Tell You</h2>
        <p>
          Defensive code without observability is flying blind. You need to know when errors occur, how often, and in
          what context.
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Error tracking integration:</span> Services like{" "}
            <a
              href="https://sentry.io/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Sentry
            </a>{" "}
            or{" "}
            <a
              href="https://www.bugsnag.com/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Bugsnag
            </a>{" "}
            capture errors with full stack traces and user context.
          </li>
          <li>
            <span className="font-medium text-white">Custom error metadata:</span> Include user ID, feature flags,
            component hierarchy, and recent user actions to make debugging faster.
          </li>
          <li>
            <span className="font-medium text-white">Error rate alerting:</span> Set up alerts for error rate spikes so
            you catch regressions immediately after deploys.
          </li>
          <li>
            <span className="font-medium text-white">Session replay:</span> Tools like{" "}
            <a
              href="https://logrocket.com/"
              className="text-[#ff8820] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              LogRocket
            </a>{" "}
            show exactly what the user experienced leading up to an error.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Testing Error Scenarios</h2>
        <p>
          Defensive code is only as good as its test coverage. Make error paths first-class citizens in your test suite.
        </p>
        <ul className="list-disc space-y-3 pl-6 text-zinc-300">
          <li>
            <span className="font-medium text-white">Mock API failures:</span> Test that your components handle 500s,
            timeouts, and malformed responses gracefully.
          </li>
          <li>
            <span className="font-medium text-white">Test error boundaries:</span> Verify that throwing components
            render fallback UI, not blank screens.
          </li>
          <li>
            <span className="font-medium text-white">Snapshot fallback states:</span> Include error and loading states
            in visual regression tests.
          </li>
          <li>
            <span className="font-medium text-white">Chaos testing:</span> In staging environments, randomly inject
            failures to validate resilience under realistic conditions.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Conclusion: Resilience as a Feature</h2>
        <p>
          Defensive programming in React isn&apos;t about pessimism—it&apos;s about empathy. Users don&apos;t care why
          something broke; they care whether they can continue their task. By building with graceful degradation in
          mind, you transform potential frustrations into minor hiccups.
        </p>
        <p>
          The patterns in this article—strategic error boundaries, defensive data access, AsyncBoundary composition,
          retry mechanisms, and comprehensive observability—form a toolkit for building UIs that earn user trust through
          reliability.
        </p>
        <p>
          Start small: add an error boundary to your next feature. Wrap that API call with proper error handling. Add
          context to your error logs. Each improvement compounds, and over time, you&apos;ll build applications that
          handle the unexpected with grace.
        </p>
      </section>
    </>
  );
}

const articleBySlug: Record<string, () => JSX.Element> = {
  "when-and-when-not-to-use-rtk-query": RtkQueryArticle,
  "defensive-react-uis-that-never-break": DefensiveReactArticle,
  "hidden-cost-of-react-re-renders": ReconciliationPerformanceArticle,
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
  const optimizedHero = post.image ? buildCloudinaryUrl(post.image.src, { width: 1400, quality: 75 }) : undefined;
  const isFlagship = post.slug === blogPosts[0]?.slug;

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
          <div className="flex flex-col gap-10 p-4 sm:p-8 lg:p-12">
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
                    src={optimizedHero ?? post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 70vw, 100vw"
                    className="h-full w-full object-cover"
                    priority={isFlagship}
                    placeholder="blur"
                    blurDataURL={CLOUDINARY_BLUR_DATA_URL}
                  />
                </div>
              </div>
            ) : null}

            {articleContent ? (
              <article className="min-w-0 space-y-8 text-base leading-relaxed text-zinc-200 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
                {articleContent}
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

