export const LoadingState = () => {
  return (
    <div className="min-h-screen md:bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neonPink-500"></div>
        <div className="mt-4 text-electricCyan-300 text-xl font-semibold">
          Loading Data...
        </div>
      </div>
    </div>
  );
};
