export const metadata = { title: "About — Eduardo Neto" };

export default function About() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">About Me</h1>
      <section className="mt-6 space-y-4 text-zinc-300">
        <p>
          Motivated career-changer from Head Sommelier to Front-End Engineer. I bring
          user empathy, leadership, and calm problem-solving from hospitality to
          engineering. I focus on performance, accessibility, and maintainable systems.
        </p>
      </section>
      <div className="mt-6 flex items-center gap-4">
        <a className="rounded-md bg-[#ff8820] px-4 py-2 text-sm font-medium text-black hover:opacity-90" href="https://res.cloudinary.com/ygiah/image/upload/v1765904616/Portfolio%202025-26/Eduardo_Neto_Software_Engineer.pdf" target="_blank" rel="noreferrer">
          Download CV
        </a>
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#ff8820]">Skills</h2>
        <ul className="mt-3 grid list-disc gap-2 pl-5 text-zinc-300 sm:grid-cols-2">
          <li>React, Next.js, TypeScript</li>
          <li>State management (RTK Query, Redux), React Query</li>
          <li>Testing (Jest, React Testing Library)</li>
          <li>Performance & Accessibility (WCAG 2.1 AA)</li>
        </ul>
      </section>
    </div>
  );
}


