describe("Appointments", () => {
  
  //separated this test block because it starts the same way for everyone
  beforeEach(() => {
     
    //Cypress function to rerun the tests. Because after Save, if run again will fail
    cy.request("GET", "/api/debug/reset")
    
    cy.visit("/");
    
    //find if have Monday on page
    cy.contains("Monday")
  });




  it("should book an interview", () => {
    //looking for + to add with [alt=Add] attribute
    cy.get("[alt=Add]")
      .first() //We need to use first because there are two Add buttons
      .click();    
    
    //find the input [data-testid=student-name-input] and type the text "Lydia Miller-Jones".
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //find interviewer with name "Sylvia Palmer" and click
    cy.get("[alt='Sylvia Palmer']").click();

    //use the text content to find Save and click
    cy.contains("Save").click();

    //verify that  show the student and interviewer names in the second appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });
 

  it("should edit an interview", () => {
    
    cy.get("[alt=Edit]")
      .first() 
      .click({ force: true }); 

    //find the input name , clear and type new name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    //change the interviewer 
    cy.get("[alt='Tori Malcolm']").click();

    //click to save
    cy.contains("Save").click();

    //check if show on the card
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
    
  });


  it ("should cancel an interview", () => {

    cy.get("[alt=Delete]")
      .first() 
      .click({ force: true }); 

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  });

});
