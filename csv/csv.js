const parse = require('csv-parse');
const fs = require('fs');

const csvData = [];

fs.createReadStream(__dirname + '/baseWaveLength.txt')
  .pipe(
    parse({
      delimiter: '\t',
    })
  )
  .on('data', function (dataRow) {
    csvData.push(dataRow);
  })
  .on('end', function () {
    console.log(csvData);
  });
