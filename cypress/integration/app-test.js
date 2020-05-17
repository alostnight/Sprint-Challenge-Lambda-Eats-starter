describe("This is our first test!", () => {
    it("Should return true", () => {
      expect(true).to.equal(true);
    });
  });
  
  describe("Testing our form inputs", () => {
    beforeEach(function () {
      cy.visit("http://localhost:3000/pizza");
    });
  
    it("Input Name in the Name", () => {
      //Arrange - Get the Element
      //ACT - Mimic User Interaction
      //Assert - Test / Verify
      cy.get('input[name="name"]')
        .type("Jose Paquian ")
        .should("have.value", "Jose Paquian ");
        cy.get('#sizes')
          .select('personal').should('have.value', 'personal'); 
        cy.get('input[name="pepperoni"]').check().should("be.checked");
        cy.get('input[name="chicken"]').check().should("be.checked");
        cy.get('input[name="pineapple"]').check().should("be.checked");
        cy.get('textarea')
        .type("Double Meat.")
        .should("have.value", "Double Meat.");
        cy.get('form').submit();
  
    });
  });