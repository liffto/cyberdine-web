import Image from "next/image"
export default function Topbar({data}:{data:any}){
    return (
        <div className="sticky top-0 py-4 shadow px-4 md:container bg-white z-10">
            <div className="flex items-center">
                <div className="flex-1">
                    <div className="text-xl">
                        {data.hname}
                    </div>
                    <div className="text-primary font-bold">
                        {data.haddress}
                    </div>
                </div>
                <div className="rounded-full overflow-hidden">
                    <Image src={data.logo} alt="restarunt logo" height={60} width={60} />
                </div>
            </div>
        </div>
    )
}