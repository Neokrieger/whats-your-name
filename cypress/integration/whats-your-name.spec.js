describe("Whats Your Name", function() {
  it("can show you your full name", function() {
    cy.visit('/')
    cy.get('#welcome').should("contain", "Hi, team!")
    cy.get('#first-name').type("Edward")
    cy.get('#last-name').type("Withers")
    cy.get('#submit-button').click()
    cy.get('#full-name').should("contain", "Edward Withers")
  })
})
