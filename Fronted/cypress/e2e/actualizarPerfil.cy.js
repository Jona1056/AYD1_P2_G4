describe('Test Actualizar Perfil', () => {
    it('Iniciar Sesion y actualizar Perfil', () => {
      cy.visit('http://localhost:5173/')
      cy.get(':nth-child(2) > .login__input').type('garciajonatan56@gmail.com')
      cy.wait(1000)
      cy.get('.button__text').click()
      cy.wait(1000)
      cy.get('.ml-0').should('have.text', 'Medicare')
      cy.wait(1000)
      cy.get('.me-auto > :nth-child(4)').click()
      cy.wait(1000)
      cy.get('#formApellido').type('Garcia')
      cy.wait(1000)
      cy.get('.mt-4').click()
      cy.wait(1000)
      cy.get('.swal-text').should('have.text', 'Perfil actualizado correctamente')
      cy.wait(1000)
      cy.get('.swal-button').click()
    })
  })