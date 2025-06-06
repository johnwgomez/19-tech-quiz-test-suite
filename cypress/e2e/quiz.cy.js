

// E2E test suite for the Tech Quiz application
describe('Tech Quiz End-to-End', () => {
  beforeEach(() => {
    // Stub the API call for questions to use our fixture instead of the real server
    cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions')
    // Visit the app's home page
    cy.visit('/')
    // Wait for the questions request to complete before running tests
    cy.wait('@getQuestions')
  })

  it('starts the quiz and shows a question', () => {
    // Click the Start Quiz button
    cy.contains('Start Quiz').click()
    // Verify the first question text is displayed
    cy.get('[data-cy=question-text]').should('exist')
  })

  it('answers all questions and displays the correct score', () => {
    // Click to start the quiz
    cy.contains('Start Quiz').click()
    // Load the fixture to iterate through each question
    cy.fixture('questions.json').then((questions) => {
      // For each question in the fixture:
      questions.forEach((q, index) => {
        // Select the correct answer
        cy.get('[data-cy=choice-list]').contains(q.correctAnswer).click()
        // If not the last question, click Next to proceed
        if (index < questions.length - 1) {
          cy.contains('Next').click()
        }
      })
      // After all questions answered, verify the final score is correct
      cy.get('[data-cy=final-score]')
        .should('contain.text', `Your Score: ${questions.length}/${questions.length}`)
    })
  })

  it('allows restarting a new quiz', () => {
    // Start the quiz again
    cy.contains('Start Quiz').click()
    // Repeat answering all questions
    cy.fixture('questions.json').then((questions) => {
      questions.forEach((q, index) => {
        cy.get('[data-cy=choice-list]').contains(q.correctAnswer).click()
        if (index < questions.length - 1) {
          cy.contains('Next').click()
        }
      })
      // Click the button to start a new quiz
      cy.contains('Start New Quiz').click()
      // Confirm that the app has returned to the initial Start Quiz screen
      cy.contains('Start Quiz').should('exist')
    })
  })
})