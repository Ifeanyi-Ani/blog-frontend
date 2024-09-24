interface GlowHeadingProps {
  heading: string;
  className?: React.ComponentProps<"h1">["className"];
}
export const GlowHeading: React.FC<GlowHeadingProps> = ({
  heading,
  className,
}) => {
  return (
    <h1
      className={`text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400 animate-glow ${className}`}
    >
      {heading}
    </h1>
  );
};
