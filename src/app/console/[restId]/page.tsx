import HotelDetailsCompoent from "@/component/console/manageOrg/hotelDetails/hotelDetails";

export default async function ConsolePage({
    params, searchParams
}: {
    params: { restId: string }; searchParams: { table: string }
}) {
    // const response = await fetch(
    //     `${(process.env.NODE_ENV == "development")
    //         ? "http://localhost:3000"
    //         : "https://www.cyberdine.in"
    //     }/api/rest/${params.restId}/detail`);
    // const json = await response.json();

    return (
        <div className="restaraunt-backround" >
            <HotelDetailsCompoent />
        </div>
    );
}
