import type { FlashcardWord } from '../types/index.js'

const FLASHCARD_DATA: FlashcardWord[] = [
  // ─── Fruit ───
  { id: 'fruit-001', english: 'apple', korean: '사과', explanation: '빨갛고 달콤한 과일이에요', exampleSentence: 'I like to eat an apple.', difficulty: 'easy', category: 'fruit' },
  { id: 'fruit-002', english: 'banana', korean: '바나나', explanation: '노랗고 긴 과일이에요', exampleSentence: 'The monkey eats a banana.', difficulty: 'easy', category: 'fruit' },
  { id: 'fruit-003', english: 'grape', korean: '포도', explanation: '작고 동그란 보라색 과일이에요', exampleSentence: 'I picked some grapes.', difficulty: 'easy', category: 'fruit' },
  { id: 'fruit-004', english: 'orange', korean: '오렌지', explanation: '주황색 달콤한 과일이에요', exampleSentence: 'She drinks orange juice.', difficulty: 'easy', category: 'fruit' },
  { id: 'fruit-005', english: 'strawberry', korean: '딸기', explanation: '빨갛고 작은 달콤한 과일이에요', exampleSentence: 'I love strawberry cake.', difficulty: 'medium', category: 'fruit' },
  { id: 'fruit-006', english: 'watermelon', korean: '수박', explanation: '크고 초록색이고 속이 빨간 과일이에요', exampleSentence: 'We eat watermelon in summer.', difficulty: 'medium', category: 'fruit' },
  { id: 'fruit-007', english: 'peach', korean: '복숭아', explanation: '부드럽고 달콤한 과일이에요', exampleSentence: 'The peach is very sweet.', difficulty: 'easy', category: 'fruit' },

  // ─── Animal ───
  { id: 'animal-001', english: 'cat', korean: '고양이', explanation: '야옹하고 우는 동물이에요', exampleSentence: 'The cat is sleeping.', difficulty: 'easy', category: 'animal' },
  { id: 'animal-002', english: 'dog', korean: '강아지', explanation: '멍멍하고 짖는 동물이에요', exampleSentence: 'My dog likes to play.', difficulty: 'easy', category: 'animal' },
  { id: 'animal-003', english: 'rabbit', korean: '토끼', explanation: '귀가 길고 깡충깡충 뛰는 동물이에요', exampleSentence: 'The rabbit has long ears.', difficulty: 'easy', category: 'animal' },
  { id: 'animal-004', english: 'elephant', korean: '코끼리', explanation: '코가 길고 아주 큰 동물이에요', exampleSentence: 'The elephant is very big.', difficulty: 'medium', category: 'animal' },
  { id: 'animal-005', english: 'giraffe', korean: '기린', explanation: '목이 아주 긴 동물이에요', exampleSentence: 'The giraffe eats leaves from tall trees.', difficulty: 'medium', category: 'animal' },
  { id: 'animal-006', english: 'penguin', korean: '펭귄', explanation: '추운 곳에 사는 귀여운 새예요', exampleSentence: 'Penguins live in cold places.', difficulty: 'medium', category: 'animal' },
  { id: 'animal-007', english: 'dolphin', korean: '돌고래', explanation: '바다에 사는 똑똑한 동물이에요', exampleSentence: 'Dolphins can jump very high.', difficulty: 'medium', category: 'animal' },
  { id: 'animal-008', english: 'butterfly', korean: '나비', explanation: '예쁜 날개를 가진 곤충이에요', exampleSentence: 'The butterfly has colorful wings.', difficulty: 'hard', category: 'animal' },

  // ─── Color ───
  { id: 'color-001', english: 'red', korean: '빨간색', explanation: '사과, 딸기 같은 색이에요', exampleSentence: 'The car is red.', difficulty: 'easy', category: 'color' },
  { id: 'color-002', english: 'blue', korean: '파란색', explanation: '하늘, 바다 같은 색이에요', exampleSentence: 'The sky is blue.', difficulty: 'easy', category: 'color' },
  { id: 'color-003', english: 'yellow', korean: '노란색', explanation: '바나나, 해바라기 같은 색이에요', exampleSentence: 'The sun is yellow.', difficulty: 'easy', category: 'color' },
  { id: 'color-004', english: 'green', korean: '초록색', explanation: '풀, 나뭇잎 같은 색이에요', exampleSentence: 'The grass is green.', difficulty: 'easy', category: 'color' },
  { id: 'color-005', english: 'purple', korean: '보라색', explanation: '포도, 가지 같은 색이에요', exampleSentence: 'She wears a purple dress.', difficulty: 'medium', category: 'color' },
  { id: 'color-006', english: 'orange', korean: '주황색', explanation: '오렌지, 당근 같은 색이에요', exampleSentence: 'The pumpkin is orange.', difficulty: 'easy', category: 'color' },

  // ─── Body ───
  { id: 'body-001', english: 'head', korean: '머리', explanation: '몸의 가장 위에 있어요', exampleSentence: 'I wear a hat on my head.', difficulty: 'easy', category: 'body' },
  { id: 'body-002', english: 'hand', korean: '손', explanation: '물건을 잡는 데 사용해요', exampleSentence: 'I wash my hands.', difficulty: 'easy', category: 'body' },
  { id: 'body-003', english: 'eye', korean: '눈', explanation: '보는 데 사용하는 신체 부위에요', exampleSentence: 'She has brown eyes.', difficulty: 'easy', category: 'body' },
  { id: 'body-004', english: 'ear', korean: '귀', explanation: '듣는 데 사용하는 신체 부위에요', exampleSentence: 'The rabbit has big ears.', difficulty: 'easy', category: 'body' },
  { id: 'body-005', english: 'shoulder', korean: '어깨', explanation: '팔과 몸통을 연결하는 부분이에요', exampleSentence: 'He has broad shoulders.', difficulty: 'medium', category: 'body' },
  { id: 'body-006', english: 'knee', korean: '무릎', explanation: '다리를 구부리는 부분이에요', exampleSentence: 'I hurt my knee.', difficulty: 'medium', category: 'body' },

  // ─── Family ───
  { id: 'family-001', english: 'mom', korean: '엄마', explanation: '나를 낳아준 분이에요', exampleSentence: 'My mom is kind.', difficulty: 'easy', category: 'family' },
  { id: 'family-002', english: 'dad', korean: '아빠', explanation: '나의 아버지예요', exampleSentence: 'My dad is tall.', difficulty: 'easy', category: 'family' },
  { id: 'family-003', english: 'sister', korean: '언니/누나/여동생', explanation: '여자 형제예요', exampleSentence: 'My sister likes to read.', difficulty: 'easy', category: 'family' },
  { id: 'family-004', english: 'brother', korean: '형/오빠/남동생', explanation: '남자 형제예요', exampleSentence: 'My brother plays soccer.', difficulty: 'medium', category: 'family' },
  { id: 'family-005', english: 'grandmother', korean: '할머니', explanation: '엄마 또는 아빠의 어머니예요', exampleSentence: 'My grandmother makes cookies.', difficulty: 'hard', category: 'family' },

  // ─── Number ───
  { id: 'number-001', english: 'one', korean: '하나', explanation: '숫자 1이에요', exampleSentence: 'I have one apple.', difficulty: 'easy', category: 'number' },
  { id: 'number-002', english: 'two', korean: '둘', explanation: '숫자 2예요', exampleSentence: 'I have two hands.', difficulty: 'easy', category: 'number' },
  { id: 'number-003', english: 'three', korean: '셋', explanation: '숫자 3이에요', exampleSentence: 'There are three birds.', difficulty: 'easy', category: 'number' },
  { id: 'number-004', english: 'seven', korean: '일곱', explanation: '숫자 7이에요', exampleSentence: 'There are seven days in a week.', difficulty: 'easy', category: 'number' },
  { id: 'number-005', english: 'ten', korean: '열', explanation: '숫자 10이에요', exampleSentence: 'I have ten fingers.', difficulty: 'easy', category: 'number' },

  // ─── Weather ───
  { id: 'weather-001', english: 'sun', korean: '해/태양', explanation: '하늘에서 빛을 내는 것이에요', exampleSentence: 'The sun is bright today.', difficulty: 'easy', category: 'weather' },
  { id: 'weather-002', english: 'rain', korean: '비', explanation: '하늘에서 물이 떨어지는 것이에요', exampleSentence: 'It is raining outside.', difficulty: 'easy', category: 'weather' },
  { id: 'weather-003', english: 'snow', korean: '눈', explanation: '하얗고 차가운 것이 하늘에서 내려요', exampleSentence: 'It snows in winter.', difficulty: 'easy', category: 'weather' },
  { id: 'weather-004', english: 'cloud', korean: '구름', explanation: '하늘에 떠 있는 하얀 것이에요', exampleSentence: 'The clouds are fluffy.', difficulty: 'easy', category: 'weather' },
  { id: 'weather-005', english: 'rainbow', korean: '무지개', explanation: '비 온 뒤 하늘에 나타나는 색띠예요', exampleSentence: 'I see a beautiful rainbow.', difficulty: 'medium', category: 'weather' },

  // ─── Food ───
  { id: 'food-001', english: 'bread', korean: '빵', explanation: '밀가루로 만든 음식이에요', exampleSentence: 'I eat bread for breakfast.', difficulty: 'easy', category: 'food' },
  { id: 'food-002', english: 'milk', korean: '우유', explanation: '소에서 나오는 하얀 음료예요', exampleSentence: 'I drink milk every morning.', difficulty: 'easy', category: 'food' },
  { id: 'food-003', english: 'rice', korean: '밥/쌀', explanation: '우리가 매일 먹는 주식이에요', exampleSentence: 'We eat rice for dinner.', difficulty: 'easy', category: 'food' },
  { id: 'food-004', english: 'egg', korean: '달걀', explanation: '닭이 낳는 동그란 음식이에요', exampleSentence: 'I had an egg for breakfast.', difficulty: 'easy', category: 'food' },
  { id: 'food-005', english: 'chicken', korean: '치킨/닭고기', explanation: '닭으로 만든 음식이에요', exampleSentence: 'I like fried chicken.', difficulty: 'medium', category: 'food' },
  { id: 'food-006', english: 'chocolate', korean: '초콜릿', explanation: '달콤한 갈색 간식이에요', exampleSentence: 'She loves chocolate cake.', difficulty: 'medium', category: 'food' },

  // ─── School ───
  { id: 'school-001', english: 'book', korean: '책', explanation: '읽는 물건이에요', exampleSentence: 'I read a book every night.', difficulty: 'easy', category: 'school' },
  { id: 'school-002', english: 'pencil', korean: '연필', explanation: '글을 쓰는 도구예요', exampleSentence: 'I write with a pencil.', difficulty: 'easy', category: 'school' },
  { id: 'school-003', english: 'teacher', korean: '선생님', explanation: '학교에서 가르쳐주시는 분이에요', exampleSentence: 'My teacher is very nice.', difficulty: 'medium', category: 'school' },
  { id: 'school-004', english: 'school', korean: '학교', explanation: '공부하러 가는 곳이에요', exampleSentence: 'I go to school every day.', difficulty: 'easy', category: 'school' },
  { id: 'school-005', english: 'eraser', korean: '지우개', explanation: '연필로 쓴 것을 지우는 도구예요', exampleSentence: 'Can I borrow your eraser?', difficulty: 'medium', category: 'school' },
]

export function getFlashcards(filters: {
  category?: string
  difficulty?: string
  limit?: number
}): FlashcardWord[] {
  let result = [...FLASHCARD_DATA]
  if (filters.category) result = result.filter(w => w.category === filters.category)
  if (filters.difficulty) {
    const diffs = filters.difficulty.split(',')
    result = result.filter(w => diffs.includes(w.difficulty))
  }
  // Shuffle
  result.sort(() => Math.random() - 0.5)
  return result.slice(0, filters.limit || 10)
}

export function getWordById(id: string): FlashcardWord | undefined {
  return FLASHCARD_DATA.find(w => w.id === id)
}

export function getCategories(): string[] {
  return [...new Set(FLASHCARD_DATA.map(w => w.category))]
}

export function getAllWords(): FlashcardWord[] {
  return FLASHCARD_DATA
}
