import type { PrivacyDoc } from './types';

export const privacyEn: PrivacyDoc = {
  lastUpdated: 'July 23, 2026',
  legalLabel: 'LEGAL',
  contentsLabel: 'Contents',
  metaDescription:
    'Privacy Policy, data protection, copyright, and legal disclaimers for Awake OS by Ariel Uri · Somatic Labs Publishing.',
  footerCopy: 'Copyright © 2026 Ariel Uri / Somatic Labs Publishing. All rights reserved.',
  contactOrg: 'Somatic Labs Publishing',
  contactAttn: 'Attn: Ariel Uri — Privacy & Legal',
  emailLabel: 'Email',
  websiteLabel: 'Website',
  toc: [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'information-collected', label: '2. Information We Collect' },
    { id: 'how-we-use', label: '3. How We Use Your Information' },
    { id: 'data-sharing', label: '4. Data Sharing and Third Parties' },
    { id: 'cookies', label: '5. Cookies and Analytics' },
    { id: 'data-security', label: '6. Data Security' },
    { id: 'user-rights', label: '7. User Rights' },
    { id: 'copyright', label: '8. Copyright & Intellectual Property' },
    { id: 'disclaimer', label: '9. Disclaimer & No Medical Advice' },
    { id: 'changes', label: '10. Changes to This Policy' },
    { id: 'contact', label: '11. Contact' },
  ],
  sections: [
    {
      id: 'introduction',
      title: '1. Introduction',
      blocks: [
        {
          type: 'p',
          text: 'This Privacy & Legal page ("Policy") governs your access to and use of the Awake OS website located at {{site}} (the "Site"), the Awake OS book and related materials (the "Content"), and any pre-launch list operated by Ariel Uri and Somatic Labs Publishing (collectively, "we," "us," or "our").',
        },
        {
          type: 'p',
          text: 'By accessing the Site, submitting information through our forms, joining the pre-launch list, or using any Content, you acknowledge that you have read, understood, and agree to be bound by this Policy in its entirety. If you do not agree, you must discontinue use of the Site and Content immediately.',
        },
        {
          type: 'p',
          text: 'This Policy is designed to comply with applicable data protection principles, including those reflected in the General Data Protection Regulation (GDPR) and the Lei Geral de Proteção de Dados (LGPD), to the extent they apply to our processing activities. Nothing in this Policy constitutes legal advice to you.',
        },
      ],
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      blocks: [
        { type: 'p', text: 'We may collect the following categories of information:' },
        {
          type: 'list',
          items: [
            {
              label: 'Pre-launch registration data:',
              text: 'When you join the pre-launch list, we collect your name and email address as voluntarily submitted through the Site\'s registration form.',
            },
            {
              label: 'Technical and usage data:',
              text: 'Browser type, device information, IP address, referring URLs, pages viewed, timestamps, and similar diagnostic data collected automatically when you interact with the Site (including, where consented, aggregate analytics).',
            },
            {
              label: 'Local storage data:',
              text: 'The Site may store limited preferences or session-related data in your browser (e.g., localStorage) to support functionality, language choice, and cookie consent memory.',
            },
            {
              label: 'Communications:',
              text: 'Any correspondence you send to us, including inquiries, support requests, or legal notices.',
            },
          ],
        },
        {
          type: 'p',
          text: 'You represent and warrant that all information you provide is accurate, current, and complete. You are solely responsible for any information you submit. We do not knowingly collect personal data from individuals under 18 years of age. If you believe a minor has provided data, contact us immediately.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      blocks: [
        {
          type: 'p',
          text: 'We process personal data only where we have a lawful basis to do so, including consent, legitimate interests, contractual necessity, or legal obligation. We may use your information to:',
        },
        {
          type: 'list',
          items: [
            { text: 'Manage the pre-launch list and launch communications;' },
            { text: 'Deliver updates and communications related to Awake OS;' },
            { text: 'Operate, maintain, secure, and improve the Site and Content;' },
            { text: 'Measure aggregate site traffic and behavior (where analytics consent is given);' },
            { text: 'Respond to inquiries and enforce our rights under this Policy;' },
            { text: 'Comply with applicable laws, regulations, and lawful requests;' },
            { text: 'Detect, prevent, and address fraud, abuse, or security incidents.' },
          ],
        },
        {
          type: 'p',
          text: 'By submitting your name and email for the pre-launch list, you expressly consent to such processing. You may withdraw consent at any time by contacting us; however, withdrawal does not affect the lawfulness of processing prior to withdrawal and may result in removal from the list.',
        },
        {
          type: 'p',
          text: 'We do **not** sell, rent, or trade your personal data. We do not use your data for automated decision-making that produces legal or similarly significant effects without human review.',
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '4. Data Sharing and Third Parties',
      blocks: [
        {
          type: 'p',
          text: 'We do not share your personal data with third parties except in the limited circumstances described below. Any sharing is conducted under appropriate safeguards and only to the extent necessary.',
        },
        {
          type: 'p',
          text: 'We use the following service providers / data processors:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Google Analytics 4 (GA4):',
              text: 'Used for aggregate traffic and site behavior analysis, only when you allow analytics cookies through the Site\'s cookie consent banner.',
            },
            {
              label: 'Google Sheets / Google Apps Script:',
              text: 'Used to store pre-launch list leads (name and email) submitted through the registration form.',
            },
            {
              label: 'Vercel:',
              text: 'Website hosting and delivery infrastructure for the Site.',
            },
            {
              label: 'Other service providers:',
              text: 'Trusted vendors who may assist with email delivery or related infrastructure, bound by confidentiality and data-processing obligations;',
            },
            {
              label: 'Launch partners:',
              text: 'Platforms used to distribute the book or manage early access (e.g., digital publishing platforms), solely to fulfill launch-related requests;',
            },
            {
              label: 'Legal requirements:',
              text: 'When required by law, court order, governmental authority, or to protect our rights, safety, or property;',
            },
            {
              label: 'Business transfers:',
              text: 'In connection with a merger, acquisition, or asset sale, subject to continued protection of your data.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Third-party websites linked from the Site are governed by their own privacy policies. We are not responsible for the practices, content, or security of any third-party site or service. Your use of third-party links is at your sole risk.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '5. Cookies and Analytics',
      blocks: [
        {
          type: 'p',
          text: 'The Site may use cookies, local storage, session storage, and similar technologies to enable core functionality, remember preferences, store cookie consent, and — only if you allow — understand aggregate usage patterns via Google Analytics 4.',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Necessary:',
              text: 'Required for basic Site operation, security, language preference, and remembering your cookie choice on this device.',
            },
            {
              label: 'Analytics (optional):',
              text: 'Google Analytics 4 for aggregate traffic and site behavior analysis. Loaded only if you select "Accept all cookies" or "Accept only necessary cookies" in the consent banner (both options currently enable analytics). If you refuse all cookies, analytics scripts are not loaded.',
            },
          ],
        },
        {
          type: 'p',
          text: 'You can change your browser settings to block cookies; some Site features may be affected. Non-essential analytics are presented through our cookie consent interface before load, consistent with applicable law.',
        },
        {
          type: 'p',
          text: 'We do not use cookies or tracking technologies to build profiles for third-party advertising without your explicit consent.',
        },
      ],
    },
    {
      id: 'data-security',
      title: '6. Data Security',
      blocks: [
        {
          type: 'p',
          text: 'We implement reasonable administrative, technical, and organizational measures designed to protect personal data against unauthorized access, alteration, disclosure, or destruction. These measures may include encryption in transit, access controls, and secure hosting environments.',
        },
        {
          type: 'p',
          text: '**No method of transmission or storage is 100% secure.** While we strive to protect your information, we cannot and do not guarantee absolute security. You acknowledge and accept that you provide information at your own risk. We disclaim all liability for unauthorized access, data breaches, or security incidents beyond our reasonable control.',
        },
        {
          type: 'p',
          text: 'You are responsible for maintaining the confidentiality of any access credentials or links provided to you. Notify us immediately at {{email}} if you suspect unauthorized use of your information.',
        },
      ],
    },
    {
      id: 'user-rights',
      title: '7. User Rights (LGPD / GDPR)',
      blocks: [
        {
          type: 'p',
          text: 'Depending on your jurisdiction, you may have the following rights regarding your personal data. Requests may be subject to identity verification and legal limitations:',
        },
        {
          type: 'list',
          items: [
            {
              label: 'Access:',
              text: 'Request confirmation of whether we process your data and obtain a copy;',
            },
            {
              label: 'Rectification:',
              text: 'Request correction of inaccurate or incomplete data;',
            },
            {
              label: 'Erasure:',
              text: 'Request deletion of your data, subject to legal retention obligations;',
            },
            {
              label: 'Restriction:',
              text: 'Request limitation of processing in certain circumstances;',
            },
            {
              label: 'Portability:',
              text: 'Receive your data in a structured, commonly used format where technically feasible;',
            },
            {
              label: 'Objection:',
              text: 'Object to processing based on legitimate interests;',
            },
            {
              label: 'Withdraw consent:',
              text: 'Where processing is consent-based, withdraw consent at any time;',
            },
            {
              label: 'Complaint:',
              text: 'Lodge a complaint with your local data protection authority (e.g., ANPD in Brazil or your EU supervisory authority).',
            },
          ],
        },
        {
          type: 'p',
          text: 'To exercise any right, contact {{email}}. We will respond within the timeframe required by applicable law. We reserve the right to deny requests that are manifestly unfounded, excessive, or prohibited by law.',
        },
        {
          type: 'p',
          text: 'International users acknowledge that data may be processed in jurisdictions with different data protection standards. Where required, we implement appropriate safeguards for cross-border transfers.',
        },
      ],
    },
    {
      id: 'copyright',
      title: '8. Copyright & Intellectual Property',
      blocks: [
        {
          type: 'p',
          text: 'Copyright © 2026 Ariel Uri. All rights reserved.\nAWAKE OS™ is a pending trademark.\nPublished by Somatic Labs Publishing.',
        },
        {
          type: 'p',
          text: 'No part of this book may be reproduced in any form or by any electronic or mechanical means, including information storage and retrieval systems, without written permission from the author, except for the use of brief quotations in a book review. No part of this publication may be used or reproduced for the purpose of training artificial intelligence technologies or machine learning models without express written permission from the publisher.',
        },
        {
          type: 'p',
          text: 'All stories in this book are true. Names and minor identifying details have been changed to protect privacy, but the events, timelines, and outcomes happened exactly as described.',
        },
        {
          type: 'p',
          text: 'All Content on this Site — including text, graphics, logos, book covers, images, software, and the Awake OS name and branding — is the exclusive property of Ariel Uri and/or Somatic Labs Publishing and is protected by international copyright, trademark, and intellectual property laws. Unauthorized reproduction, distribution, modification, public display, scraping, or derivative use of any Content is strictly prohibited and may result in civil and criminal liability.',
        },
        {
          type: 'meta',
          lines: ['First Edition: April 2026', 'Paperback ISBN: 978-84-09-85373-1'],
        },
      ],
    },
    {
      id: 'disclaimer',
      title: '9. Disclaimer & No Medical Advice',
      blocks: [
        {
          type: 'p',
          text: '**Awake OS is not medical, psychological, or therapeutic advice.** The book, Site, and related materials are educational tools for personal development and self-observation. They are **not** a substitute for diagnosis, treatment, therapy, or care from a licensed physician, psychologist, psychiatrist, or other qualified healthcare professional.',
        },
        {
          type: 'p',
          text: 'Nothing in Awake OS is intended to diagnose, treat, cure, or prevent any disease or mental health condition. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical or psychological condition. Never disregard professional medical advice or delay seeking it because of something you read in the Content.',
        },
        {
          type: 'p',
          text: 'The exercises, protocols, metaphors, and concepts in Awake OS (including nervous-system, software/hardware, and contemplative frames) are offered for **educational and personal-development purposes only**. They may bring up strong emotions, memories, or physical sensations. If you feel overwhelmed, stop immediately and consult a licensed mental health or medical professional.',
        },
        {
          type: 'p',
          text: '**You are solely responsible** for how you apply, interpret, or ignore any part of the Content. You decide what is appropriate for your body, mind, and circumstances. The author and publisher accept no liability for any loss, damage, injury, or distress — emotional, psychological, or physical — arising from your use or misuse of the information, exercises, or ideas presented.',
        },
        {
          type: 'p',
          text: 'By reading the book or using the Site, you agree that under no circumstances are Ariel Uri, Somatic Labs Publishing, or their affiliates responsible for losses, direct or indirect, incurred as a result of the Content, including errors, omissions, or inaccuracies.',
        },
        {
          type: 'p',
          text: '**Additional limitations:** The Site, Content, and pre-launch list are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, non-infringement, or uninterrupted availability.',
        },
        {
          type: 'p',
          text: 'To the maximum extent permitted by applicable law, Ariel Uri, Somatic Labs Publishing, and their officers, employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, exemplary, or punitive damages arising from or related to your use of the Site, Content, or pre-launch list — including loss of profits, data, goodwill, or personal injury — even if advised of the possibility of such damages.',
        },
        {
          type: 'p',
          text: 'You agree to indemnify, defend, and hold harmless Ariel Uri and Somatic Labs Publishing from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from your use of the Site or Content, your violation of this Policy, or your infringement of any third-party rights.',
        },
      ],
    },
    {
      id: 'changes',
      title: '10. Changes to This Policy',
      blocks: [
        {
          type: 'p',
          text: 'We reserve the right to modify, amend, or replace this Policy at any time, in our sole discretion, without prior notice. Changes become effective upon posting to this page with an updated "Last updated" date.',
        },
        {
          type: 'p',
          text: 'Your continued use of the Site or Content after any modification constitutes your binding acceptance of the revised Policy. If you do not agree to the updated Policy, you must cease all use immediately.',
        },
        {
          type: 'p',
          text: 'We encourage you to review this page periodically. Material changes affecting your rights may, where required by law, be communicated via email or prominent Site notice.',
        },
      ],
    },
    {
      id: 'contact',
      title: '11. Contact',
      blocks: [
        {
          type: 'p',
          text: 'For privacy requests, legal inquiries, copyright permissions, or any questions regarding this Policy, contact:',
        },
        { type: 'contact' },
        {
          type: 'p',
          text: 'We aim to respond to all legitimate inquiries within 30 days, or sooner where required by applicable data protection law.',
        },
      ],
    },
  ],
};
