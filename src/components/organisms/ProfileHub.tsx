import Image from "next/image";
import Link from "next/link";

export function ProfileHub() {
  return (
    <Link href="/profile" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center">
      {/* Avatar with orbiting rings */}
      <div className="relative group cursor-pointer">
        {/* Glow backdrop */}
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />

        {/* Avatar circle */}
        <div className="relative size-32 md:size-40 rounded-full bg-surface border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
          <Image
            src="/images/profile.jpg"
            alt="Developer Portrait"
            fill
            className="object-cover opacity-100 group-hover:opacity-100 transition-opacity"
            priority
          />
        </div>

        {/* Orbiting rings */}
        <div className="absolute -inset-1 border border-primary/30 rounded-full animate-spin-slow" />
        <div className="absolute -inset-8 border border-dashed border-surface-border/50 rounded-full animate-spin-slow-reverse" />
      </div>

      {/* Name and role */}
      <h1 className="mt-6 text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-text-primary to-text-secondary transition-colors duration-300">
        Jerrie Jayadi
      </h1>
      <p className="text-primary font-mono text-sm mt-1">
        {"<Frontend Engineer />"}
      </p>
    </Link>
  );
}

