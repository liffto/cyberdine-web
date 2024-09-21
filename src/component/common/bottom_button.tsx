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
            className={` fixed bottom-0 bg-primary text-white text-base text-center flex justify-evenly items-center w-full py-3 font-semibold`}
        >
            <div className="" onClick={onBackClick} >{backButton}</div>
            <div onClick={onNextClick} className={`${wait ? "text-gray-300" : " text-primary"} no-underline bg-white w-44 py-2 rounded-sm font-bold text-lg `} >{nextButton}</div>
        </div>
    );
}