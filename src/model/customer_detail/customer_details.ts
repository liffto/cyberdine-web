import { FirebaseServices } from "@/service/firebase.service";

export class CustomerDetails {
    phoneNumber: Number | null = null;
    date: string | null = null;
    deviceId: string | null = null;

    constructor(data?: CustomerDetails) {
        if (data) {
            this.phoneNumber = data.phoneNumber;
            this.date = data.date;
            this.deviceId = data.deviceId;
        }
    }
}