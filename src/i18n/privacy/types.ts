export type PrivacyListItem = {
  label?: string;
  text: string;
};

export type PrivacyBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: PrivacyListItem[] }
  | { type: 'meta'; lines: string[] }
  | { type: 'contact' };

export type PrivacySection = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

export type PrivacyDoc = {
  lastUpdated: string;
  legalLabel: string;
  contentsLabel: string;
  metaDescription: string;
  toc: { id: string; label: string }[];
  sections: PrivacySection[];
  footerCopy: string;
  contactOrg: string;
  contactAttn: string;
  emailLabel: string;
  websiteLabel: string;
};
