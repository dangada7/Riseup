import cheerio from 'cheerio';
import axios from 'axios';
import {classTransaction} from "@/parser/classes";

export async function parseTransactions() {
    const {data: htmlFile} = await axios.get('/html-files/transactions.html');
    const $ = cheerio.load(htmlFile);

    let trArr = $('tr')
    let firstTrToParse = 4
    let ansArr = []

    // parse
    for(let i=firstTrToParse; i<trArr.length-1; i++){
        let $row = cheerio.load(trArr[i])
        ansArr.push(new classTransaction({
            transactionDate: $row('td')[0].attribs.title,
            businessName: $row('td')[1].attribs.title,
            transactionAmount: $row('td')[2].children[0].data,
        }))
    }

    return ansArr

}

