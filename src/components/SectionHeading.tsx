export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between"><div><p className="mb-3 text-xs font-bold uppercase text-secondary">{label}</p><h2 className="max-w-2xl font-display text-4xl font-black leading-[1.05] sm:text-5xl">{title}</h2></div>{description && <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>}</div>;
}
