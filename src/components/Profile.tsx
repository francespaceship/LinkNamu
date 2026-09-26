import type { Profile as ProfileType } from "@/config/links";

export default function Profile({ profile }: { profile: ProfileType }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="h-40 w-40 overflow-hidden rounded-full bg-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-white">{profile.name}</h1>
        <p className="mt-1 text-sm text-slate-300">{profile.bio}</p>
      </div>
    </div>
  );
}
