import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Legal",
  description:
    "Privacy Policy, data protection, copyright, and legal disclaimers for Awake OS by Ariel Uri · Somatic Labs Publishing.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = "June 13, 2026";

function PrivacySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="privacy-section">
      <h2 className="privacy-section-title">{title}</h2>
      <div className="privacy-section-body space-y-4">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page min-h-screen flex flex-col">
      <header className="privacy-header glass-strong border-b border-[rgba(0,229,192,0.28)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-[#E8FFFE] hover:text-[#FFFFFF] transition-colors"
          >
            Awake OS
          </Link>
          <Link href="/" className="privacy-back-link text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="privacy-panel glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-[rgba(0,229,192,0.28)]">
            <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3.5px]">
              LEGAL
            </span>
            <h1 className="section-title mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em]">
              Privacy &amp; Legal
            </h1>
            <p className="privacy-updated mt-3 text-xs sm:text-sm text-[#B8F5FF]">
              Last updated: {LAST_UPDATED}
            </p>
            <div className="privacy-divider mt-6 mb-10" aria-hidden="true" />

            <nav className="privacy-toc mb-10" aria-label="Page sections">
              <p className="privacy-toc-label text-[10px] tracking-[0.2em] uppercase text-[#40F0D8] mb-3">
                Contents
              </p>
              <ol className="privacy-toc-list text-sm text-[#B8F5FF] space-y-1.5">
                <li><a href="#introduction">1. Introduction</a></li>
                <li><a href="#information-collected">2. Information We Collect</a></li>
                <li><a href="#how-we-use">3. How We Use Your Information</a></li>
                <li><a href="#data-sharing">4. Data Sharing and Third Parties</a></li>
                <li><a href="#cookies">5. Cookies and Analytics</a></li>
                <li><a href="#data-security">6. Data Security</a></li>
                <li><a href="#user-rights">7. User Rights</a></li>
                <li><a href="#copyright">8. Copyright &amp; Intellectual Property</a></li>
                <li><a href="#disclaimer">9. Disclaimer &amp; No Medical Advice</a></li>
                <li><a href="#changes">10. Changes to This Policy</a></li>
                <li><a href="#contact">11. Contact</a></li>
              </ol>
            </nav>

            <div className="privacy-content text-[#E0F7FF] text-sm sm:text-[0.95rem] leading-relaxed tracking-[-0.01em] space-y-10">
              <PrivacySection id="introduction" title="1. Introduction">
                <p>
                  This Privacy &amp; Legal page (&quot;Policy&quot;) governs your access to and use of
                  the Awake OS website located at{' '}
                  <a href="https://awake-os.com" className="privacy-inline-link">
                    awake-os.com
                  </a>{' '}
                  (the &quot;Site&quot;), the Awake OS book and related materials (the
                  &quot;Content&quot;), and any beta access program operated by Ariel Uri and Somatic
                  Labs Publishing (collectively, &quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;).
                </p>
                <p>
                  By accessing the Site, submitting information through our forms, joining the Beta
                  program, or using any Content, you acknowledge that you have read, understood, and
                  agree to be bound by this Policy in its entirety. If you do not agree, you must
                  discontinue use of the Site and Content immediately.
                </p>
                <p>
                  This Policy is designed to comply with applicable data protection principles,
                  including those reflected in the General Data Protection Regulation (GDPR) and the
                  Lei Geral de Proteção de Dados (LGPD), to the extent they apply to our processing
                  activities. Nothing in this Policy constitutes legal advice to you.
                </p>
              </PrivacySection>

              <PrivacySection id="information-collected" title="2. Information We Collect">
                <p>We may collect the following categories of information:</p>
                <ul className="privacy-list">
                  <li>
                    <strong className="text-[#FFFFFF]">Beta registration data:</strong> When you
                    request Beta access, we collect your <strong>name</strong> and{' '}
                    <strong>email address</strong> as voluntarily submitted through the Site&apos;s
                    registration form.
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Technical and usage data:</strong> Browser
                    type, device information, IP address, referring URLs, pages viewed, timestamps,
                    and similar diagnostic data collected automatically when you interact with the
                    Site.
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Local storage data:</strong> The Site may
                    store limited preferences or session-related data in your browser (e.g.,
                    localStorage) to support functionality and user experience.
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Communications:</strong> Any correspondence
                    you send to us, including inquiries, support requests, or legal notices.
                  </li>
                </ul>
                <p>
                  You represent and warrant that all information you provide is accurate, current,
                  and complete. You are solely responsible for any information you submit. We do not
                  knowingly collect personal data from individuals under 18 years of age. If you
                  believe a minor has provided data, contact us immediately.
                </p>
              </PrivacySection>

              <PrivacySection id="how-we-use" title="3. How We Use Your Information">
                <p>
                  We process personal data only where we have a lawful basis to do so, including
                  consent, legitimate interests, contractual necessity, or legal obligation. We may
                  use your information to:
                </p>
                <ul className="privacy-list">
                  <li>Evaluate, approve, or manage Beta access requests;</li>
                  <li>Deliver access links, updates, and communications related to Awake OS;</li>
                  <li>Operate, maintain, secure, and improve the Site and Content;</li>
                  <li>Respond to inquiries and enforce our rights under this Policy;</li>
                  <li>Comply with applicable laws, regulations, and lawful requests;</li>
                  <li>Detect, prevent, and address fraud, abuse, or security incidents.</li>
                </ul>
                <p>
                  By submitting your name and email for Beta access, you expressly consent to such
                  processing. You may withdraw consent at any time by contacting us; however,
                  withdrawal does not affect the lawfulness of processing prior to withdrawal and may
                  result in termination of Beta access.
                </p>
                <p>
                  We do <strong className="text-[#FFFFFF]">not</strong> sell, rent, or trade your
                  personal data. We do not use your data for automated decision-making that produces
                  legal or similarly significant effects without human review.
                </p>
              </PrivacySection>

              <PrivacySection id="data-sharing" title="4. Data Sharing and Third Parties">
                <p>
                  We do not share your personal data with third parties except in the limited
                  circumstances described below. Any sharing is conducted under appropriate
                  safeguards and only to the extent necessary:
                </p>
                <ul className="privacy-list">
                  <li>
                    <strong className="text-[#FFFFFF]">Service providers:</strong> Trusted vendors
                    who assist with hosting, email delivery, analytics, or infrastructure, bound by
                    confidentiality and data-processing obligations;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Beta fulfillment partners:</strong> Platforms
                    used to distribute review copies or manage early access (e.g., digital
                    publishing or reviewer platforms), solely to fulfill your Beta request;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Legal requirements:</strong> When required
                    by law, court order, governmental authority, or to protect our rights, safety,
                    or property;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Business transfers:</strong> In connection
                    with a merger, acquisition, or asset sale, subject to continued protection of
                    your data.
                  </li>
                </ul>
                <p>
                  Third-party websites linked from the Site (including external review or access
                  platforms) are governed by their own privacy policies. We are not responsible for
                  the practices, content, or security of any third-party site or service. Your use
                  of third-party links is at your sole risk.
                </p>
              </PrivacySection>

              <PrivacySection id="cookies" title="5. Cookies and Analytics">
                <p>
                  The Site may use cookies, local storage, session storage, and similar technologies
                  to enable core functionality, remember preferences, and understand aggregate usage
                  patterns.
                </p>
                <ul className="privacy-list">
                  <li>
                    <strong className="text-[#FFFFFF]">Essential technologies:</strong> Required
                    for basic Site operation and security;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Analytics (if enabled):</strong> Anonymous or
                    pseudonymous metrics to improve performance and user experience.
                  </li>
                </ul>
                <p>
                  You may control cookies through your browser settings. Disabling certain
                  technologies may impair Site functionality. Where required by law, we will obtain
                  consent before placing non-essential cookies.
                </p>
                <p>
                  We do not use cookies or tracking technologies to build profiles for third-party
                  advertising without your explicit consent.
                </p>
              </PrivacySection>

              <PrivacySection id="data-security" title="6. Data Security">
                <p>
                  We implement reasonable administrative, technical, and organizational measures
                  designed to protect personal data against unauthorized access, alteration,
                  disclosure, or destruction. These measures may include encryption in transit,
                  access controls, and secure hosting environments.
                </p>
                <p>
                  <strong className="text-[#FFFFFF]">
                    No method of transmission or storage is 100% secure.
                  </strong>{' '}
                  While we strive to protect your information, we cannot and do not guarantee
                  absolute security. You acknowledge and accept that you provide information at your
                  own risk. We disclaim all liability for unauthorized access, data breaches, or
                  security incidents beyond our reasonable control.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of any access credentials
                  or links provided to you. Notify us immediately at{' '}
                  <a href="mailto:privacy@awake-os.com" className="privacy-inline-link">
                    privacy@awake-os.com
                  </a>{' '}
                  if you suspect unauthorized use of your information.
                </p>
              </PrivacySection>

              <PrivacySection id="user-rights" title="7. User Rights (LGPD / GDPR)">
                <p>
                  Depending on your jurisdiction, you may have the following rights regarding your
                  personal data. Requests may be subject to identity verification and legal
                  limitations:
                </p>
                <ul className="privacy-list">
                  <li>
                    <strong className="text-[#FFFFFF]">Access:</strong> Request confirmation of
                    whether we process your data and obtain a copy;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Rectification:</strong> Request correction of
                    inaccurate or incomplete data;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Erasure:</strong> Request deletion of your
                    data, subject to legal retention obligations;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Restriction:</strong> Request limitation of
                    processing in certain circumstances;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Portability:</strong> Receive your data in a
                    structured, commonly used format where technically feasible;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Objection:</strong> Object to processing
                    based on legitimate interests;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Withdraw consent:</strong> Where processing
                    is consent-based, withdraw consent at any time;
                  </li>
                  <li>
                    <strong className="text-[#FFFFFF]">Complaint:</strong> Lodge a complaint with
                    your local data protection authority (e.g., ANPD in Brazil or your EU supervisory
                    authority).
                  </li>
                </ul>
                <p>
                  To exercise any right, contact{' '}
                  <a href="mailto:privacy@awake-os.com" className="privacy-inline-link">
                    privacy@awake-os.com
                  </a>
                  . We will respond within the timeframe required by applicable law. We reserve the
                  right to deny requests that are manifestly unfounded, excessive, or prohibited by
                  law.
                </p>
                <p>
                  International users acknowledge that data may be processed in jurisdictions with
                  different data protection standards. Where required, we implement appropriate
                  safeguards for cross-border transfers.
                </p>
              </PrivacySection>

              <PrivacySection id="copyright" title="8. Copyright & Intellectual Property">
                <p>
                  Copyright © 2026 Ariel Uri. All rights reserved.
                  <br />
                  AWAKE OS™ is a pending trademark.
                  <br />
                  Published by Somatic Labs Publishing.
                </p>
                <p>
                  No part of this book may be reproduced in any form or by any electronic or
                  mechanical means, including information storage and retrieval systems, without
                  written permission from the author, except for the use of brief quotations in a
                  book review. No part of this publication may be used or reproduced for the purpose
                  of training artificial intelligence technologies or machine learning models without
                  express written permission from the publisher.
                </p>
                <p>
                  All stories in this book are true. Names and minor identifying details have been
                  changed to protect privacy, but the events, timelines, and outcomes happened
                  exactly as described.
                </p>
                <p>
                  All Content on this Site — including text, graphics, logos, book covers, images,
                  software, and the Awake OS name and branding — is the exclusive property of Ariel
                  Uri and/or Somatic Labs Publishing and is protected by international copyright,
                  trademark, and intellectual property laws. Unauthorized reproduction, distribution,
                  modification, public display, scraping, or derivative use of any Content is strictly
                  prohibited and may result in civil and criminal liability.
                </p>
                <p className="privacy-meta text-[#B8F5FF]">
                  First Edition: April 2026
                  <br />
                  Paperback ISBN: 978-84-09-85373-1
                </p>
              </PrivacySection>

              <PrivacySection id="disclaimer" title="9. Disclaimer & No Medical Advice">
                <p>
                  <span className="text-[#40F0D8] font-medium">Disclaimer:</span> This book is
                  intended for informational and educational purposes only. It is not a substitute
                  for professional medical advice, diagnosis, or treatment. Always seek the advice of
                  your physician or other qualified health provider with any questions you may have
                  regarding a medical condition. The author and publisher seek to ensure that the
                  information in this book is accurate and current, but they accept no liability
                  for any loss, damage, or injury arising from the use of this information. By
                  reading this book, the reader agrees that under no circumstances is the author or
                  publisher responsible for any losses, direct or indirect, that are incurred as a
                  result of the use of information contained within this document, including, but not
                  limited to, errors, omissions, or inaccuracies. Furthermore, the exercises and
                  concepts described in this book may bring up strong emotions or past traumas. If
                  you feel overwhelmed, stop immediately and consult a licensed mental health
                  professional. The author assumes no responsibility for any emotional,
                  psychological, or physical distress resulting from the application of these
                  methods.
                </p>
                <p>
                  <strong className="text-[#FFFFFF]">Additional limitations:</strong> The Site,
                  Content, and Beta program are provided on an &quot;AS IS&quot; and &quot;AS
                  AVAILABLE&quot; basis without warranties of any kind, whether express, implied, or
                  statutory, including but not limited to warranties of merchantability, fitness for
                  a particular purpose, accuracy, non-infringement, or uninterrupted availability.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, Ariel Uri, Somatic Labs
                  Publishing, and their officers, employees, agents, and affiliates shall not be
                  liable for any direct, indirect, incidental, special, consequential, exemplary, or
                  punitive damages arising from or related to your use of the Site, Content, or Beta
                  program — including loss of profits, data, goodwill, or personal injury — even if
                  advised of the possibility of such damages.
                </p>
                <p>
                  You agree to indemnify, defend, and hold harmless Ariel Uri and Somatic Labs
                  Publishing from any claims, damages, losses, liabilities, and expenses (including
                  reasonable legal fees) arising from your use of the Site or Content, your violation
                  of this Policy, or your infringement of any third-party rights.
                </p>
              </PrivacySection>

              <PrivacySection id="changes" title="10. Changes to This Policy">
                <p>
                  We reserve the right to modify, amend, or replace this Policy at any time, in our
                  sole discretion, without prior notice. Changes become effective upon posting to
                  this page with an updated &quot;Last updated&quot; date.
                </p>
                <p>
                  Your continued use of the Site or Content after any modification constitutes your
                  binding acceptance of the revised Policy. If you do not agree to the updated
                  Policy, you must cease all use immediately.
                </p>
                <p>
                  We encourage you to review this page periodically. Material changes affecting your
                  rights may, where required by law, be communicated via email or prominent Site
                  notice.
                </p>
              </PrivacySection>

              <PrivacySection id="contact" title="11. Contact">
                <p>
                  For privacy requests, legal inquiries, copyright permissions, or any questions
                  regarding this Policy, contact:
                </p>
                <div className="privacy-contact-card">
                  <p className="text-[#FFFFFF] font-medium">Somatic Labs Publishing</p>
                  <p>Attn: Ariel Uri — Privacy &amp; Legal</p>
                  <p>
                    Email:{' '}
                    <a href="mailto:privacy@awake-os.com" className="privacy-inline-link">
                      privacy@awake-os.com
                    </a>
                  </p>
                  <p>
                    Website:{' '}
                    <a href="https://awake-os.com" className="privacy-inline-link">
                      https://awake-os.com
                    </a>
                  </p>
                </div>
                <p>
                  We aim to respond to all legitimate inquiries within 30 days, or sooner where
                  required by applicable data protection law.
                </p>
              </PrivacySection>
            </div>

            <div className="mt-12 pt-8 border-t border-[rgba(0,229,192,0.2)]">
              <Link href="/" className="privacy-home-link inline-flex items-center gap-2 text-sm font-medium">
                ← Return to Awake OS
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer border-t border-[rgba(0,229,192,0.28)] mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 text-center">
          <p className="site-footer-copy text-xs text-[#B8F5FF]">
            Copyright © 2026 Ariel Uri / Somatic Labs Publishing. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}