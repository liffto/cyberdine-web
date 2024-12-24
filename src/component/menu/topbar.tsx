"use client"
import Image from "next/image"
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useRouter } from "next/navigation";
export default function Topbar({ data, restId, table }: { data: any, table: any, restId: any }) {
    const router = useRouter();
    const handleClick = () => {
        router.replace(table ? `/rest/${restId}?table=${table}` : `/rest/${restId}`);
    };
    return (
        <div className="pt-4 px-4 md:container bg-[#fafafa]">
            <div className="flex items-center">
                <div className="flex-1">
                    <div className="flex gap-3 items-center justify-start ">
                        <div onClick={() => { handleClick() }} className="rounded-full overflow-hidden w-[50px] h-[50px] flex items-center justify-center">
                            {data?.logo ? <img src={data.logo} alt="restarunt logo" height={50} width={50} />
                                : <StorefrontIcon />
                            }
                        </div>
                        <div onClick={() => { handleClick() }} className="">
                            <div className="text-lg truncate font-bold leading-tight">
                                {data.hname}
                            </div>
                            <div className="text-primary font-medium leading-none">
                                {data.haddress}
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => { handleClick() }} >
                    <img
                        className=""
                        src={"/images/png/home_button.png"}
                        alt={"home button"}
                        height={50}
                        width={40}
                    />
                </div>
            </div>
        </div>
    )
}