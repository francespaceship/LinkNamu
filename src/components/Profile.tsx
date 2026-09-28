import type { Profile as ProfileType } from "@/config/links";

export default function Profile({ profile }: { profile: ProfileType }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-[150px] w-[150px] rounded-full bg-slate-200 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <div className="h-full w-full overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="block h-full w-full scale-[1.4] object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-6px_10px_rgba(0,0,0,0.35)]" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">{profile.name}</h1>
        <p className="mt-1 text-sm text-white/60">{profile.bio}</p>
      </div>
    </div>
  );
}
