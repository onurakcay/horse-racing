export interface Horse {
  id: number
  name: string
  condition: number
  color: string
  position?: number
}

export interface RaceResults {
  position: number
  name: string
  time?: string
}

export interface Round {
  id: number
  distance: number
  participants: Horse[]
  results: RaceResults[]
  isCompleted: boolean
}

export interface RaceState {
  allHorses: Horse[]
  currentRound: number
  totalRounds: number
  rounds: Round[]
  isRacing: boolean
  isRaceActive: boolean
  raceScheduleGenerated: boolean
  roundPreparationNeeded: boolean
}
