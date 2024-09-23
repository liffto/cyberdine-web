"use client"
import Image from "next/image"
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useRouter } from "next/navigation";

export default function Topbar({ data }: { data: any }) {
    const { back } = useRouter();

    return (
        <div className="pt-4 px-4 md:container bg-[#fafafa]">
            <div className="flex items-center">
                <div className="flex-1">
                    <div className="flex gap-4">
                        <div className="rounded-full overflow-hidden w-[50px] h-[50px] flex items-center justify-center boxshadow-3">
                            {data?.logo ? <Image src={data.logo} alt="restarunt logo" height={50} width={50} />
                                : <StorefrontIcon />
                            }
                        </div>
                        <div className="">
                            <div className="text-xl truncate font-bold">
                                {data.hname}
                            </div>
                            <div className="text-primary font-medium">
                                {data.haddress}
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={()=>{back()}} >
                    <Image
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