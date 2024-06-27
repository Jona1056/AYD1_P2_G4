describe('Test cancelar cita por parte del Usuario', () => {
    it('Iniciar Sesion ir a ver citas activas y cancelar cita', () => {
      cy.visit('http://localhost:5173/')
      cy.get(':nth-child(2) > .login__input').type('garciajonatan56@gmail.com')
      cy.wait(1000)
      cy.get('.button__text').click()
      cy.wait(1000)
      cy.get('.ml-0').should('have.text', 'Medicare')
      cy.wait(1000)
      cy.get('.me-auto > :nth-child(2)').click()
      cy.wait(1000)
      cy.get(':nth-child(1) > .buttoncancelar > .front').click()
      cy.wait(1000)
      cy.get('.swal-text').should('have.text', 'La cita ha sido cancelada')
      cy.wait(1000)
      cy.get('.swal-button').click()
        
    })
  })