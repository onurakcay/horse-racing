describe('Horse Racing Application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial Page Load', () => {
    it('should display the header with correct title', () => {
      cy.get('.app-header').should('be.visible')
      cy.get('.title').should('contain.text', 'Horse Racing')
    })

    it('should show generate program button', () => {
      cy.get('.generate-btn').should('be.visible')
      cy.get('.generate-btn').should('contain.text', 'GENERATE PROGRAM')
      cy.get('.generate-btn').should('not.be.disabled')
    })

    it('should not show race control buttons initially', () => {
      cy.get('.race-btn').should('not.exist')
      cy.get('.reset-btn').should('not.exist')
    })

    it('should display horse list component', () => {
      cy.get('.horse-list').should('be.visible')
      cy.get('.horse-list .header h3').should('contain.text', 'Horse List (1 - 20)')
    })

    it('should display race track component', () => {
      cy.get('.race-track').should('be.visible')
      cy.get('.no-round').should('contain.text', 'Generate program to start racing')
    })

    it('should display program results component', () => {
      cy.get('.program-results').should('be.visible')
      cy.get('.no-program').should(
        'contain.text',
        'Click "Generate Program" to create race schedule',
      )
    })
  })

  describe('Horse List', () => {
    it('should display all 20 horses with correct data', () => {
      cy.get('.horse-list table tbody tr').should('have.length', 20)

      // Check first horse data
      cy.get('.horse-list table tbody tr')
        .first()
        .within(() => {
          cy.get('td').eq(0).should('not.be.empty') // Name
          cy.get('td')
            .eq(1)
            .then(($td) => {
              const condition = parseInt($td.text())
              expect(condition).to.be.a('number')
              expect(condition).to.be.at.least(1)
              expect(condition).to.be.at.most(100)
            })
          cy.get('td').eq(2).find('.color-indicator').should('exist') // Color with indicator
        })
    })

    it('should have unique horse names', () => {
      const horseNames: string[] = []
      cy.get('.horse-list table tbody tr td:first-child').each(($el) => {
        const name = $el.text()
        expect(horseNames).to.not.include(name)
        horseNames.push(name)
      })
    })
  })

  describe('Program Generation', () => {
    it('should generate race schedule when button is clicked', () => {
      cy.get('.generate-btn').click()

      // Check that race controls appear
      cy.get('.race-btn').should('be.visible')
      cy.get('.reset-btn').should('be.visible')

      // Check that program is generated
      cy.get('.no-program').should('not.exist')
      cy.get('.round-section').should('have.length', 6)

      // Check round distances
      const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200]
      expectedDistances.forEach((distance, index) => {
        cy.get('.round-section')
          .eq(index)
          .within(() => {
            cy.get('.round-header').should('contain.text', `Round ${index + 1}: ${distance}m`)
            cy.get('.results-table tbody tr').should('have.length', 10)
          })
      })

      // After generation, button should be disabled (wait for state update)
      cy.get('.generate-btn').should('be.disabled')
    })

    it('should show start race button after program generation', () => {
      cy.get('.generate-btn').click()
      cy.get('.race-btn').should('contain.text', 'START ROUND 1')
      cy.get('.race-btn').should('not.be.disabled')
    })
  })

  describe('Race Execution', () => {
    beforeEach(() => {
      cy.get('.generate-btn').click()
    })

    it('should start first race when start button is clicked', () => {
      cy.get('.race-btn').click()

      // Button should change to STOP
      cy.get('.race-btn').should('contain.text', 'STOP')

      // Round info should show current round
      cy.get('.round-details').should('contain.text', 'Round 1: 1200m')

      // Horses should be visible on track
      cy.get('.race-track .track-lanes .lane .horse').should('have.length', 10)
    })

    it('should move horses during race', () => {
      cy.get('.race-btn').click()

      // Wait for horses to start moving by checking for position changes
      cy.get('.race-track .track-lanes .lane .horse')
        .first()
        .should(($horse) => {
          const leftPosition = $horse.css('left')
          expect(leftPosition).to.not.equal('0px')
        })
    })

    it('should complete race and show results', () => {
      cy.get('.race-btn').click()

      // Wait for race to complete (max 45 seconds)
      cy.get('.completed-badge', { timeout: 45000 }).should('be.visible')

      // Check that results are displayed
      cy.get('.results-section .round-section').should('have.length', 1)
      cy.get('.results-section .results-table tbody tr').should('have.length', 10)

      // Check button changes to PREPARE ROUND 2
      cy.get('.race-btn').should('contain.text', 'PREPARE ROUND 2')
    })

    it('should progress through multiple rounds', () => {
      // Start first race
      cy.get('.race-btn').click()

      // Wait for first race to complete
      cy.get('.completed-badge', { timeout: 45000 }).should('be.visible')
      cy.get('.race-btn').should('contain.text', 'PREPARE ROUND 2')

      // Prepare second round
      cy.get('.race-btn').click()
      cy.get('.race-btn').should('contain.text', 'START ROUND 2')

      // Start second race
      cy.get('.race-btn').click()
      cy.get('.round-details').should('contain.text', 'Round 2: 1400m')
    })

    it('should allow stopping race mid-execution', () => {
      cy.get('.race-btn').click()
      cy.get('.race-btn').should('contain.text', 'STOP')

      // Stop the race
      cy.get('.race-btn').click()
      cy.get('.race-btn').should('not.contain.text', 'STOP')
    })
  })

  describe('Reset Functionality', () => {
    beforeEach(() => {
      cy.get('.generate-btn').click()
    })

    it('should reset everything when reset button is clicked', () => {
      cy.get('.reset-btn').click()

      // Check that UI returns to initial state
      cy.get('.race-btn').should('not.exist')
      cy.get('.reset-btn').should('not.exist')
      cy.get('.generate-btn').should('not.be.disabled')
      cy.get('.no-program').should('be.visible')
      cy.get('.no-round').should('be.visible')
    })

    it('should not allow reset during active race', () => {
      cy.get('.race-btn').click() // Start race
      cy.get('.reset-btn').should('be.disabled')
    })

    it('should regenerate horses with new conditions after reset', () => {
      // Get initial horse conditions
      const initialConditions: string[] = []
      cy.get('.horse-list table tbody tr td:nth-child(2)').each(($el) => {
        initialConditions.push($el.text())
      })

      cy.get('.reset-btn').click()

      // Check that at least some conditions have changed
      cy.get('.horse-list table tbody tr td:nth-child(2)').then(($newConditions) => {
        const newConditions = Array.from($newConditions).map((el) => el.textContent)
        const changedCount = newConditions.filter(
          (condition, index) => condition !== initialConditions[index],
        ).length

        expect(changedCount).to.be.greaterThan(0)
      })
    })
  })

  describe('Complete Race Flow', () => {
    it('should complete all 6 rounds successfully', () => {
      cy.get('.generate-btn').click()

      // Complete all 6 rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          // Prepare round (except first round)
          cy.get('.race-btn').should('contain.text', `PREPARE ROUND ${round}`)
          cy.get('.race-btn').click()
        }

        // Start round
        cy.get('.race-btn').should('contain.text', `START ROUND ${round}`)
        cy.get('.race-btn').click()

        // Wait for round to complete with more robust checks
        cy.get('.completed-badge', { timeout: 45000 }).should('have.length.at.least', round)

        // Ensure the round is properly completed before moving to next
        cy.get('.completed-badge').should('have.length', round)

        // Check results are recorded
        cy.get('.results-section .round-section').should('have.length', round)
      }

      // After all rounds, button should show END GAME
      cy.get('.race-btn').should('contain.text', 'END GAME')
      cy.get('.completed-badge').should('have.length', 6)
    })
  })

  describe('End Game Functionality', () => {
    it('should show END GAME button after completing all 6 rounds', () => {
      cy.get('.generate-btn').click()

      // Complete all 6 rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').should('contain.text', `PREPARE ROUND ${round}`)
          cy.get('.race-btn').click()
        }

        cy.get('.race-btn').should('contain.text', `START ROUND ${round}`)
        cy.get('.race-btn').click()

        cy.get('.completed-badge', { timeout: 45000 }).should('have.length', round)
      }

      // Check END GAME button appears
      cy.get('.race-btn').should('contain.text', 'END GAME')
      cy.get('.race-btn').should('not.be.disabled')
    })

    it('should reset game when END GAME button is clicked', () => {
      cy.get('.generate-btn').click()

      // Complete all 6 rounds quickly (simplified for test)
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click() // Prepare
        }
        cy.get('.race-btn').click() // Start
        cy.get('.completed-badge', { timeout: 45000 }).should('have.length', round)
      }

      // Click END GAME button
      cy.get('.race-btn').should('contain.text', 'END GAME')
      cy.get('.race-btn').click()

      // Should return to initial state
      cy.get('.race-btn').should('not.exist')
      cy.get('.reset-btn').should('not.exist')
      cy.get('.generate-btn').should('not.be.disabled')
      cy.get('.no-program').should('be.visible')
      cy.get('.no-round').should('be.visible')
    })

    it('should not allow completing 7th round', () => {
      cy.get('.generate-btn').click()

      // Complete all 6 rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click()
        }
        cy.get('.race-btn').click()
        cy.get('.completed-badge', { timeout: 45000 }).should('have.length', round)
      }

      // After 6 rounds, there should be no option to start round 7
      cy.get('.race-btn').should('contain.text', 'END GAME')
      cy.get('.race-btn').should('not.contain.text', 'START ROUND 7')
      cy.get('.race-btn').should('not.contain.text', 'PREPARE ROUND 7')
    })

    it('should show correct icon for END GAME button', () => {
      cy.get('.generate-btn').click()

      // Complete all rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click()
        }
        cy.get('.race-btn').click()
        cy.get('.completed-badge', { timeout: 45000 }).should('have.length', round)
      }

      // Check that mobile icon shows trophy
      cy.get('.race-btn .mobile-icon').should('contain.text', '🏆')
    })
  })

  describe('Error Handling', () => {
    it('should handle rapid button clicks gracefully', () => {
      cy.get('.generate-btn').click()

      // Click start button multiple times rapidly
      cy.get('.race-btn').click()
      cy.get('.race-btn').click()
      cy.get('.race-btn').click()

      // Should still work correctly
      cy.get('.round-details').should('contain.text', 'Round 1: 1200m')
    })

    it('should maintain consistent state after multiple resets', () => {
      // Generate and reset multiple times
      for (let i = 0; i < 3; i++) {
        cy.get('.generate-btn').click()
        cy.get('.reset-btn').click()
      }

      // Final state should be correct
      cy.get('.generate-btn').should('not.be.disabled')
      cy.get('.horse-list table tbody tr').should('have.length', 20)
    })
  })
})
