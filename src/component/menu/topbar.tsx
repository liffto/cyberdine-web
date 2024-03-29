import Image from "next/image"
import StorefrontIcon from '@mui/icons-material/Storefront';
export default function Topbar({ data }: { data: any }) {
    return (
        <div className="pt-4 pb-2 px-4 md:container bg-[#fafafa]">
            <div className="flex items-center">
                <div className="flex-1">
                    <div className="text-xl truncate font-bold">
                        {data.hname}
                    </div>
                    <div className="text-primary font-medium">
                        {data.haddress}
                    </div>
                </div>
                <div className="rounded-full overflow-hidden w-[50px] h-[50px] flex items-center justify-center boxshadow-3">
                    {data?.logo ? <Image src={data.logo} alt="restarunt logo" height={50} width={50} />
                        : <StorefrontIcon />
                    }
                </div>
            </div>
        </div>
    )
}