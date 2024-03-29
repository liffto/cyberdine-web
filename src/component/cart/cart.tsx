"use client";

import { useRouter } from "next/navigation";


interface CartComponentProps {
}

const CartComponent: React.FC<CartComponentProps> = () => {
    const { back } = useRouter();

    return (
        <div className="container mx-auto">
            <div className="border border-primary mx-4 mt-2"></div>
            <div
                className={` fixed bottom-0 bg-primary text-white text-lg text-center flex justify-evenly items-center w-full py-2 font-semibold`}
            >
                <div className="" onClick={() => {
                    back();
                }} >Select More</div>
                <div className="bg-white px-8 py-2 rounded-sm font-bold text-base text-primary" >Request Waiter</div>
            </div>
        </div>
    );
};

export default CartComponent;
