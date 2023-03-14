import { callback } from '../support/commands.js';
import { terminalLog } from '../support/commands.js';

describe('Automação de Acessibilidade', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit("/")
    cy.injectAxe();
  });

  it('Verifica falha com impacto Sério ou Crítico', () => {
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious'],
      rules: { 'color-contrast': { enabled: false }, },
    }, callback);
  });

  it('Verifica falha com impacto Sério ou Crítico', () => {
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious'],
      rules: { 'color-contrast': { enabled: false }, },
    }, terminalLog);
  });

});