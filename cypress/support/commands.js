const severityIndicators = {
    minor: '⚪️',
    moderate: '🟡',
    serious: '🟠',
    critical: '🔴',
}

export function callback(violations) {
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))

        Cypress.log({
            name: `${severityIndicators[violation.impact]} A11Y`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        })

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '🔧',
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message: target
            })
        })
    });
}

export function terminalLog(violations) {
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

export function reportHTML(violations) {
    const screenshotName = `accessibility-screenshot-${new Date().getTime()}`;

    // Tira um screenshot da página atual
    cy.screenshot(screenshotName, { capture: 'viewport' });

    // Prepara os dados de violações para o relatório
    const violationsData = violations.map(violation => ({
        severity: severityIndicators[violation.impact],
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map(node => node.target.join(', ')),
    }));

    // Chama a tarefa para gerar o relatório
    cy.task('generateAccessibilityReport', {
        violations: violationsData,
        screenshotName: `../../cypress/screenshots/a11y.feature/${screenshotName}.png`
    });

    // Exibe as violações no console do Cypress
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','));

        Cypress.log({
            name: `${severityIndicators[violation.impact]} A11Y`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        });

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '🔧',
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message: target
            });
        });
    });
}
