import type { LinkItem } from "@/config/links";

export default function LinkCard({ link }: { link: LinkItem }) {
  const isImageIcon = link.icon?.startsWith("http");

  return (
    <a
      href={`/api/click/${link.id}`}
      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.05] px-5 py-4 text-center font-medium text-white/90 shadow-[0_8px_32px_-10px_rgba(0,0,0,0.65)] backdrop-blur-2xl backdrop-saturate-150 transition duration-200 hover:border-white/30 hover:bg-white/[0.09] active:bg-white/[0.07]"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 via-white/5 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-90" />
      <span className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-white/10 blur-md" />
      <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.06)]" />
      {link.icon &&
        (isImageIcon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={link.icon} alt="" className="relative h-5 w-5 opacity-90 invert" />
        ) : (
          <span className="relative text-lg leading-none">{link.icon}</span>
        ))}
      <span className="relative">{link.label}</span>
    </a>
  );
}
