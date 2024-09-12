import WelcomePage from "./welcome_page";

export default function HomePage({
    data,
    restId,
    table,
    bgColor
}: {
    data: any;
    restId: string;
    table: string;
    bgColor: string;
}) {
   

    return (
        <div className="">
            <div className="">
                <WelcomePage data={data} restId={restId} table={table} bgColor={bgColor} />
            </div>
        </div>
    );
}
