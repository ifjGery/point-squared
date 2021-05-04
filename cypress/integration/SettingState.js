describe('My first test', () => {
  it('Visits the page', () => {
    cy.visit('/');
  });

  it('Can set a task to done', () => {
    cy.visit('/');

    cy.get('.state-selector > span').first().should('have.text', 'to do');
    cy.contains('done').click();
    cy.get('.state-selector > span').first().should('have.text', 'done');
  });
});
