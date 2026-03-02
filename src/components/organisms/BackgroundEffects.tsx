export function BackgroundEffects() {
  return (
    <>
      {/* Mesh gradient background */}
      <div className="fixed inset-0 z-0 mesh-bg" />

      {/* Grid lines overlay */}
      <div className="fixed inset-0 z-0 grid-lines" />

      {/* Floating nebula orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div
        className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
    </>
  );
}

