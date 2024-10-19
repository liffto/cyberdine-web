export class FeedBackDetailsModel {
    phoneNumber: Number | null = null;
    customerName: string | null = null;
    date: string | null = null;
    feedBackId: string | null = null;
    starCounnt: Number | null = null;
    feedBack: string | null = null;

    constructor(data?: FeedBackDetailsModel) {
        if (data) {
            this.phoneNumber = data.phoneNumber;
            this.date = data.date;
            this.feedBackId = data.feedBackId;
            this.customerName = data.customerName;
            this.starCounnt = data.starCounnt;
            this.feedBack = data.feedBack;
        }
    }
}