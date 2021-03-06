import 'cypress-file-upload';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-1.8: Review Event Creation (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/create-event', geolocationStub);
    });

    it('should review the event', () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftarrow}');
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 12);
      cy.get('#eventTitle').type('test title');
      cy.get('.-today').click();
      cy.get('.-today').click();
      cy.get('#description').type('test description');

      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('#location-input-field-option-0').click();

      cy.get('[data-testid=pill-id-1]').click();
      cy.get('.create-event-button').click();

      cy.get('.event-page-title').should('have.text', 'test title');
      cy.get('.event-image').should('have.attr', 'src');
      cy.get('[data-testid=start-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}11:45 AM`
      );
      cy.get('[data-testid=end-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}12:00 PM`
      );
      cy.get('[data-testid=event-page-location]').should('have.text', 'Current Location');
      cy.get('[data-testid=expandable-text-div]').should('have.text', 'test description');
      cy.get('[data-testid=event-restriction]').should('have.text', 'Friends');
    });

    it('should review the event, then allow the user to edit the form', () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftArrow}');
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 12);
      cy.get('#eventTitle').type('test title');
      cy.get('.-today').click();
      cy.get('.-today').click();
      cy.get('#description').type('test description');

      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('#location-input-field-option-0').click();

      cy.get('[data-testid=pill-id-1]').click();
      cy.get('.create-event-button').click();

      cy.get('.mull-back-button').click();
      cy.get('#eventTitle').clear().type('new test title');
      cy.get('#description').clear().type('new test description');

      cy.get('[data-testid=pill-id-0]').click();
      cy.get('.create-event-button').click();

      cy.get('.event-page-title').should('have.text', 'new test title');
      cy.get('.event-image').should('have.attr', 'src');
      cy.get('[data-testid=start-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}11:45 AM`
      );
      cy.get('[data-testid=end-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}12:00 PM`
      );
      cy.get('[data-testid=event-page-location]').should('have.text', 'Current Location');
      cy.get('[data-testid=expandable-text-div]').should('have.text', 'new test description');
      cy.get('[data-testid=event-restriction]').should('have.text', 'Everyone');
    });
  });
});
