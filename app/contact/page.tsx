export const metadata = { title: "Contact — Eduardo Neto" };

export default function Contact() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Contact</h1>
      <p className="mt-2 max-w-2xl text-zinc-300">Reach me via the links below. A simple form can be added later.</p>
      <div className="mt-6 flex items-center gap-4 text-sm text-zinc-300">
        <a className="rounded-md border border-white/10 px-4 py-2 hover:border-[#ff8820]" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="rounded-md border border-white/10 px-4 py-2 hover:border-[#ff8820]" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  );
}


