export interface PortfolioData {
  personal: {
    id: string;
    name: string;
    headline: string;
    resumeLink: string;
    photoUrl?: string | null;
  };
  about: {
    id: string;
    about: string;
  };
  roles: {
    id: string;
    name: string;
  }[];
  experiences: {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    photoUrl?: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    link: string;
    photoUrl?: string;
  }[];
  skills: {
    id: string;
    name: string;
    photoUrl?: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    period: string;
    photoUrl?: string;
  }[];
  contactInfo: {
    id: string;
    type: string;
    value: string;
    photoUrl?: string;
  }[];
}
