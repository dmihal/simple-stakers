import React from 'react';
import Head from 'next/head';
import { TITLE, TAGLINE } from '../constants';

const SocialTags: React.FC = () => {
  return (
    <Head>
      <meta property="og:title" content={TITLE} />
      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/social/top.png`}
      />
      <meta property="og:description" content={TAGLINE} />

      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={TAGLINE} />
      <meta
        name="twitter:image"
        content={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/social/top.png?${new Date().getDate()}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SocialTags;
