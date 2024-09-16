#language: pt
@a11y
Funcionalidade: Testes de Acessibilidade com Axe Core

  Cenário: Verificação de todas as falhas de acessibilidade
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então a página deve passar nos testes de acessibilidade

  Cenário: Excluir o botão Buscar da verificação de acessibilidade
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então exclui o botão Buscar da verificação de acessibilidade

  Cenário: Verificar acessibilidade apenas no botão Ligar
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então verifica a acessibilidade apenas no botão Ligar

  Cenário: Verificar falhas com impacto sério ou crítico
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então verifica falhas de acessibilidade com impacto sério ou crítico

  Cenário: Excluir regra de contraste de cores
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então exclui a verificação de contraste de cores

  Cenário: Excluir regra de contraste de cores e verificar falhas de impacto sério ou crítico
    Dado que eu acesso a página inicial
    Quando validar a acessibilidade da página
    Então verifica apenas impacto sério ou crítico, excluindo contraste de cores
