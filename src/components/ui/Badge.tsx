export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-accent-red text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
      {children}
    </span>
  );
}
