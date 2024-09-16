import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { reportHTML } from '../../support/commands.js';
// import { callback } from '../../support/commands.js';
// import { terminalLog } from '../../support/commands.js';


Given('que eu acesso a página inicial', () => {
    cy.visit('https://www.guia-wcag.com/')
})

When('validar a acessibilidade da página', () => {
    cy.injectAxe();
})

// Verifica todas as falhas de acessibilidade da página.
Then('a página deve passar nos testes de acessibilidade', () => {
    cy.checkA11y(null, null, reportHTML)
});

// Exclui o elemento com a classe '.color-mode-dark' da verificação.
Then('exclui o botão Buscar da verificação de acessibilidade', () => {
    cy.checkA11y({ exclude: ['.color-mode-dark'] }, null, reportHTML)
});

// Realiza a verificação apenas no elemento com a classe '.color-mode-dark'.
Then('verifica a acessibilidade apenas no botão Ligar', () => {
    cy.checkA11y('.color-mode-dark', null, reportHTML)
});

// Verifica falhas com impacto crítico ou sério.
Then('verifica falhas de acessibilidade com impacto sério ou crítico', () => {
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, reportHTML)
});

// Exclui a regra de contraste de cores.
Then('exclui a verificação de contraste de cores', () => {
    cy.checkA11y(null, { rules: { 'color-contrast': { enabled: false } } }, reportHTML)
});

// Exclui contraste e verifica impacto sério/crítico.
Then('verifica apenas impacto sério ou crítico, excluindo contraste de cores', () => {
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'], rules: { 'color-contrast': { enabled: false } } }, reportHTML)
});