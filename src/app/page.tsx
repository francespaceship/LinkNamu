import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import ColaCan from "@/components/ColaCan";
import CoffeeCup from "@/components/CoffeeCup";
import IntroOverlay from "@/components/IntroOverlay";
import { profile, links } from "@/config/links";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 sm:py-20"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #1a2433 0%, #0a0e16 45%, #030405 100%)",
      }}
    >
      <IntroOverlay />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(80,110,150,0.12),transparent_60%)]" />
      <div className="absolute left-[75%] top-[120px] z-20 flex -translate-x-1/2 flex-col items-center gap-10 sm:top-[136px]">
        <ColaCan />
        <CoffeeCup />
      </div>
      <div className="relative w-full max-w-sm">
        <Profile profile={profile} />
        <LinkList links={links} />
      </div>
    </main>
  );
}
