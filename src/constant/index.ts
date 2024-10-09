import { Bell, CreditCard, Shield, User, Lock } from 'lucide-react';

export const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export const tempData = [
  {
    id: 1,
    content:
      "This is an amazing post! I love how you've broken down the concept into easy-to-understand parts.",
    postId: '60d21b4667d0d8992e610c85', // Example Post ID
    userId: '60d21b4667d0d8992e610c80', // Example User ID (TechEnthusiast)
    parentId: null, // This is a top-level comment
    parentAuthor: null,
    likes: ['60d21b4667d0d8992e610c90', '60d21b4667d0d8992e610c91'],
    dislikes: ['60d21b4667d0d8992e610c92'],
    createdAt: '2024-10-03T14:23:00Z',
  },
  {
    id: 2,
    content:
      'I completely agree! The examples provided were particularly helpful.',
    postId: '60d21b4667d0d8992e610c85',
    userId: '60d21b4667d0d8992e610c81', // Example User ID (LearningDev)
    parentId: 1, // This is a reply to comment with id 1
    parentAuthor: 'TechEnthusiast',
    likes: ['60d21b4667d0d8992e610c93'],
    dislikes: [],
    createdAt: '2024-10-03T15:01:00Z',
  },
  {
    id: 3,
    content:
      'Absolutely! I found the third example to be the most illuminating.',
    postId: '60d21b4667d0d8992e610c85',
    userId: '60d21b4667d0d8992e610c82', // Example User ID (CodeNewbie)
    parentId: 2, // This is a reply to comment with id 2
    parentAuthor: 'LearningDev',
    likes: ['60d21b4667d0d8992e610c94'],
    dislikes: [],
    createdAt: '2024-10-03T15:15:00Z',
  },
  {
    id: 4,
    content:
      'I have a question about the third point you made. Could you elaborate on how it applies to real-world scenarios?',
    postId: '60d21b4667d0d8992e610c85',
    userId: '60d21b4667d0d8992e610c83', // Example User ID (CuriousLearner)
    parentId: null, // This is a top-level comment
    parentAuthor: null,
    likes: ['60d21b4667d0d8992e610c93'],
    dislikes: [],
    createdAt: '2024-10-03T15:45:00Z',
  },
  {
    id: 5,
    content:
      'Not the author, but I can share my perspective on this. In my experience...',
    postId: '60d21b4667d0d8992e610c85',
    userId: '60d21b4667d0d8992e610c84', // Example User ID (HelpfulExpert)
    parentId: 4, // This is a reply to comment with id 4
    parentAuthor: 'CuriousLearner',
    likes: ['60d21b4667d0d8992e610c95'],
    dislikes: [],
    createdAt: '2024-10-03T16:30:00Z',
  },
  // Other comments and replies follow a similar structure
];

export const dummyData = [
  {
    id: 1,
    content:
      "This is an amazing post! I love how you've broken down the concept into easy-to-understand parts.",
    author: {
      username: 'TechEnthusiast',
      photo: 'https://i.pravatar.cc/150?img=1',
    },
    createdAt: '2024-10-03T14:23:00Z',
    likes: 15,
    dislikes: 2,
    replies: [
      {
        id: 6,
        content:
          'I completely agree! The examples provided were particularly helpful.',
        author: {
          username: 'LearningDev',
          photo: 'https://i.pravatar.cc/150?img=6',
        },
        createdAt: '2024-10-03T15:01:00Z',
        likes: 7,
        dislikes: 0,
        replies: [
          {
            id: 7,
            content:
              'Absolutely! I found the third example to be the most illuminating.',
            author: {
              username: 'CodeNewbie',
              photo: 'https://i.pravatar.cc/150?img=7',
            },
            createdAt: '2024-10-03T15:15:00Z',
            likes: 3,
            dislikes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    content:
      'I have a question about the third point you made. Could you elaborate on how it applies to real-world scenarios?',
    author: {
      username: 'CuriousLearner',
      photo: 'https://i.pravatar.cc/150?img=2',
    },
    createdAt: '2024-10-03T15:45:00Z',
    likes: 8,
    dislikes: 0,
    replies: [
      {
        id: 8,
        content:
          'Not the author, but I can share my perspective on this. In my experience...',
        author: {
          username: 'HelpfulExpert',
          photo: 'https://i.pravatar.cc/150?img=8',
        },
        createdAt: '2024-10-03T16:30:00Z',
        likes: 12,
        dislikes: 1,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    content:
      "Great article! I've shared this with my team, as it's directly relevant to our current project.",
    author: {
      username: 'ProjectManager',
      photo: 'https://i.pravatar.cc/150?img=3',
    },
    createdAt: '2024-10-04T09:12:00Z',
    likes: 22,
    dislikes: 1,
    replies: [],
  },
  {
    id: 4,
    content:
      "I respectfully disagree with your conclusion. While your points are valid, I think there's more to consider...",
    author: {
      username: 'ConstructiveCritic',
      photo: 'https://i.pravatar.cc/150?img=4',
    },
    createdAt: '2024-10-04T11:30:00Z',
    likes: 7,
    dislikes: 3,
    replies: [
      {
        id: 9,
        content:
          'Could you elaborate on what you think is missing from the conclusion?',
        author: {
          username: 'OpenMindedReader',
          photo: 'https://i.pravatar.cc/150?img=9',
        },
        createdAt: '2024-10-04T12:15:00Z',
        likes: 5,
        dislikes: 0,
        replies: [
          {
            id: 10,
            content:
              "I'm not ConstructiveCritic, but I think they might be referring to...",
            author: {
              username: 'ThoughtfulAnalyst',
              photo: 'https://i.pravatar.cc/150?img=10',
            },
            createdAt: '2024-10-04T13:00:00Z',
            likes: 8,
            dislikes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    content:
      "This post couldn't have come at a better time! I was just researching this topic for my thesis.",
    author: {
      username: 'GradStudent',
      photo: 'https://i.pravatar.cc/150?img=5',
    },
    createdAt: '2024-10-05T08:05:00Z',
    likes: 11,
    dislikes: 0,
    replies: [
      {
        id: 11,
        content:
          "That's great! What's your thesis about? I'd be interested to hear how this relates to your research.",
        author: {
          username: 'CuriousAcademic',
          photo: 'https://i.pravatar.cc/150?img=11',
        },
        createdAt: '2024-10-05T09:30:00Z',
        likes: 3,
        dislikes: 0,
        replies: [],
      },
    ],
  },
];
