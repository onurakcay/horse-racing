import { createStore } from 'vuex'
import type { RaceResults, RaceState, Horse, Round } from '@/types'

// Generate unique horse names and colors
const generateHorses = (): Horse[] => {
  const names = [
    'Thunder Bolt',
    'Lightning Strike',
    'Storm Chaser',
    'Wind Runner',
    'Fire Spirit',
    'Silver Arrow',
    'Golden Flash',
    'Dark Knight',
    'Swift Eagle',
    'Royal Crown',
    'Diamond Star',
    'Crimson Flame',
    'Blue Thunder',
    'Green Arrow',
    'Purple Rain',
    'Orange Sunset',
    'Pink Dawn',
    'White Lightning',
    'Black Beauty',
    'Red Warrior',
  ]

  const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Purple',
    'Orange',
    'Pink',
    'Brown',
    'Black',
    'White',
    'Gray',
    'Maroon',
    'Navy',
    'Olive',
    'Lime',
    'Aqua',
    'Teal',
    'Silver',
    'Fuchsia',
    'Coral',
  ]

  return names.map((name, index) => ({
    id: index + 1,
    name,
    condition: Math.floor(Math.random() * 100) + 1, // 1-100 range
    color: colors[index],
    position: 0,
  }))
}

// Round distances as specified
const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

const store = createStore<RaceState>({
  state: {
    allHorses: generateHorses(),
    currentRound: 0,
    totalRounds: 6,
    rounds: [],
    isRacing: false,
    isRaceActive: false,
    raceScheduleGenerated: false,
    roundPreparationNeeded: false, // New state to track if round preparation is needed
  },
  mutations: {
    GENERATE_RACE_SCHEDULE(state) {
      const rounds: Round[] = []

      for (let i = 0; i < 6; i++) {
        // Select 10 random horses for each round
        const shuffledHorses = [...state.allHorses].sort(() => Math.random() - 0.5)
        const selectedHorses = shuffledHorses.slice(0, 10).map((horse) => ({
          ...horse,
          position: 0,
        }))

        rounds.push({
          id: i + 1,
          distance: ROUND_DISTANCES[i],
          participants: selectedHorses,
          results: [],
          isCompleted: false,
        })
      }

      state.rounds = rounds
      state.raceScheduleGenerated = true
      state.currentRound = 0
      state.roundPreparationNeeded = false
    },

    START_RACE(state) {
      state.isRaceActive = true
      // Don't reset currentRound, keep it at the current position
    },

    START_ROUND(state, roundIndex: number) {
      state.isRacing = true
      state.currentRound = roundIndex
      state.roundPreparationNeeded = false
      // Reset positions for the first round only
      if (roundIndex === 0 && state.rounds[roundIndex]) {
        state.rounds[roundIndex].participants.forEach((horse) => {
          horse.position = 0
        })
      }
    },

    PREPARE_ROUND(state, roundIndex: number) {
      state.roundPreparationNeeded = false
      state.currentRound = roundIndex
      // Reset positions for the new round
      if (state.rounds[roundIndex]) {
        state.rounds[roundIndex].participants.forEach((horse) => {
          horse.position = 0
        })
      }
    },

    UPDATE_HORSE_POSITION(state, { roundIndex, horseId, position }) {
      const round = state.rounds[roundIndex]
      if (round) {
        const horse = round.participants.find((h) => h.id === horseId)
        if (horse) {
          horse.position = position
        }
      }
    },

    COMPLETE_ROUND(state, { roundIndex, results }) {
      const round = state.rounds[roundIndex]
      if (round) {
        round.results = results
        round.isCompleted = true
        // Don't set isRacing to false here, let the action handle state transitions
      }
    },

    STOP_RACE(state) {
      state.isRacing = false
      state.isRaceActive = false
    },

    RESET_RACE(state) {
      state.rounds = []
      state.raceScheduleGenerated = false
      state.currentRound = 0
      state.isRacing = false
      state.isRaceActive = false
      state.roundPreparationNeeded = false
      // Regenerate horses with new conditions
      state.allHorses = generateHorses()
    },
  },

  actions: {
    generateRaceSchedule({ commit }) {
      commit('GENERATE_RACE_SCHEDULE')
    },

    startRace({ commit, state, dispatch }) {
      if (!state.raceScheduleGenerated) return

      commit('START_RACE')
      dispatch('runNextRound')
    },

    prepareNextRound({ commit, state }) {
      const nextRoundIndex = state.currentRound + 1
      if (nextRoundIndex >= state.totalRounds) return

      commit('PREPARE_ROUND', nextRoundIndex)
      // Don't start the race automatically, just prepare
    },

    async runNextRound({ commit, state }) {
      if (state.currentRound >= state.totalRounds) {
        commit('STOP_RACE')
        return
      }

      const roundIndex = state.currentRound
      const currentRound = state.rounds[roundIndex]

      if (!currentRound) {
        commit('STOP_RACE')
        return
      }

      // If current round is already completed, don't run it again
      if (currentRound.isCompleted) {
        return
      }

      commit('START_ROUND', roundIndex)

      // Simulate race
      const raceInterval = setInterval(() => {
        if (!state.isRacing) {
          clearInterval(raceInterval)
          return
        }

        // Update horse positions based on condition
        currentRound.participants.forEach((horse) => {
          const baseSpeed = (horse.condition / 100) * 5
          const randomFactor = Math.random() * 3
          const speed = baseSpeed + randomFactor
          const newPosition = Math.min((horse.position || 0) + speed, currentRound.distance)

          commit('UPDATE_HORSE_POSITION', {
            roundIndex,
            horseId: horse.id,
            position: newPosition,
          })
        })

        // Check if race is finished
        const finishedHorses = currentRound.participants.filter(
          (horse) => (horse.position || 0) >= currentRound.distance,
        )

        if (finishedHorses.length > 0) {
          // Generate results
          const sortedHorses = [...currentRound.participants].sort(
            (a, b) => (b.position || 0) - (a.position || 0),
          )

          const results: RaceResults[] = sortedHorses.map((horse, index) => ({
            position: index + 1,
            name: horse.name,
            time: `${Math.floor(Math.random() * 60)}.${Math.floor(Math.random() * 999)
              .toString()
              .padStart(3, '0')}`,
          }))

          commit('COMPLETE_ROUND', { roundIndex, results })
          clearInterval(raceInterval)

          // Set preparation needed for next round but don't advance currentRound yet
          if (state.isRaceActive && roundIndex < state.totalRounds - 1) {
            state.isRacing = false
            state.roundPreparationNeeded = true // Next round needs preparation
            // Don't change currentRound here, keep showing current round results
          } else {
            // All rounds completed
            commit('STOP_RACE')
          }
        }
      }, 100)
    },

    stopRace({ commit }) {
      commit('STOP_RACE')
    },

    resetRace({ commit }) {
      commit('RESET_RACE')
    },
  },

  getters: {
    currentRoundData: (state) => {
      return state.rounds[state.currentRound] || null
    },

    completedRounds: (state) => {
      return state.rounds.filter((round) => round.isCompleted)
    },

    raceProgress: (state) => {
      if (!state.rounds.length) return 0
      const completedCount = state.rounds.filter((r) => r.isCompleted).length
      return (completedCount / state.totalRounds) * 100
    },
  },
})

export default store
