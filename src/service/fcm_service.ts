import axios from "axios";

export class FcmService {
    static shared: FcmService = new FcmService();

    async fcmTopic(body: any): Promise<any | null> {
        try {
            const headers = {
                "Access-Control-Allow-Origin": "https://www.cyberdine.in",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            };

            let response = await axios.post(`${process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://www.cyberdine.in"}/api/request/fcm`, body, { headers });

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