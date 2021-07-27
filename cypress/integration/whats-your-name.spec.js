describe("Whats Your Name", function() {
  it("Check if title and text boxes appear", function() {
    cy.visit('/')

    cy.get('#welcome').should('contain', 'Get your game on')




  })
})
