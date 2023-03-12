function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // Retirar chaves específicas para manter a tabela legível
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

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
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, terminalLog);
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
