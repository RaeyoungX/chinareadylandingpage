import Image from "next/image";

type PhoneMockupProps = {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function PhoneMockup({
  src,
  alt = "App screenshot",
  className = "",
  size = "md",
}: PhoneMockupProps) {
  const sizes = {
    sm: "w-[180px]",
    md: "w-[240px]",
    lg: "w-[270px]",
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="rounded-[2rem] bg-gray-900 p-[4px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-white aspect-[9/19.5]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="280px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white p-4 pt-7">
              {/* Status bar */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div className="text-[8px] font-semibold text-gray-800">9:41</div>
                <div className="flex gap-0.5">
                  <div className="w-3 h-1.5 bg-gray-800 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
                </div>
              </div>
              {/* Header */}
              <div className="h-2 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-3.5 w-28 bg-gray-800 rounded mb-0.5" />
              <div className="h-2 w-36 bg-gray-200 rounded mb-4" />
              {/* Score card */}
              <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="h-1.5 w-10 bg-gray-200 rounded mb-1.5" />
                    <div className="h-2 w-16 bg-gray-300 rounded" />
                  </div>
                  <div className="text-2xl font-bold text-primary">43%</div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full">
                  <div className="h-1.5 w-2/5 bg-primary rounded-full" />
                </div>
                <div className="h-1.5 w-24 bg-gray-100 rounded mt-2" />
              </div>
              {/* Task items */}
              {[
                { color: "bg-amber-100", urgent: true },
                { color: "bg-emerald-100", urgent: false },
                { color: "bg-red-100", urgent: false },
                { color: "bg-rose-100", urgent: false },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-gray-100 mb-1.5 flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md ${item.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-16 bg-gray-200 rounded" />
                      {item.urgent && <div className="h-2 w-8 bg-red-400 rounded-full" />}
                    </div>
                    <div className="h-1.5 w-12 bg-gray-100 rounded mt-1" />
                  </div>
                  <div className="w-5 h-5 rounded-full border border-gray-200 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
