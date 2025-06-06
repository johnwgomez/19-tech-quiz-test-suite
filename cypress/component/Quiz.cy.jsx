import React from 'react'
import { mount } from '@cypress/react'
import Quiz from '../../client/src/components/Quiz'
import questions from '../fixtures/questions.json'

describe('Quiz Component', () => {
  // 1. Start Quiz button renders.
  it('renders Start Quiz button initially', () => {
    mount(<Quiz questions={questions} />)
    cy.contains(/start quiz/i).should('be.visible')
  })

  // 2. Clicking it shows the first question and all its choices.
  it('shows first question and its choices after starting', () => {
    mount(<Quiz questions={questions} />)
    cy.contains(/start quiz/i).click()

    // Verify first question text
    cy.get('[data-cy=question-text]')
      .should('contain.text', questions[0].question)

    // Verify all answer choices appear
    questions[0].choices.forEach(choice => {
      cy.get('[data-cy=choice-list]')
        .should('contain.text', choice)
    })
  })

  // 3. Cycling through answers displays the final score and a “Start New Quiz” button.
  it('completes the quiz and displays final score and restart button', () => {
    mount(<Quiz questions={questions} />)
    cy.contains(/start quiz/i).click()

    // Answer each question correctly and advance
    questions.forEach((q, index) => {
      cy.get('[data-cy=choice-list]')
        .contains(q.correctAnswer)
        .click()
      if (index < questions.length - 1) {
        cy.contains(/next/i).click()
      }
    })

    // Verify final score display
    cy.get('[data-cy=final-score]')
      .should('contain.text', `Your Score: ${questions.length}/${questions.length}`)

    // Verify restart button is visible
    cy.contains(/start new quiz/i).should('exist')
  })
})