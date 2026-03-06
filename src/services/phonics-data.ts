import type { PhonicsVideo } from '../types/index.js'

const PHONICS_VIDEOS: PhonicsVideo[] = [
  // Level 1-3: Basic Phonics
  {
    id: 'ph-01',
    title: 'ABC Phonics Song',
    youtubeId: 'hq3yfQnllfQ',
    thumbnailUrl: 'https://img.youtube.com/vi/hq3yfQnllfQ/mqdefault.jpg',
    levelRange: [1, 3],
    category: 'basic_phonics',
  },
  {
    id: 'ph-02',
    title: 'Phonics Song A-Z',
    youtubeId: 'BELlZKpi1Zs',
    thumbnailUrl: 'https://img.youtube.com/vi/BELlZKpi1Zs/mqdefault.jpg',
    levelRange: [1, 3],
    category: 'basic_phonics',
  },
  {
    id: 'ph-03',
    title: 'Learn the Alphabet',
    youtubeId: '75p-N9YKqNo',
    thumbnailUrl: 'https://img.youtube.com/vi/75p-N9YKqNo/mqdefault.jpg',
    levelRange: [1, 3],
    category: 'basic_phonics',
  },

  // Level 4-6: Word Building
  {
    id: 'ph-04',
    title: 'Alphabet & Phonics Song',
    youtubeId: '36IBDpTRVNE',
    thumbnailUrl: 'https://img.youtube.com/vi/36IBDpTRVNE/mqdefault.jpg',
    levelRange: [4, 6],
    category: 'word_building',
  },
  {
    id: 'ph-05',
    title: 'Phonics Song',
    youtubeId: 'saF3-f0XWAY',
    thumbnailUrl: 'https://img.youtube.com/vi/saF3-f0XWAY/mqdefault.jpg',
    levelRange: [4, 6],
    category: 'word_building',
  },
  {
    id: 'ph-06',
    title: 'Body Parts Song',
    youtubeId: 'QkHQ0CYwjaI',
    thumbnailUrl: 'https://img.youtube.com/vi/QkHQ0CYwjaI/mqdefault.jpg',
    levelRange: [4, 6],
    category: 'word_building',
  },

  // Level 7-10: Listening & Sentences
  {
    id: 'ph-07',
    title: 'ABC Songs for Children',
    youtubeId: '_UR-l3QI2nE',
    thumbnailUrl: 'https://img.youtube.com/vi/_UR-l3QI2nE/mqdefault.jpg',
    levelRange: [7, 10],
    category: 'listening',
  },
  {
    id: 'ph-08',
    title: 'I Have A Pet - Animal Song',
    youtubeId: 'pWepfJ-8XU0',
    thumbnailUrl: 'https://img.youtube.com/vi/pWepfJ-8XU0/mqdefault.jpg',
    levelRange: [7, 10],
    category: 'listening',
  },
  {
    id: 'ph-09',
    title: 'Days of the Week Song',
    youtubeId: 'mXMofxtDPUQ',
    thumbnailUrl: 'https://img.youtube.com/vi/mXMofxtDPUQ/mqdefault.jpg',
    levelRange: [7, 10],
    category: 'listening',
  },
]

export function getPhonicsRecommendations(level: number): PhonicsVideo[] {
  return PHONICS_VIDEOS.filter(v => level >= v.levelRange[0] && level <= v.levelRange[1])
}
