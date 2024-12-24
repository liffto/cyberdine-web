import Image from "next/image";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from "next/link";
export default function ProductBottommButton({ cartCount, pendingCount, approvedCount, restId, table, isOrderFlow }: {
    cartCount: number; pendingCount: number; approvedCount: number; restId: string;
    table: string; isOrderFlow: boolean
}) {
    return (
        <div className="fixed bottom-0 z-20 bg-white w-full px-4 py-3 flex justify-between" style={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="flex items-center">
                <img src={'/images/svg/placed_order.svg'} alt="placed order" height={20} width={20} />
                <div className="ml-2">
                    <div className="text-xs font-semibold">{`${cartCount} Selected`}</div>
                    {isOrderFlow && <div className="text-sm text-gray-400">{pendingCount} waiting | {approvedCount} approved</div>}
                </div>
            </div>
            <Link href={cartCount == 0 ? table ? `/rest/${restId}/orders?table=${table}` : `/rest/${restId}/orders` : table ? `/rest/${restId}/cart?table=${table}` : `/rest/${restId}/cart`}>
                <div className={`text-white flex justify-center no-underline bg-primary w-44 py-2 rounded font-semibold text-lg`} >
                    <div className="">{cartCount == 0 ? "My Orders" : isOrderFlow ? "View Cart" : "View Wishlist"}</div>
                    <div className=""><ArrowRightIcon /></div>
                </div>
            </Link>
        </div>
    )
}