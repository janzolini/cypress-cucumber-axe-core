

***

> O projeto Cypress Axe é uma integração do [Cypress](https://www.cypress.io/) com a biblioteca de acessibilidade [Axe-Core](https://github.com/dequelabs/axe-core). Que permite a realização dos testes de acessibilidade em aplicativos web de forma rápida e fácil.

## Instalação

- Para utilizar o Cypress Axe em seu projeto, basta instalar o pacote via npm:

```
npm install
```

## Como usar

- Para usar o Cypress Axe em seus testes, você precisa primeiro adicioná-lo ao seu arquivo `cypress/support/index.js`. Adicione a seguinte linha ao seu arquivo:

``` JS
import 'cypress-axe';
```

Em seguida, você pode usar o comando `cy.injectAxe()` para injetar o Axe-Core na página que está sendo testada:

``` JS
describe('Teste de acessibilidade', () => {
  it('Não deve conter violações de acessibilidade', () => {
    cy.visit('https://exemplo.com');
    cy.injectAxe();
    cy.checkA11y();
  });
});
```

## Configurações

O Cypress Axe possui algumas configurações que podem ser definidas no seu arquivo de suporte.

### Configuração global

Você pode definir configurações globais para todos os testes, adicionando o seguinte código ao seu arquivo `cypress/support/index.js`:

``` JS
import { configureAxe } from 'cypress-axe';

configureAxe({
  rules: {
    'color-contrast': { enabled: false }
  }
});
```

### Configuração por teste

Você também pode definir configurações por teste, adicionando um objeto de configuração como segundo argumento do comando `cy.checkA11y()`:

``` JS
describe('Teste de acessibilidade', () => {
  it('Não deve conter violações de acessibilidade', () => {
    cy.visit('https://exemplo.com');
    cy.injectAxe();
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: false }
      }
    });
  });
});
```

## Rodando o Cypress

Use a task ```npm run cypress:open``` para executar com a interface gráfica ou ```npm run cypress:run``` para executar no terminal.
