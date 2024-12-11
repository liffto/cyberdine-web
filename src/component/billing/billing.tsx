"use client";
import { MenuDataContext } from "@/context/menu.context";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import BottomButton from "../common/bottom_button";

interface BillingComponentsProps {
    restId: string;
    bgColor: string;
    table: string;
    topic: string;
}

const BillingComponents: React.FC<BillingComponentsProps> = ({ restId, bgColor, table }) => {
    const { cartMenuData } = useContext(MenuDataContext);
    const { back } = useRouter();
    const router = useRouter();
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [billId, setBillId] = useState<string>('');

    useEffect(() => {
        if (cartMenuData) {
            const response = cartMenuData.getFirstDateAndTime();
            if (response) {
                setDate(response?.date);
                setTime(response?.time);
                setBillId(response?.timestamp);
            }
        }
    }, [cartMenuData]);

    // Calculate Total Amount
    const calculateTotalAmount = (): number => {
        const menuList = cartMenuData?.getMenuList() || [];
        return menuList.reduce((acc, item: Item) => acc + (item.price! * item.quantity!), 0);
    };

    // Calculate Taxes
    const calculateTaxAmounts = (totalAmount: number) => {
        const cgstRate = 0.025; // 2.5%
        const sgstRate = 0.025; // 2.5%

        const cgstAmount = totalAmount * cgstRate;
        const sgstAmount = totalAmount * sgstRate;
        const totalTax = cgstAmount + sgstAmount;

        return { cgstAmount, sgstAmount, totalTax };
    };

    const totalAmount = calculateTotalAmount();
    const { cgstAmount, sgstAmount, totalTax } = calculateTaxAmounts(totalAmount);
    const grandTotal = totalAmount + totalTax;


    const handleClick = () => {
        router.replace(`/rest/${restId}/menu?table=${table}`);
    };

    return (
        <div className="md:container mx-auto">
            <div className="border border-primary mx-4 mt-2"></div>
            <div className="mx-4 mt-2 font-semibold flex justify-between items-center">
                <div>Bill no: {billId ?? ''}</div>
                <div>{date ?? ''}</div>
            </div>
            <div className="mx-4 mb-2 text-sm flex justify-between items-center">
                <div>Table {table}</div>
                <div>{time ?? ''}</div>
            </div>
            {cartMenuData && cartMenuData?.getMenuList() && cartMenuData?.getMenuList()!.length > 0 && (
                <div className="mt-4">
                    <table className="w-full">
                        <thead>
                            <tr className="text-white text-base bg-primary">
                                <th className="py-2 px-4 text-left">Item</th>
                                <th className="py-2 px-4 text-left">Rate(&#x20B9;)</th>
                                <th className="py-2 px-4 text-left">Qty</th>
                                <th className="py-2 px-4 text-left">Amount(&#x20B9;)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartMenuData.getMenuList()!.map((item: Item, index: number) => (
                                <tr key={index} className="font-semibold">
                                    <td className="py-2 px-4">{item.name}</td>
                                    <td className="py-2 px-4 text-center">{item.price!.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                                    <td className="py-2 px-4 text-start">{(item.price! * item.quantity!).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="text-sm">
                                <td className="py-2 px-4">Sub Total <span className="text-xs">{"(Inclusive Of Tax)"}</span></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-start">&#x20B9;{totalAmount.toFixed(2)}</td>
                            </tr>
                            <tr className="text-sm">
                                <td className="py-2 px-4">CGST (2.5%)</td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-start">&#x20B9;{cgstAmount.toFixed(2)}</td>
                            </tr>
                            <tr className="text-sm">
                                <td className="py-2 px-4">SGST (2.5%)</td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-start">&#x20B9;{sgstAmount.toFixed(2)}</td>
                            </tr>
                            <tr className="text-sm">
                                <td className="py-2 px-4">Total Tax</td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-start">&#x20B9;{totalTax.toFixed(2)}</td>
                            </tr>
                            <tr className="font-semibold text-sm">
                                <td className="py-2 px-4">Amount To Pay</td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-center"></td>
                                <td className="py-2 px-4 text-start">&#x20B9;{grandTotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className="text-center text-base my-2 text-gray-400">Thank you, visit again</div>
            <div className="h-20"></div>
            <BottomButton onBackClick={back} onNextClick={handleClick} backButton={"Back"} nextButton={"Download Bill"} />
        </div>
    );
};

export default BillingComponents;
