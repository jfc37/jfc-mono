describe('ui', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=avatarcomponent--primary&args=src;')
  );
  it('should render the component', () => {
    cy.get('jfc-avatar').should('exist');
  });
});
