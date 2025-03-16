describe('Form Validation', () => {
  it('shows errors if form is incorrect', () => {
    cy.visit('/')   
    cy.get('[cy-data="email"]').type('anil@unver.com'); // Geçerli bir email formatı
    cy.get('[cy-data="password"]').type('1234'); // 4 karakterli şifre
    cy.get('[cy-data="terms"]').check();
    cy.get('[cy-data="submit"]').click({ force: true });
  })

  it('shows succusfully is form', () => {
    cy.visit('/')
    
    // Geçerli bir email gir
    cy.get('[cy-data="email"]').type('anil@unver.com')
    
    // Geçerli bir şifre gir (4 karakter veya daha fazla)
    cy.get('[cy-data="password"]').type('Hweuhjsvshdss120*')
    
    // Şartları kabul et
    cy.get('[cy-data="terms"]').check()
    
    // Butonun etkinleşmesini bekle
    cy.get('[cy-data="submit"]')
      .should('not.be.disabled')
      .click()
  })
})