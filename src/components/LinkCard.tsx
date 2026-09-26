import type { LinkItem } from "@/config/links";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={`/api/click/${link.id}`}
      className="block w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 text-center font-medium text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      {link.label}
    </a>
  );
}
