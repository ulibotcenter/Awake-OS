import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment, type ReactNode } from 'react';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getPrivacyDoc, type PrivacyBlock } from '@/i18n/privacy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = await getDictionary(locale);
  const privacy = getPrivacyDoc(locale);
  return {
    title: dict.privacy.title,
    description: privacy.metaDescription,
    alternates: {
      canonical: `/${locale}/privacy`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function PrivacySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="privacy-section">
      <h2 className="privacy-section-title">{title}</h2>
      <div className="privacy-section-body space-y-4">{children}</div>
    </section>
  );
}

/** Replace {{site}} / {{email}} and light **bold** markers */
function RichText({ text }: { text: string }) {
  const withLinks = text
    .split(/(\{\{site\}\}|\{\{email\}\}|\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part === '{{site}}') {
        return (
          <a key={i} href="https://awake-os.com" className="privacy-inline-link">
            awake-os.com
          </a>
        );
      }
      if (part === '{{email}}') {
        return (
          <a key={i} href="mailto:privacy@awake-os.com" className="privacy-inline-link">
            privacy@awake-os.com
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-[#FFFFFF]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Preserve intentional newlines as <br />
      const lines = part.split('\n');
      if (lines.length === 1) return <Fragment key={i}>{part}</Fragment>;
      return (
        <Fragment key={i}>
          {lines.map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </Fragment>
      );
    });

  return <>{withLinks}</>;
}

function renderBlocks(
  blocks: PrivacyBlock[],
  labels: { emailLabel: string; websiteLabel: string; contactOrg: string; contactAttn: string },
) {
  return blocks.map((block, i) => {
    if (block.type === 'p') {
      return (
        <p key={i}>
          <RichText text={block.text} />
        </p>
      );
    }
    if (block.type === 'list') {
      return (
        <ul key={i} className="privacy-list">
          {block.items.map((item, j) => (
            <li key={j}>
              {item.label ? (
                <>
                  <strong className="text-[#FFFFFF]">{item.label}</strong> {item.text}
                </>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      );
    }
    if (block.type === 'meta') {
      return (
        <p key={i} className="privacy-meta text-[#B8F5FF]">
          {block.lines.map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      );
    }
    // contact card
    return (
      <div key={i} className="privacy-contact-card">
        <p className="text-[#FFFFFF] font-medium">{labels.contactOrg}</p>
        <p>{labels.contactAttn}</p>
        <p>
          {labels.emailLabel}:{' '}
          <a href="mailto:privacy@awake-os.com" className="privacy-inline-link">
            privacy@awake-os.com
          </a>
        </p>
        <p>
          {labels.websiteLabel}:{' '}
          <a href="https://awake-os.com" className="privacy-inline-link">
            https://awake-os.com
          </a>
        </p>
      </div>
    );
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const privacy = getPrivacyDoc(locale);
  const home = `/${locale}`;

  return (
    <div className="privacy-page min-h-screen flex flex-col">
      <header className="privacy-header glass-strong border-b border-[rgba(0,229,192,0.28)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href={home}
            className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-[#E8FFFE] hover:text-[#FFFFFF] transition-colors"
          >
            Awake OS
          </Link>
          <Link href={home} className="privacy-back-link text-sm font-medium">
            {dict.privacy.back}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="privacy-panel glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-[rgba(0,229,192,0.28)]">
            <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3.5px]">
              {privacy.legalLabel}
            </span>
            <h1 className="section-title mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em]">
              {dict.privacy.title}
            </h1>
            <p className="privacy-updated mt-3 text-xs sm:text-sm text-[#B8F5FF]">
              {dict.privacy.updated}: {privacy.lastUpdated}
            </p>
            <div className="privacy-divider mt-6 mb-10" aria-hidden="true" />

            <nav className="privacy-toc mb-10" aria-label={privacy.contentsLabel}>
              <p className="privacy-toc-label text-[10px] tracking-[0.2em] uppercase text-[#40F0D8] mb-3">
                {privacy.contentsLabel}
              </p>
              <ol className="privacy-toc-list text-sm text-[#B8F5FF] space-y-1.5">
                {privacy.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="privacy-content text-[#E0F7FF] text-sm sm:text-[0.95rem] leading-relaxed tracking-[-0.01em] space-y-10">
              {privacy.sections.map((section) => (
                <PrivacySection key={section.id} id={section.id} title={section.title}>
                  {renderBlocks(section.blocks, {
                    emailLabel: privacy.emailLabel,
                    websiteLabel: privacy.websiteLabel,
                    contactOrg: privacy.contactOrg,
                    contactAttn: privacy.contactAttn,
                  })}
                </PrivacySection>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[rgba(0,229,192,0.2)]">
              <Link
                href={home}
                className="privacy-home-link inline-flex items-center gap-2 text-sm font-medium"
              >
                {dict.privacy.return}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer border-t border-[rgba(0,229,192,0.28)] mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 text-center">
          <p className="site-footer-copy text-xs text-[#B8F5FF]">{privacy.footerCopy}</p>
        </div>
      </footer>
    </div>
  );
}
