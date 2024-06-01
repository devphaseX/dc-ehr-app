import { CourseItem } from '../validations/course';

export const courseSamples: CourseItem[] = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Introduction to Web Development',
    releasedVersions: 12,
    bannerImgUrl: '/imgs/bg/1.png',
    authorName: 'Jane Doe',
    createdAt: new Date('2023-03-15T10:30:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2023-05-01T14:20:00Z'),
  },
  {
    id: '3c204586-8c37-4a4b-9d06-0a7b6371dcf4',
    title: 'Advanced React Patterns',
    releasedVersions: 21,
    bannerImgUrl: '/imgs/bg/2.png',
    authorName: 'John Smith',
    createdAt: new Date('2022-11-22T08:15:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2024-02-10T16:45:00Z'),
  },
  {
    id: 'c6e7f8a9-1b7c-4a33-9b35-1d2c1e6d8e3a',
    title: 'Machine Learning with Python',
    releasedVersions: 30,
    bannerImgUrl: '/imgs/bg/3.png',
    authorName: 'Alice Johnson',
    createdAt: new Date('2023-07-01T12:00:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2024-04-20T09:30:00Z'),
  },
  {
    id: '6a9b7e5d-f0d3-4d77-9a95-2d83e7a6e1c9',
    title: 'Mastering SQL Databases',
    releasedVersions: 25,
    bannerImgUrl: '/imgs/bg/4.png',
    authorName: 'Bob Williams',
    createdAt: new Date('2022-09-10T06:45:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2023-12-25T18:00:00Z'),
  },
  {
    id: 'f7b7e7d7-f9c5-4eca-9b62-d37c1eba7f9c',
    title: 'Ethical Hacking Fundamentals',
    releasedVersions: 18,
    bannerImgUrl: '/imgs/bg/5.png',
    authorName: 'Samantha Brown',
    createdAt: new Date('2023-04-01T14:30:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: 'b9d7f6e8-f1d7-4e95-9e97-d14e6c5c63e3',
    title: 'Blockchain and Cryptocurrency Essentials',
    releasedVersions: 32,
    bannerImgUrl: '/imgs/bg/6.png',
    authorName: 'David Lee',
    createdAt: new Date('2022-06-20T09:00:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2024-03-01T12:15:00Z'),
  },
  {
    id: 'e6b7c3d1-f2d5-4b9a-9e8d-d7c6e9f6e3d1',
    title: 'Mastering Angular Framework',
    releasedVersions: 27,
    bannerImgUrl: '/imgs/bg/7.png',
    authorName: 'Emily Wilson',
    createdAt: new Date('2023-01-05T16:20:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2024-04-10T08:45:00Z'),
  },
  {
    id: 'a2b7c3d4-e5f6-4g7h-8i9j-k1l2m3n4o5p6',
    title: 'Cloud Computing with AWS',
    releasedVersions: 41,
    bannerImgUrl: '/imgs/bg/8.png',
    authorName: 'Michael Davis',
    createdAt: new Date('2022-08-15T11:30:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2024-05-01T14:00:00Z'),
  },
  {
    id: 'q2w3e4r5t6y7u8i9o0p0a1s2d3f4g5h6j7k8',
    title: 'Intro to Data Visualization with D3.js',
    releasedVersions: 15,
    bannerImgUrl: '/imgs/bg/9.png',
    authorName: 'Sophia Martinez',
    createdAt: new Date('2023-06-10T07:45:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2023-11-20T18:30:00Z'),
  },
  {
    id: 'z9x8c7v6b5n4m3l2k1j0i9h8g7f6e5d4c3b2a1',
    title: 'Mastering Git and GitHub',
    releasedVersions: 23,
    bannerImgUrl: '/imgs/bg/10.png',
    authorName: 'William Thompson',
    createdAt: new Date('2022-12-01T13:15:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2024-02-28T10:00:00Z'),
  },
  {
    id: 'p9o8i7u6y5t4r3e2w1q9a8z7x6c5v4b3n2m1l0',
    title: 'Cyber Security Fundamentals',
    releasedVersions: 37,
    bannerImgUrl: '/imgs/bg/11.png',
    authorName: 'Olivia Anderson',
    createdAt: new Date('2023-02-20T09:30:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2024-04-15T16:45:00Z'),
  },
  {
    id: 'k9l8m7n6o5p4q3r2s1t0u9v8w7x6y5z4a3b2c1',
    title: 'Full Stack Web Development with MERN',
    releasedVersions: 29,
    bannerImgUrl: '/imgs/bg/12.png',
    authorName: 'Jacob Taylor',
    createdAt: new Date('2022-10-05T14:00:00Z'),
    bookmarked: false,
    lastModifiedAt: new Date('2024-03-25T12:30:00Z'),
  },
];

export const getPrimaryCourse = async () => {
  await new Promise<void>((res) => {
    setTimeout(res, 2000);
  });

  const primaryCourse = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Introduction to Web Development',
    releasedVersions: 12,
    description: `Learn the fundamentals of web development, including HTML, CSS, and JavaScript, to build modern and responsive websites.
      Habitant ornaLorem ipsum dolor sit amet consectetur. Pretium amet tellus sed feugiat pharetra. Habitant ornare a tempor dolor in enimut  pharetra ipsum dolor sit ame iat pharetra. Habitant orna`,
    bannerImgUrl: '/imgs/bg/13.jpeg',
    authorName: 'Jane Doe',
    createdAt: new Date('2023-03-15T10:30:00Z'),
    bookmarked: true,
    lastModifiedAt: new Date('2023-05-01T14:20:00Z'),
    ownerId: 'b9d7f6e8-f1d7-4e95-9e97-d14e6c5c63e3',
    tags: ['technology', 'seconday', 'machine learning', 'computer science'],
    auditor: getAuthor(),
  };

  return primaryCourse;
};

export const getAuthor = () => {
  return {
    id: 'c6e7f8a9-1b7c-4a33-9b35-1d2c1e6d8e3a',
    fullName: 'Emily Wilkinson',
    email: 'emily.wilkson@gmail.com',
    bookPublishedCounts: 20,
    contributeCounts: 30,
    bgCoverImg: '/imgs/bg-cover.png',
    role: 'owner' as const,
    bio: "Emily Wilkinson is a renowned author and storyteller whose captivating narratives have transported readers to realms of imagination and wonder. With a profound understanding of the human condition and a gift for crafting intricate plots, she weaves tales that resonate deeply with her audience. Emily's writing journey began at a young age, fueled by an insatiable curiosity and a love for the written word. Her unique perspective and ability to capture the nuances of life have earned her critical acclaim and a dedicated following. Whether exploring themes of love, loss, or self-discovery, Emily's works are a testament to her exceptional talent and her unwavering commitment to her craft.",
    avatarImg: '/imgs/avatar-1.png',
    facebookUrl: 'https://www.facebook.com/emilywilkinsonauthor',
    portfolioUrl: 'https://www.emilywilkinsonbooks.com',
    instagramUrl: 'https://www.instagram.com/emilywilkinsonauthor',
    skills: ['technology', 'seconday', 'machine learning', 'computer science'],

    interests: [
      'Fiction Writing',
      'Character Development',
      'World-Building',
      'Book Clubs',
    ],
  };
};
