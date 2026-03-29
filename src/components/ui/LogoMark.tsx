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
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-neutral-100 p-1 ring-1 ring-neutral-200/80 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/chinaready-logo.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-md object-contain"
        priority={priority}
      />
    </span>
  );
}
