export const GAME_DIFFICULTY_OPTION = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export const GAME_MODE_OPTION = {
  TIMED: 'TIMED',
  PASSAGE: 'PASSAGE'
};


export const GAME_DIFFICULTIES = [
  { id: GAME_DIFFICULTY_OPTION.EASY, label: 'Easy' },
  { id: GAME_DIFFICULTY_OPTION.MEDIUM, label: 'Medium' },
  { id: GAME_DIFFICULTY_OPTION.HARD, label: 'Hard' }
];

export const GAME_MODES = [
  { id: GAME_MODE_OPTION.TIMED, label: 'Timed (60s)' },
  { id: GAME_MODE_OPTION.PASSAGE, label: 'Passage' }
];