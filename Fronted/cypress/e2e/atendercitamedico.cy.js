describe('Test atender cita medico', () => {
    it('Iniciar Sesion y atender una cita desde la vista del medico', () => {
      cy.visit('http://localhost:5173/')
      cy.get(':nth-child(2) > .login__input').type('doctor2@gmail.com')
      cy.wait(1000)
      cy.get(':nth-child(3) > .login__input').type('Contraseña123')
      cy.wait(1000)
      cy.get('.button__text').click()
      cy.wait(1000)
      cy.get('.ml-0').should('have.text', 'Medicare')
      cy.wait(1000)
      cy.get('.btn-success').click()
      cy.wait(1000)
      cy.get('.swal-text').should('have.text', 'La cita ha sido atendida')
      cy.wait(1000)
      cy.get('.swal-button').click()
    
    })
  })