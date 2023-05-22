describe('ui-toolkit', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uitoolkitcomponent--primary'));
  it('should render the component', () => {
    cy.get('jfc-ui-toolkit').should('exist');
  });
});
