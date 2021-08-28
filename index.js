/*

CONFIG SECTION

*/

// add your BigQuery projectId Here
// you can get this inside the Google cloud console by navigationg to the project's home screen (Hamburger menu > Home)
// and then grabbing the value from the Project Info section.
const projectId = 'replace this with your Google Cloud ProjectId';

// add the BigQuery dataset where we'll be putting our data
// you'll need to make a dataset inside your BigQuery Project
// directions are here : https://cloud.google.com/bigquery/docs/datasets#create-dataset
const dataset = 'semrush';

// add the BigQuery table we'll be writing to
const table = 'domain_competitors';


// you'll need to add your semrush API Key below
// get that by logging into your semrush account and then going to https://www.semrush.com/billing-admin/profile/subscription/api-units
const semrushApiKey = 'replace this text with your api key';

// edit the domain you want to grab competitors for
let domain = 'semrush.com';

// Set the # of competitors that you want data for below.  
// this method costs $0.0005 per row

let limit = 3;

/*

END OF CONFIG SECTION

*/
/*

YOU DON'T NEED TO EDIT ANYTHING BELOW HERE (but you can if you want 🤭)

*/

//requiring Node Packages
const axios = require('axios');
const fsNdjson = require('fs-ndjson');
const fs = require('fs');
const {google} = require('googleapis');
const { BigQuery } = require('@google-cloud/bigquery');

const keyFilename = './creds.json';
const bigquery = new BigQuery({
    projectId,
    keyFilename
});
const date = new Date().toISOString().split('T')[0];
const now = Date.now();

async function helloSemrushWorld() {
    // let request = req.query.message || req.body || 'Hello World!';
    //console.log(request);
    
    try {
        
        // See the complete list at https://www.semrush.com/api-analytics/#columns
        // the available list for this method is 
        // Dn,Cr,Np,Or,Ot,Oc,Ad
        let columns = 'Dn,Cr,Np,Or,Ot,Oc,Ad'

        

        // see the complete list of availanble databases at: https://www.semrush.com/api-analytics/#databases
        let database = 'us';
        
        // sort options are np_desc, np_asc, cr_desc, cr_asc
        let displaySort = 'cr_desc';

        let method = 'domain_organic_organic';
        // https://api.semrush.com/?type=domain_organic_organic&key=yourapikeywillgohere&display_limit=10&export_columns=Dn,Cr,Np,Or,Ot,Oc,Ad&domain=seobook.com&database=us
        let response = await axios.get(`https://api.semrush.com/?type=${method}&key=${semrushApiKey}&display_limit=${limit}&export_columns=${columns}&domain=${domain}&display_sort=${displaySort}&database=${database}`, {
            responseType: 'text',
            forcedJSONParsing: true
        })
        console.log(response.data);
        const [headerLine, ...lines] = response.data.slice(0, -2).split('\r\n');
        const valueSeparator = ';';
        const headersIn = headerLine.split(valueSeparator);

        let headers = [];
        for (let i = 0; i < headersIn.length; i++) {
            let row = headersIn[i];
            let rowIn = row.replace(/ /g, '_');
            let rowMid = rowIn.replace(/\(%\)/g, 'percent');
            let rowOut = rowMid.toLowerCase();
            headers.push(rowOut);
        }
        headers = ['target_domain'].concat(headers);
        headers = headers.concat(['created_date']);
        
        console.log(headers);
        let linesOut = [];

        // we're adding a data field to each row so that we can filter by date
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].split(valueSeparator);
            console.log('line: ', line)
            let lineMid = [domain].concat(line);
            let lineOut = lineMid.concat([date]);
            console.log(lineOut);
            let row = lineOut.join(valueSeparator);
            linesOut.push(row);
        }

        console.log(linesOut)
        // Create objects from parsing lines
        // There will be as many objects as lines
        const objects = linesOut
            .map((line, index) =>
                line.split(valueSeparator).reduce((object, value, index) => ( {...object,[headers[index]]: value, }), {} ) );

        // we are writing this to a newline delimited JSON as that is what Google BigQuery Expects to see
        // if you want to learn more about this go to : https://cloud.google.com/bigquery/docs/batch-loading-data#node.js
        // and you can learn about loading JSON data by going to : https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-json
        await fsNdjson.writeFileSync('outputNew.ndjson', objects, 'utf8');
        let file = 'outputNew.ndjson';
        await loadLocalFile(file, domain, date, table, dataset);

    } catch (e) {
        console.log(e)

    }
    async function loadLocalFile(file, domain, date, table, dataset) {

        
        // add the JobId so we avoid duplicate data being pushed to BigQuery
        const metadata = {
            jobId: date + '-' + table + '-' + now,
            sourceFormat: 'NEWLINE_DELIMITED_JSON',
            writeDisposition: 'WRITE_APPEND',
            schema: {
                fields: [{
                    name: 'target_domain',
                    type: 'STRING'
                },{
                        name: 'domain',
                        type: 'STRING'
                    },
                    {
                        name: 'competitor_relevance',
                        type: 'FLOAT'
                    },
                    {
                        name: 'common_keywords',
                        type: 'INTEGER'
                    },
                    {
                        name: 'organic_keywords',
                        type: 'FLOAT'
                    },
                    {
                        name: 'organic_traffic',
                        type: 'INTEGER'
                    },
                    {
                        name: 'organic_cost',
                        type: 'INTEGER'
                    },
                    {
                        name: 'adwords_keywords',
                        type: 'INTEGER'
                    },
                    {
                        name: 'created_date',
                        type: 'STRING'
                    }
                ]
            }
        };
        try {
            console.log(date, ' - BQ Start ' + new Date().toISOString());

            const datasetId = bigquery.dataset(dataset);

            console.log(date, ' - ', table);
            const tableId = datasetId.table(table);
            const [
                job
            ] = await tableId.load(file, metadata);

            // get how many rows we successfully pushed to BQ
            const goodRows = job.statistics.load.outputRows;

            console.log(date, ' - ', table, ' - ', domain, ' - BQ rows Pushed - ', goodRows, metadata);

            //Remove the File so we script can be idempotent 
            fs.unlink(file, (err) => {
                if (err) throw err;
                console.log(file + ' was deleted');
            });

        } catch (e) {
            console.log(date, ' - ', domain, ' - BQ error - ', e.message, metadata);
            throw e;
        }
    }

}

helloSemrushWorld();