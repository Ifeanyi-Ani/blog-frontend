export const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center from-customBlue-950 via-customBlue-900 to-customBlue-800 md:bg-gradient-to-br">
      <div className="text-center">
        <div className="inline-block h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-neonPink-500"></div>
        <div className="mt-4 text-xl font-semibold text-electricCyan-300">
          Loading Data...
        </div>
      </div>
    </div>
  );
};
