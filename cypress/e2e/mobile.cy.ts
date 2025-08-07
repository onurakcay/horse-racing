describe('Mobile Horse Racing Application', () => {
  beforeEach(() => {
    cy.viewport(375, 667) // iPhone SE size
    cy.visit('/')
  })

  describe('Mobile Layout', () => {
    it('should display mobile header with icons', () => {
      cy.get('.app-header').should('be.visible')
      cy.get('.title').should('have.css', 'font-size', '16px')

      // Desktop text should be hidden
      cy.get('.desktop-text').should('not.be.visible')

      // Mobile icons should be visible
      cy.get('.mobile-icon').should('be.visible')
    })

    it('should show floating buttons on mobile', () => {
      cy.get('.floating-buttons').should('be.visible')
      cy.get('.floating-btn').should('have.length', 3)

      // Check button titles
      cy.get('.floating-btn').eq(0).should('have.attr', 'title', 'Show Results')
      cy.get('.floating-btn').eq(1).should('have.attr', 'title', 'Show Program')
      cy.get('.floating-btn').eq(2).should('have.attr', 'title', 'Show Horse List')
    })

    it('should hide desktop layout components', () => {
      cy.get('.desktop-layout').should('not.be.visible')
      cy.get('.mobile-layout').should('be.visible')
    })

    it('should show only race track in mobile layout', () => {
      cy.get('.mobile-layout .race-track').should('be.visible')
      cy.get('.mobile-layout .horse-list').should('not.exist')
      cy.get('.mobile-layout .program-results').should('not.exist')
    })
  })

  describe('Mobile Header Controls', () => {
    it('should show correct mobile icons for race states', () => {
      // Initial state - generate program icon
      cy.get('.generate-btn .mobile-icon').should('contain.text', '📊')

      // After generating program
      cy.get('.generate-btn').click()
      cy.get('.race-btn .mobile-icon').should('contain.text', '▶️')

      // During race
      cy.get('.race-btn').click()
      cy.get('.race-btn .mobile-icon').should('contain.text', '⏹️')
    })

    it('should have appropriate button sizes for touch', () => {
      cy.get('.control-btn').should('have.css', 'min-width', '40px')
      cy.get('.control-btn').should('have.css', 'height', '40px')
    })
  })

  describe('Bottom Sheets', () => {
    beforeEach(() => {
      cy.get('.generate-btn').click() // Generate program first
    })

    it('should open horse list bottom sheet', () => {
      cy.get('.floating-btn').eq(2).click() // Horse list button

      cy.get('.bottom-sheet').should('be.visible')
      cy.get('.bottom-sheet-title').should('contain.text', 'Horse List')
      cy.get('.horse-list.mobile').should('be.visible')
      cy.get('.horse-list.mobile table tbody tr').should('have.length', 20)
    })

    it('should open program bottom sheet', () => {
      cy.get('.floating-btn').eq(1).click() // Program button

      cy.get('.bottom-sheet').should('be.visible')
      cy.get('.bottom-sheet-title').should('contain.text', 'Program')
      cy.get('.program.mobile').should('be.visible')
      cy.get('.round-section').should('have.length', 6)
    })

    it('should open results bottom sheet after race completion', () => {
      // Start and complete a race first
      cy.get('.race-btn').click()
      cy.get('.completed-badge', { timeout: 30000 }).should('be.visible')

      cy.get('.floating-btn').eq(0).click() // Results button

      cy.get('.bottom-sheet').should('be.visible')
      cy.get('.bottom-sheet-title').should('contain.text', 'Results')
      cy.get('.results.mobile').should('be.visible')
    })

    it('should close bottom sheet when clicking overlay', () => {
      cy.get('.floating-btn').eq(2).click() // Open horse list
      cy.get('.bottom-sheet').should('be.visible')

      cy.get('.bottom-sheet-overlay').click()
      cy.get('.bottom-sheet').should('not.exist')
    })

    it('should close bottom sheet when clicking close button', () => {
      cy.get('.floating-btn').eq(1).click() // Open program
      cy.get('.bottom-sheet').should('be.visible')

      cy.get('.close-btn').click()
      cy.get('.bottom-sheet').should('not.exist')
    })

    it('should have proper mobile styling in bottom sheets', () => {
      cy.get('.floating-btn').eq(2).click() // Open horse list

      cy.get('.horse-list.mobile .header h3').should('have.css', 'font-size', '16px')
      cy.get('.horse-list.mobile table').should('have.css', 'font-size', '14px')
    })
  })

  describe('Mobile Race Track', () => {
    beforeEach(() => {
      cy.get('.generate-btn').click()
    })

    it('should display race track properly on mobile', () => {
      cy.get('.race-track').should('be.visible')
      cy.get('.track-container').should('be.visible')
      cy.get('.round-info').should('be.visible')
    })

    it('should show mobile-sized horses and lanes', () => {
      cy.get('.race-btn').click()

      cy.get('.lane').should('have.css', 'height', '30px')
      cy.get('.horse').should('have.css', 'font-size', '16px')
      cy.get('.lane-number').should('have.css', 'font-size', '10px')
    })

    it('should have proper finish line on mobile', () => {
      cy.get('.finish-line').should('have.css', 'width', '6px')
      cy.get('.finish-text').should('have.css', 'font-size', '10px')
    })
  })

  describe('Mobile Touch Interactions', () => {
    it('should handle touch events on floating buttons', () => {
      cy.get('.floating-btn').eq(2).trigger('touchstart')
      cy.get('.floating-btn').eq(2).trigger('touchend')

      cy.get('.bottom-sheet').should('be.visible')
    })

    it('should handle touch events on header buttons', () => {
      cy.get('.generate-btn').trigger('touchstart')
      cy.get('.generate-btn').trigger('touchend')

      cy.get('.race-btn').should('be.visible')
    })

    it('should prevent text selection on buttons', () => {
      cy.get('.control-btn').should('have.css', 'user-select', 'none')
      cy.get('.floating-btn').should('have.css', 'user-select', 'none')
    })
  })

  describe('Mobile Race Flow', () => {
    it('should complete a full race on mobile', () => {
      // Generate program
      cy.get('.generate-btn').click()

      // Check floating buttons are available
      cy.get('.floating-buttons').should('be.visible')

      // Start race
      cy.get('.race-btn').click()
      cy.get('.round-details').should('contain.text', 'Round 1: 1200m')

      // Wait for race completion
      cy.get('.completed-badge', { timeout: 30000 }).should('be.visible')

      // Check results in bottom sheet
      cy.get('.floating-btn').eq(0).click() // Results button
      cy.get('.results.mobile .round-section').should('have.length', 1)

      // Close sheet and prepare next round
      cy.get('.close-btn').click()
      cy.get('.race-btn').should('contain.text', 'PREPARE ROUND 2')
    })

    it('should handle multiple rounds on mobile', () => {
      cy.get('.generate-btn').click()

      // Complete first two rounds
      for (let round = 1; round <= 2; round++) {
        if (round > 1) {
          cy.get('.race-btn').click() // Prepare round
        }
        cy.get('.race-btn').click() // Start race
        cy.get('.completed-badge', { timeout: 30000 }).should('have.length', round)
      }

      // Check program shows completed rounds
      cy.get('.floating-btn').eq(1).click() // Program button
      cy.get('.completed-badge').should('have.length', 2)
    })
  })

  describe('Mobile Responsive Breakpoints', () => {
    it('should work on different mobile sizes', () => {
      const viewports = [
        [320, 568], // iPhone 5
        [375, 667], // iPhone SE
        [414, 896], // iPhone XR
        [360, 640], // Android typical
      ]

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height)
        cy.reload()

        cy.get('.floating-buttons').should('be.visible')
        cy.get('.mobile-layout').should('be.visible')
        cy.get('.desktop-layout').should('not.be.visible')
      })
    })

    it('should switch to desktop layout on tablet size', () => {
      cy.viewport(768, 1024) // iPad
      cy.reload()

      cy.get('.floating-buttons').should('not.be.visible')
      cy.get('.mobile-layout').should('not.be.visible')
      cy.get('.desktop-layout').should('be.visible')
    })
  })

  describe('Mobile Performance', () => {
    it('should handle rapid floating button clicks', () => {
      cy.get('.generate-btn').click()

      // Rapidly click different floating buttons
      cy.get('.floating-btn').eq(2).click()
      cy.get('.close-btn').click()
      cy.get('.floating-btn').eq(1).click()
      cy.get('.close-btn').click()
      cy.get('.floating-btn').eq(0).click()
      cy.get('.close-btn').click()

      // Should still work correctly
      cy.get('.floating-buttons').should('be.visible')
      cy.get('.race-track').should('be.visible')
    })

    it('should maintain scroll position in bottom sheets', () => {
      cy.get('.generate-btn').click()
      cy.get('.floating-btn').eq(1).click() // Program button

      // Scroll within bottom sheet
      cy.get('.bottom-sheet-content').scrollTo('bottom')
      cy.get('.round-section').last().should('be.visible')

      // Close and reopen
      cy.get('.close-btn').click()
      cy.get('.floating-btn').eq(1).click()

      // Should start from top again
      cy.get('.round-section').first().should('be.visible')
    })
  })

  describe('Mobile End Game Flow', () => {
    beforeEach(() => {
      cy.viewport(375, 667) // iPhone SE
    })

    it('should show END GAME in mobile layout after completing all rounds', () => {
      cy.get('.generate-btn').click()

      // Complete all 6 rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click() // Prepare
        }
        cy.get('.race-btn').click() // Start
        cy.get('.completed-badge', { timeout: 30000 }).should('have.length', round)
      }

      // Check END GAME button appears with trophy icon
      cy.get('.race-btn .mobile-icon').should('contain.text', '🏆')
      cy.get('.race-btn .desktop-text').should('contain.text', 'END GAME')
    })

    it('should reset game when END GAME is clicked in mobile', () => {
      cy.get('.generate-btn').click()

      // Complete all rounds quickly
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click()
        }
        cy.get('.race-btn').click()
        cy.get('.completed-badge', { timeout: 30000 }).should('have.length', round)
      }

      // Click END GAME
      cy.get('.race-btn').should('contain.text', 'END GAME')
      cy.get('.race-btn').click()

      // Should return to initial state
      cy.get('.floating-buttons').should('be.visible')
      cy.get('.generate-btn').should('not.be.disabled')

      // Check floating buttons work after reset
      cy.get('.floating-btn').eq(0).click() // Horses
      cy.get('.bottom-sheet').should('be.visible')
      cy.get('.horse-list').should('be.visible')
    })

    it('should show game completion in results bottom sheet', () => {
      cy.get('.generate-btn').click()

      // Complete all rounds
      for (let round = 1; round <= 6; round++) {
        if (round > 1) {
          cy.get('.race-btn').click()
        }
        cy.get('.race-btn').click()
        cy.get('.completed-badge', { timeout: 30000 }).should('have.length', round)
      }

      // Open results bottom sheet
      cy.get('.floating-btn').eq(2).click() // Results button (🏆)
      cy.get('.bottom-sheet').should('be.visible')

      // Should show all 6 completed rounds
      cy.get('.results-section .round-section').should('have.length', 6)
      cy.get('.completed-badge').should('have.length', 6)
    })
  })
})
