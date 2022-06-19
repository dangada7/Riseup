

export class classTransaction {

    transactionDate
    businessName
    transactionAmount

    constructor({transactionDate, businessName, transactionAmount}) {
        this.transactionDate = transactionDate
        this.businessName = businessName
        this.transactionAmount = parseFloat(transactionAmount)
    }
}