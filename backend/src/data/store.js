export const users = [
  {
    id: 1,
    name: 'Maya Chen',
    email: 'maya@talentrank.ai',
    company: 'TalentRank AI',
    password: '$2a$10$qBDmvK.I.wVavdwDIL2tc.ioQ0s2cpHwM.yJNvA5NO8K4T/CU2T/2',
    role: 'admin',
  },
];

export const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote · US',
    type: 'Full-time',
    priority: 'High',
    applicants: 48,
    stage: 'Screening',
    description: 'Lead product design for our B2B recruiting platform.',
    createdAt: '2026-07-20T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'Staff Frontend Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    priority: 'Medium',
    applicants: 31,
    stage: 'Interview',
    description: 'Build modern interfaces for our AI hiring intelligence workflows.',
    createdAt: '2026-07-18T12:00:00.000Z',
  },
];

export const candidates = [
  {
    id: 1,
    name: 'Amara Chen',
    role: 'Senior UX Designer',
    email: 'amara.chen@email.com',
    location: 'Austin, TX',
    experience: '8 years',
    skills: ['Figma', 'Design Systems', 'User Research'],
    status: 'Recommended',
    source: 'LinkedIn',
    score: 94,
    match: 'Excellent',
    uploadedAt: '2026-07-24T09:00:00.000Z',
    resumePath: 'uploads/amara.pdf',
  },
  {
    id: 2,
    name: 'Daniel Ortiz',
    role: 'Frontend Engineer',
    email: 'daniel.ortiz@email.com',
    location: 'Chicago, IL',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'Interview',
    source: 'Indeed',
    score: 89,
    match: 'Strong',
    uploadedAt: '2026-07-23T14:15:00.000Z',
    resumePath: 'uploads/daniel.pdf',
  },
];

export const notifications = [
  { id: 1, title: 'New application received', detail: '5 new resumes matched Senior Product Designer', createdAt: '2026-07-25T07:00:00.000Z' },
  { id: 2, title: 'Ranking threshold updated', detail: 'Scoring model adjusted for product roles', createdAt: '2026-07-25T06:00:00.000Z' },
];

export const analytics = {
  totalJobs: jobs.length,
  activeCandidates: candidates.length,
  rankingAccuracy: 96,
  avgTimeToHire: 16,
};
