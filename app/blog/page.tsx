export const metadata = { title: "Blog — Eduardo Neto" };

export default function Blog() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Blog</h1>
      <p className="mt-2 max-w-2xl text-zinc-300">Deep dives and practical guides expanding on the case studies.</p>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-zinc-300">
        <li>When (and When Not) to use RTK Query: A Deep Dive into Caching Strategies</li>
        <li>How We Cut Developer Blockers by 50% with a Mock Server</li>
        <li>My Framework for Building Reusable Components that Cut Dev Time by 25%</li>
        <li>From Sommelier to Software Engineer: 5 Lessons in User Experience</li>
      </ul>
    </div>
  );
}


