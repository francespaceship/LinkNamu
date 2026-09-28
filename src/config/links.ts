export type LinkItem = {
  id: string;
  label: string;
  url: string;
  icon?: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export const profile: Profile = {
  name: "이준호",
  bio: "심리학/컴퓨터공학 전공한 서강대학교 학생",
  avatarUrl: "/profile_a.jpeg",
};

export const links: LinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/francespaceship",
    icon: "https://cdn.simpleicons.org/github",
  },
  {
    id: "notion",
    label: "Notion",
    url: "https://app.notion.com/p/PORTFOLIO-3d33581afdce80a1bee8dcfcc6c3e721",
    icon: "https://cdn.simpleicons.org/notion",
  },
  {
    id: "email",
    label: "E-Mail",
    url: "mailto:coolandy800@naver.com",
    icon: "📮",
  },
];
