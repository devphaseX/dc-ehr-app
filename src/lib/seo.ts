import { Metadata } from 'next';
import { env } from './env';

export const APP_NAME = 'dc-ehr';
export const APP_DESCRIPTION = '';

export const baseMetadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },

  ...(env.NEXT_PUBLIC_BASE_URL && {
    metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  }),
  description: APP_DESCRIPTION,
  creator: '',
  authors: [{ name: 'Ayomide Lawal' }],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: APP_NAME,
    siteName: APP_NAME,
    description: APP_DESCRIPTION,
    // images: [
    //   {
    //     url: `${env.NEXT_PUBLIC_BASE_URL}/media/og.jpg`,
    //     alt: APP_NAME,
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
};

export function getPageMetadata(metadata: Metadata): Metadata {
  const metadataTitle = metadata.title as string | null | undefined;
  return {
    ...metadata,
    description: metadata.description ?? baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      ...metadata.openGraph,
      title: `${metadataTitle} | ${APP_NAME}`,
      description: metadata.description ?? baseMetadata.openGraph?.description,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...metadata.twitter,
      title: `${metadataTitle} | ${APP_NAME}`,
      description: metadata.description ?? baseMetadata.twitter?.description,
    },
  };
}
