"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/config/links";
import LinkCard from "@/components/LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/api/clicks")
      .then((res) => res.json())
      .then((data: { counts?: Record<string, number> }) => {
        if (!cancelled) setCounts(data.counts ?? {});
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} count={counts[link.id] ?? 0} />
      ))}
    </div>
  );
}
