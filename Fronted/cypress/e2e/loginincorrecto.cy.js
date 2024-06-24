describe('Login test incorrecto', () => {
  it('No deberia iniciar sesion y mostrar mensaje de error', () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(2) > .login__input').type('garciajonatan56@gmail.com')
    cy.wait(1000)
    cy.get(':nth-child(3) > .login__input').type('123456')
    cy.wait(1000)
    cy.get('.button__text').click()
    cy.wait(1000)
    cy.get('.swal-text').should('have.text', 'No se pudo iniciar sesión')
    cy.wait(1000)
    cy.get('.swal-button').click()
  })
})