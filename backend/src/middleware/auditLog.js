const fs = require('fs');
const path = require('path');

const auditLogPath = path.join(__dirname, '../../logs/audit.log');

function logAudit({ user, action, resource, details }) {
  const entry = {
    timestamp: new Date().toISOString(),
    user: user || 'anonymous',
    action,
    resource,
    details,
  };
  fs.appendFile(auditLogPath, JSON.stringify(entry) + '\n', (err) => {
    if (err) console.error('Audit log error:', err);
  });
}

module.exports = logAudit;
