import type { LevelTestQuestion, LevelTestResult } from '../types/index.js'

const QUESTION_POOL: LevelTestQuestion[] = [
  // ─── Easy: word_meaning (6) ───
  {
    id: 'lt-e01', type: 'word_meaning', difficulty: 'easy',
    prompt: 'What does "apple" mean?',
    promptKorean: '"apple"은 무슨 뜻일까요?',
    options: [
      { id: 'a', text: '사과' },
      { id: 'b', text: '바나나' },
      { id: 'c', text: '포도' },
      { id: 'd', text: '수박' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'lt-e02', type: 'word_meaning', difficulty: 'easy',
    prompt: 'What does "dog" mean?',
    promptKorean: '"dog"은 무슨 뜻일까요?',
    options: [
      { id: 'a', text: '고양이' },
      { id: 'b', text: '강아지' },
      { id: 'c', text: '토끼' },
      { id: 'd', text: '새' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-e03', type: 'word_meaning', difficulty: 'easy',
    prompt: 'What does "red" mean?',
    promptKorean: '"red"는 무슨 색일까요?',
    options: [
      { id: 'a', text: '파란색' },
      { id: 'b', text: '노란색' },
      { id: 'c', text: '빨간색' },
      { id: 'd', text: '초록색' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'lt-e04', type: 'word_meaning', difficulty: 'easy',
    prompt: 'What does "mom" mean?',
    promptKorean: '"mom"은 누구일까요?',
    options: [
      { id: 'a', text: '아빠' },
      { id: 'b', text: '엄마' },
      { id: 'c', text: '할머니' },
      { id: 'd', text: '선생님' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-e05', type: 'phonics_recognition', difficulty: 'easy',
    prompt: 'Which word starts with "C"?',
    promptKorean: '"C"로 시작하는 단어는 무엇일까요?',
    options: [
      { id: 'a', text: 'Cat' },
      { id: 'b', text: 'Dog' },
      { id: 'c', text: 'Ball' },
      { id: 'd', text: 'Sun' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'lt-e06', type: 'phonics_recognition', difficulty: 'easy',
    prompt: 'Which word starts with "B"?',
    promptKorean: '"B"로 시작하는 단어는 무엇일까요?',
    options: [
      { id: 'a', text: 'Apple' },
      { id: 'b', text: 'Banana' },
      { id: 'c', text: 'Grape' },
      { id: 'd', text: 'Milk' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-e07', type: 'word_meaning', difficulty: 'easy',
    prompt: 'What does "sun" mean?',
    promptKorean: '"sun"은 무엇일까요?',
    options: [
      { id: 'a', text: '달' },
      { id: 'b', text: '별' },
      { id: 'c', text: '태양' },
      { id: 'd', text: '구름' },
    ],
    correctOptionId: 'c',
  },

  // ─── Medium: word_meaning + phonics (6) ───
  {
    id: 'lt-m01', type: 'word_meaning', difficulty: 'medium',
    prompt: 'What does "elephant" mean?',
    promptKorean: '"elephant"는 무슨 동물일까요?',
    options: [
      { id: 'a', text: '기린' },
      { id: 'b', text: '코끼리' },
      { id: 'c', text: '사자' },
      { id: 'd', text: '원숭이' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-m02', type: 'sentence_comprehension', difficulty: 'medium',
    prompt: '"I like to eat pizza." — What do I like?',
    promptKorean: '"I like to eat pizza." — 내가 좋아하는 것은?',
    options: [
      { id: 'a', text: '피자를 먹는 것' },
      { id: 'b', text: '축구를 하는 것' },
      { id: 'c', text: '책을 읽는 것' },
      { id: 'd', text: '노래를 부르는 것' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'lt-m03', type: 'phonics_recognition', difficulty: 'medium',
    prompt: 'Which word rhymes with "cat"?',
    promptKorean: '"cat"과 비슷한 소리가 나는 단어는?',
    options: [
      { id: 'a', text: 'Dog' },
      { id: 'b', text: 'Hat' },
      { id: 'c', text: 'Cup' },
      { id: 'd', text: 'Pen' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-m04', type: 'word_meaning', difficulty: 'medium',
    prompt: 'What does "rainbow" mean?',
    promptKorean: '"rainbow"는 무엇일까요?',
    options: [
      { id: 'a', text: '비' },
      { id: 'b', text: '번개' },
      { id: 'c', text: '무지개' },
      { id: 'd', text: '눈' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'lt-m05', type: 'sentence_comprehension', difficulty: 'medium',
    prompt: '"She has two brothers." — How many brothers?',
    promptKorean: '"She has two brothers." — 형제가 몇 명인가요?',
    options: [
      { id: 'a', text: '1명' },
      { id: 'b', text: '2명' },
      { id: 'c', text: '3명' },
      { id: 'd', text: '4명' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-m06', type: 'phonics_recognition', difficulty: 'medium',
    prompt: 'Which word has the "sh" sound?',
    promptKorean: '"sh" 소리가 나는 단어는?',
    options: [
      { id: 'a', text: 'Ship' },
      { id: 'b', text: 'Chip' },
      { id: 'c', text: 'Skip' },
      { id: 'd', text: 'Clip' },
    ],
    correctOptionId: 'a',
  },

  // ─── Hard: sentence_comprehension + advanced (5) ───
  {
    id: 'lt-h01', type: 'sentence_comprehension', difficulty: 'hard',
    prompt: '"The cat is sleeping on the chair." — Where is the cat?',
    promptKorean: '"The cat is sleeping on the chair." — 고양이는 어디에 있나요?',
    options: [
      { id: 'a', text: '침대 위' },
      { id: 'b', text: '의자 위' },
      { id: 'c', text: '바닥' },
      { id: 'd', text: '테이블 위' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-h02', type: 'sentence_comprehension', difficulty: 'hard',
    prompt: '"Tom is taller than Sam." — Who is shorter?',
    promptKorean: '"Tom is taller than Sam." — 누가 더 작나요?',
    options: [
      { id: 'a', text: 'Tom' },
      { id: 'b', text: 'Sam' },
      { id: 'c', text: '둘 다 같다' },
      { id: 'd', text: '알 수 없다' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-h03', type: 'word_meaning', difficulty: 'hard',
    prompt: 'What does "butterfly" mean?',
    promptKorean: '"butterfly"는 무엇일까요?',
    options: [
      { id: 'a', text: '버터' },
      { id: 'b', text: '나비' },
      { id: 'c', text: '잠자리' },
      { id: 'd', text: '벌' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'lt-h04', type: 'sentence_comprehension', difficulty: 'hard',
    prompt: '"We went to the park yesterday." — When did they go?',
    promptKorean: '"We went to the park yesterday." — 언제 갔나요?',
    options: [
      { id: 'a', text: '오늘' },
      { id: 'b', text: '내일' },
      { id: 'c', text: '어제' },
      { id: 'd', text: '다음 주' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'lt-h05', type: 'phonics_recognition', difficulty: 'hard',
    prompt: 'Which word has a silent letter?',
    promptKorean: '소리가 나지 않는 글자가 있는 단어는?',
    options: [
      { id: 'a', text: 'Knife' },
      { id: 'b', text: 'Skip' },
      { id: 'c', text: 'Frog' },
      { id: 'd', text: 'Drum' },
    ],
    correctOptionId: 'a',
  },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function getLevelTestQuestions(): LevelTestQuestion[] {
  const easy = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'easy')).slice(0, 4)
  const medium = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'medium')).slice(0, 3)
  const hard = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'hard')).slice(0, 3)
  return [...easy, ...medium, ...hard]
}

export function scoreTest(answers: { questionId: string; selectedOptionId: string }[]): LevelTestResult {
  let correctCount = 0
  for (const ans of answers) {
    const question = QUESTION_POOL.find(q => q.id === ans.questionId)
    if (question && question.correctOptionId === ans.selectedOptionId) {
      correctCount++
    }
  }

  const totalQuestions = answers.length
  const score = Math.round((correctCount / totalQuestions) * 100)

  // Map score to level 1-10
  let level: number
  if (score <= 10) level = 1
  else if (score <= 20) level = 2
  else if (score <= 30) level = 3
  else if (score <= 40) level = 4
  else if (score <= 50) level = 5
  else if (score <= 60) level = 6
  else if (score <= 70) level = 7
  else if (score <= 80) level = 8
  else if (score <= 90) level = 9
  else level = 10

  return { score, level, totalQuestions, correctCount }
}
