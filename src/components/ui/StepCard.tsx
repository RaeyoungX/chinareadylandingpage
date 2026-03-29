import PhoneMockup from "./PhoneMockup";

type StepCardProps = {
  number: number;
  title: string;
  description: string;
  screenshotSrc?: string;
  screenshotAlt: string;
  reverse?: boolean;
};

export default function StepCard({
  number,
  title,
  description,
  screenshotSrc,
  screenshotAlt,
  reverse = false,
}: StepCardProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12 lg:gap-24`}
    >
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white text-xl font-bold mb-5 shadow-lg shadow-primary/25">
          {number}
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">
        <PhoneMockup src={screenshotSrc} alt={screenshotAlt} />
      </div>
    </div>
  );
}
