import * as React from 'react';
interface GlowHeadingProps {
  heading: string;
  className?: React.ComponentProps<'h1'>['className'];
}
export const GlowHeading: React.FC<GlowHeadingProps> = ({
  heading,
  className,
}) => {
  return (
    <h1
      className={`animate-glow bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent ${className}`}
    >
      {heading}
    </h1>
  );
};
