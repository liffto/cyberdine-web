import BillingComponents from "@/component/billing/billing";
import Topbar from "@/component/menu/topbar";

export default async function Billing({
    params, searchParams
}: {
    params: { restId: string }; searchParams: { table: string }
}) {
    const response = await fetch(
        `${process.env.NODE_ENV == "development"
            ? "http://localhost:3000"
            : "https://www.cyberdine.in"
        }/api/rest/${params.restId}/detail`, { next: { revalidate: 60 * 60 * 2 } }
    );
    const json = await response.json();
    function lightenColor(hex: string, percent: any) {
        // Parse the hex color to get RGB components
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        // Calculate the lightened RGB values
        r = Math.round(r * (100 + percent) / 100);
        g = Math.round(g * (100 + percent) / 100);
        b = Math.round(b * (100 + percent) / 100);

        // Ensure values stay within the 0-255 range
        r = (r < 255) ? r : 255;
        g = (g < 255) ? g : 255;
        b = (b < 255) ? b : 255;

        // Convert back to hex
        let hexR = r.toString(16).padStart(2, '0');
        let hexG = g.toString(16).padStart(2, '0');
        let hexB = b.toString(16).padStart(2, '0');

        return '#' + hexR + hexG + hexB;
    }
    return (
        <div className="restaraunt-backround"
            style={
                {
                    "--primary-bg": "#" + json.data.hcolor?.slice(2, 10),
                    "--secondary-bg": lightenColor('#' + json.data.hcolor?.slice(2, 10), 40) + "4a",
                } as React.CSSProperties
            }>
            <Topbar data={json.data} />
            <BillingComponents restId={params.restId} bgColor={"#" + json.data.hcolor?.slice(2, 10)} table={searchParams.table} topic={json?.data?.fcmTopic} />
        </div>
    );
}
