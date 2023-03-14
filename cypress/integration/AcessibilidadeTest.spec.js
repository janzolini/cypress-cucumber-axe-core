import { callback } from '../support/commands.js';
import { terminalLog } from '../support/commands.js';

// Testes...
describe('Automação de Acessibilidade', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit("/")
    cy.injectAxe();
  });

  it('Verifica todas as falhas de acessibilidade', () => {
    cy.checkA11y(null, null, terminalLog)
  });

  it('Exclui testes no botão Buscar', () => {
    cy.checkA11y({ exclude: ['[data-testid=button-see-offers]'] }, null, terminalLog)
  });

  it('Verifica falha apenas no botão Ligar', () => {
    cy.checkA11y('[data-testid=button-see-offers]', null, terminalLog)
  });

  it('Verifica falha com impacto Sério ou Crítico', () => {
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, callback);
  });

  it('Exclui os testes de contraste', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: false },
      },
    }, terminalLog);
  });

  it('Exclui os testes de contraste e verifica apenas impacto Sério ou Crítico', () => {
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious'],
      rules: { 'color-contrast': { enabled: false }, },
    }, terminalLog);
  });

});
