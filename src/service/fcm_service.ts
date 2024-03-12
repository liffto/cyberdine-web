import axios from "axios";

export class FcmService {
    static shared: FcmService = new FcmService();

    async fcmTopic(body: any): Promise<any | null> {
        try {
            console.log("body", body);
            let response = await axios.post(`${process.env.NODE_ENV =="development"?"http://localhost:3000":"https://cyberdine.in"}/api/request/fcm`, body);
            console.log("response.status", response.status);

            if (response.status! >= 200 && response.status! <= 299 && response.data) {
                return response.data["data"] != null ? response.data["data"] : null;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };

}