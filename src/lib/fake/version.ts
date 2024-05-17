import { Author } from '../validations/author';

export const versionChanges: Array<{
  author: Author;
  changes: {
    changesMsg: string;
    downloadUrl: string;
    updatedAt: Date;
  };
}> = [
  {
    author: {
      fullName: 'Emily Johnson',
      id: 'a1b2c3d4-e5f6-g7h8-i9j0-klmnopqrstuv',
      bio: "Passionate children's book author and illustrator",
      role: 'owner',
      avatarImg: '/imgs/avatar-1.png',
      facebookUrl: 'https://www.facebook.com/emilyj.author',
      portfolioUrl: 'https://emilyj.com',
      instagramUrl: 'https://www.instagram.com/emilyj_author',
      interests: ['writing', 'illustration', 'storytelling'],
    },
    changes: {
      changesMsg: 'Added new illustrations and updated the story flow',
      downloadUrl: 'https://example.com/updates/magical-adventures-v2.0.epub',
      updatedAt: new Date('2024-04-20T14:30:00Z'),
    },
  },
  {
    author: {
      fullName: 'Michael Brown',
      id: 'w9x8y7z6-5a4b-3c2d-1e0f-ghijklmnopqr',
      bio: 'Experienced non-fiction author and researcher',
      role: 'contributor',
      avatarImg: '/imgs/avatar-2.png',
      facebookUrl: undefined,
      portfolioUrl: 'https://michaelbrown.com',
      instagramUrl: undefined,
      interests: ['history', 'science', 'research'],
    },
    changes: {
      changesMsg:
        'Updated content with new research findings and added a new chapter',
      downloadUrl: 'https://example.com/updates/ancient-civilizations-v3.2.pdf',
      updatedAt: new Date('2024-03-10T09:00:00Z'),
    },
  },
  {
    author: {
      fullName: 'Sarah Davis',
      id: 'st7u6v5w-x4y3-z2a1-b0c9-d8e7f6g5h4i3',
      bio: 'Bestselling fiction author and creative writing mentor',
      role: 'owner',
      avatarImg: '/imgs/avatar-3.png',
      facebookUrl: undefined,
      portfolioUrl: 'https://sarahdavis.com',
      instagramUrl: 'https://www.instagram.com/sarahdavis_author',
      interests: ['writing', 'literature', 'storytelling'],
    },
    changes: {
      changesMsg: 'Revised the ending and updated character descriptions',
      downloadUrl: 'https://example.com/updates/the-lost-city-v1.5.epub',
      updatedAt: new Date('2024-02-15T16:45:00Z'),
    },
  },
  {
    author: {
      fullName: 'David Wilson',
      id: 'j2k1l0m9-n8o7-p6q5-r4s3-t2u1v0wxyz01',
      bio: 'Renowned science writer and educator',
      role: 'contributor',
      avatarImg: '/imgs/avatar-4.png',
      facebookUrl: 'https://www.facebook.com/davidwilson.author',
      portfolioUrl: undefined,
      instagramUrl: undefined,
      interests: ['science', 'technology', 'education'],
    },
    changes: {
      changesMsg:
        'Added new interactive elements and updated scientific content',
      downloadUrl:
        'https://example.com/updates/exploring-the-universe-v4.0.zip',
      updatedAt: new Date('2024-01-25T10:15:00Z'),
    },
  },
  {
    author: {
      fullName: 'Jessica Thompson',
      id: '23ab45cd-67ef-89gh-ijkl-mnop01qr23st',
      bio: 'Bestselling self-help author and life coach',
      role: 'owner',
      avatarImg: '/imgs/avatar.png',
      facebookUrl: undefined,
      portfolioUrl: 'https://jessicathompson.com',
      instagramUrl: 'https://www.instagram.com/jessica.thompson.author',
      interests: ['self-improvement', 'mindfulness', 'personal growth'],
    },
    changes: {
      changesMsg:
        'Added new exercises and updated the content based on reader feedback',
      downloadUrl:
        'https://example.com/updates/unlocking-your-potential-v2.3.pdf',
      updatedAt: new Date('2023-12-01T18:30:00Z'),
    },
  },
  {
    author: {
      fullName: 'Robert Anderson',
      id: 'uv45wx67-yz89-ab01-cd23-ef45gh67ij89',
      bio: 'Award-winning poet and creative writing instructor',
      role: 'contributor',
      avatarImg: '/imgs/hero-1.png',
      facebookUrl: 'https://www.facebook.com/robert.anderson.poet',
      portfolioUrl: undefined,
      instagramUrl: 'https://www.instagram.com/robert_anderson_poetry',
      interests: ['poetry', 'literature', 'creative writing'],
    },
    changes: {
      changesMsg: 'Added new poems and revised existing content',
      downloadUrl: 'https://example.com/updates/whispers-of-the-soul-v1.2.epub',
      updatedAt: new Date('2023-11-10T12:00:00Z'),
    },
  },
] as const;
