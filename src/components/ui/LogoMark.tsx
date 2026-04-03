import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  /** CSS pixel size (square) */
  size?: number;
  /** Prefer true above the fold (e.g. header logo) */
  priority?: boolean;
};

export default function LogoMark({
  className = "",
  size = 32,
  priority = false,
}: LogoMarkProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-slate-200/80 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/icon.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </span>
  );
}
