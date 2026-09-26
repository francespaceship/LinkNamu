export type LinkItem = {
  id: string;
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export const profile: Profile = {
  name: "이준호",
  bio: "서강대학교 재학 중인 학생",
  avatarUrl: "/avatar.svg",
};

export const links: LinkItem[] = [
  { id: "github", label: "GitHub", url: "https://github.com/example" },
  { id: "notion", label: "Notion", url: "https://notion.so/example" },
  { id: "blog", label: "Blog", url: "https://example.com/blog" },
];
