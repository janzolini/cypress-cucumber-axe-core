const fs = require('fs');

class AccessibilityReportGenerator {
  constructor(violations, screenshotName) {
    this.violations = violations;
    this.screenshotName = screenshotName;
    this.severityIcons = {
      minor: '⚪️',
      moderate: '🟡',
      serious: '🟠',
      critical: '🔴',
    };
  }

  getSeverityIcon(severity) {
    return this.severityIcons[severity] || '';
  }

  generateHTMLReport() {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accessibility Report</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
            max-width: 1200px;
            margin: auto;
          }
          h1 {
            text-align: center;
            color: #0069ad;
            font-size: 2.5em;
            margin-bottom: 20px;
          }
          .screenshot-container {
            text-align: center;
            margin-bottom: 30px;
          }
          .screenshot-container img {
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            height: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          th, td {
            padding: 15px;
            text-align: left;
          }
          thead {
            background-color: #0069ad;
            color: white;
          }
          th {
            font-size: 1.2em;
          }
          tbody tr:nth-child(odd) {
            background-color: #f4f4f4;
          }
          tbody tr:nth-child(even) {
            background-color: white;
          }
          .severity {
            display: flex;
            align-items: center;
          }
          .severity-icon {
            margin-right: 10px;
            font-size: 1.5em;
          }
          .footer {
            text-align: center;
            font-size: 0.9em;
            color: #666;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Accessibility Test Report</h1>
      <table>
        <thead>
          <tr>
            <th>Severity</th>
            <th>Issue</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${this.violations.map(violation => `
          <tr>
            <td class="severity">
              <span class="severity-icon">
               ${this.getSeverityIcon(violation.severity)}
              </span>
                ${violation.severity ? violation.severity.charAt(0).toUpperCase() + violation.severity.slice(1) : 'Unknown'}
            </td>
              
            <td>
              <a href="${violation.helpUrl}" target="_blank" style="color: #0069ad; text-decoration: none;">
                ${violation.help}
              </a>
            </td>
            <td>
              Affected Nodes: ${violation.nodes.join(', ')}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Adicionando a legenda explicando o que cada ícone representa -->
      <div class="severity-legend" style="margin-top: 20px;">
        <h2>Severity Legend</h2>
        <ul style="display: flex;list-style-type: none;padding-left: 0;">

          <li style="margin-left: 16px;"><span class="severity-icon">⚪️</span> Minor</li>
          <li style="margin-left: 16px;"><span class="severity-icon">🟡</span> Moderate</li>
          <li style="margin-left: 16px;"><span class="severity-icon">🟠</span> Serious</li>
          <li style="margin-left: 16px;"><span class="severity-icon">🔴</span> Critical</li>
        </ul>
        
      </div>
        <div class="screenshot-container">
          <h2>Page Screenshot</h2>
          <img src="${this.screenshotName}" alt="Page Screenshot" />
        </div>
        <div class="footer">
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  }

  saveReport(reportPath) {
    const reportContent = this.generateHTMLReport();
    fs.writeFileSync(reportPath, reportContent);
    return reportPath;
  }
}

module.exports = AccessibilityReportGenerator;
