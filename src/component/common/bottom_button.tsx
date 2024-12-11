export default function BottomButton({
    onBackClick,
    onNextClick,
    wait,
    backButton,
    nextButton
}: {
    onBackClick: () => void;
    onNextClick: () => void;
    wait?: boolean;
    backButton: string;
    nextButton: string;
}) {
    return (
        <div
            className={`fixed bottom-0 bg-primary text-white text-base text-center w-full py-3 font-semibold`}
        >
            <div className="flex justify-evenly items-center">
                <div className={`${nextButton ? '' : 'bg-white w-full py-2 rounded-sm font-bold text-lg text-primary mx-4'}`} onClick={onBackClick} >{backButton}</div>
                {nextButton && <div onClick={onNextClick} className={`${wait ? "text-gray-300" : " text-primary"} no-underline bg-white w-44 py-2 rounded-sm font-bold text-lg `} >{nextButton}</div>}
            </div>
        </div>
    );
}