// import the query function
const { query } = require('../Config/dbconfig'); 

// import fs
const fs = require('fs');
const path = require('path');

// write function
async function install() {

  // ✅ correct path
  const queryFile = path.join(__dirname, '../sql/initial-queries.sql');

  let queries = [];
  let finalMessage = {};
  let templine = '';

  // ✅ remove await
  const lines = fs.readFileSync(queryFile, 'utf-8').split('\n');

  // extract queries
  lines.forEach((line) => {
    if (line.trim().startsWith('--') || line.trim() === '') return;

    templine += line;

    if (line.trim().endsWith(';')) {
      queries.push(templine.trim());
      templine = '';
    }
  });

  // execute queries
 for (let i = 0; i < queries.length; i++) {
  console.log("Running Query:", queries[i]);
  try {
    if (!queries[i]) continue; // ✅ skip empty

    await query(queries[i]);
    console.log('Table created successfully');

  } catch (error) {
    console.log("❌ SQL ERROR:", error.sqlMessage || error.message);
    finalMessage.message = "Not all tables are created successfully";
  }
}

  // final result
  if (!finalMessage.message) {
    finalMessage.message = "All tables are created successfully";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }

  return finalMessage;
}

module.exports = {
  install
};