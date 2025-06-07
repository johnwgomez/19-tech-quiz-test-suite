import { mount } from '@cypress/react'
import Quiz from '../../client/src/components/Quiz'
import questions from '../fixtures/questions.json'

describe('Quiz Component', () => {
  beforeEach(() => {
    // Stub the API so the component loads our fixture
    cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions')
  })

  it('renders Start Quiz button initially', () => {
    mount(<Quiz />)
    cy.contains(/start quiz/i).should('be.visible')
  })

  it('shows first question and its choices after starting', () => {
    mount(<Quiz />)
    cy.wait('@getQuestions')
    cy.contains(/start quiz/i).click()
    cy.get('[data-cy=question-text]')
      .should('contain.text', questions[0].question)
    questions[0].choices.forEach(choice => {
      cy.get('[data-cy=choice-list]').should('contain.text', choice)
    })
  })

  it('completes the quiz and displays final score and restart button', () => {
    mount(<Quiz />)
    cy.wait('@getQuestions')
    cy.contains(/start quiz/i).click()
    questions.forEach((q, index) => {
      cy.get('[data-cy=choice-list]').contains(q.correctAnswer).click()
      if (index < questions.length - 1) {
        cy.contains(/next/i).click()
      }
    })
    cy.get('[data-cy=final-score]')
      .should('contain.text', `Your Score: ${questions.length}/${questions.length}`)
    cy.contains(/start new quiz/i).should('exist')
  })
})