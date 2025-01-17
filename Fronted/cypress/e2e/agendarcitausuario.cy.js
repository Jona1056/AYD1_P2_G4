describe('Test Agendar cita por parte del usuario', () => {
    it('Iniciar Sesion ir a horarios doctores y agendar una cita', () => {
      cy.visit('http://localhost:5173/')
      cy.get(':nth-child(2) > .login__input').type('garciajonatan56@gmail.com')
      cy.wait(1000)
      cy.get(':nth-child(3) > .login__input').type('Contra123')
      cy.wait(1000)
      cy.get('.button__text').click()
      cy.wait(1000)
      cy.get('.ml-0').should('have.text', 'Medicare')
      cy.wait(1000)
      cy.get(':nth-child(2) > .info-doctor').click()
      cy.wait(1000)
      cy.get(':nth-child(21) > .btn').click()
      cy.wait(1000)
      cy.get('input').type('lele pancha')
      cy.wait(1000)
      cy.get('tr > :nth-child(4) > .btn').click()
      cy.wait(1000)
      cy.get('.swal-text').should('have.text', 'La cita ha sido agendada exitosamente')
      cy.wait(1000)
      cy.get('.swal-button').click()
    })
  })