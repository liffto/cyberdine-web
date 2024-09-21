import Image from "next/image";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from "next/link";
export default function ProductBottommButton({ cartCount, pendingCount, approvedCount, restId, table }: {
    cartCount: number; pendingCount: number; approvedCount: number; restId: string;
    table: string;
}) {
    return (
        <div className="fixed bottom-0 z-20 bg-white w-full px-4 py-3 flex justify-between" style={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="flex items-center">
                <Image src={'/images/svg/placed_order.svg'} alt="placed order" height={20} width={20} />
                <div className="ml-2">
                    <div className="text-sm font-semibold">{pendingCount} waiting | {approvedCount} approved</div>
                    <div className="text-xs text-gray-400">View Cart</div>
                </div>
            </div>
            <Link href={cartCount == 0 ? `/rest/${restId}/orders?table=${table}` : `/rest/${restId}/cart?table=${table}`}>
                <div className={`text-white flex justify-center no-underline bg-primary w-44 py-2 rounded font-semibold text-lg`} >
                    <div className="">{cartCount == 0 ? "My Orders" : "View Cart"}</div>
                    <div className=""><ArrowRightIcon /></div>
                </div>
            </Link>
        </div>
    )
}