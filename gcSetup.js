const fs = require('fs');

fs.writeFile(process.env.GC_KEY_FILE, process.env.GC_CREDENTIALS, (err) => {});