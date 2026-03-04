export function generateHint(word: string, attemptNumber: number): string {
  const chars = word.split('')
  const revealed = chars.map((char, i) => {
    if (char === ' ') return ' '
    if (i === 0) return char                                          // Always show first
    if (attemptNumber >= 2 && i === chars.length - 1) return char     // Show last on 2nd
    if (attemptNumber >= 2 && i === Math.floor(chars.length / 2)) return char // Show middle on 2nd
    return '_'
  })
  return revealed.join(' ')
}
