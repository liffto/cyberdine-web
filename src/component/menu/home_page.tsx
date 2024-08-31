import WelcomePage from "./welcome_page";

export default function HomePage({
    data,
    restId,
    table
}: {
    data: any;
    restId: string;
    table: string;
}) {
   

    return (
        <div className="">
            <div className="">
                <WelcomePage data={data} restId={restId} table={table} />
            </div>
        </div>
    );
}
