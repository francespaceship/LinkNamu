import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/config/links";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#26324a] px-4 py-12 sm:py-16">
      <div className="w-full max-w-sm">
        <Profile profile={profile} />
        <div className="mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </div>
    </main>
  );
}
