"use client";
import { useState, useEffect, useRef } from "react";
import Topbar from "./topbar";
import ProductDisplay from "./products_display";
import WelcomePage from "./welcome_page";

export default function HomePage({
    data,
    restId,
    table,
    topic,
    bgColor,
    notification,
    plan,
    isPayCompleted,
    customerDetails,
    review,
}: {
    data: any;
    restId: string;
    table: string;
    topic: string;
    bgColor: string;
    notification: boolean;
    plan: string;
    isPayCompleted: boolean;
    customerDetails: boolean;
    review: string;
}) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [menuType, setMenuType] = useState<string>('');
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    const enterValuesInHiddenInput = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.click();
        }
    };

    useEffect(() => {
        enterValuesInHiddenInput();

        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            setShowMenu(false);
            setMenuType('');
        };
        window.addEventListener("popstate", handlePopState);
        window.history.pushState({ modalOpened: false }, "");

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const onMenuClick = (type: string) => {
        setShowMenu(true);
        setMenuType(type)
    };

    return (
        <div className="">
            {!showMenu && (
                <div className="">
                    <WelcomePage onMenuClick={onMenuClick} data={data} />
                </div>
            )}
            {showMenu && (
                <div className="">
                    <Topbar data={data} />
                    <ProductDisplay
                        restId={restId}
                        table={table}
                        topic={topic}
                        notification={notification}
                        bgColor={bgColor}
                        plan={plan}
                        isPayCompleted={isPayCompleted}
                        customerDetails={customerDetails}
                        review={review} menuType={menuType}                    />
                </div>
            )}

            {/* Assuming you need this hidden input somewhere */}
            <input type="hidden" ref={hiddenInputRef} />
        </div>
    );
}
