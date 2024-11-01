import Image from 'next/image';

export default function ConsoleTopbar() {
    return (
        <div className="bg-[#179428] px-16"> 
            <div className="flex items-center justify-between p-4">
                <div className="flex-shrink-0">
                    <Image
                        src="/images/svg/console_logo.svg"
                        alt="Logo"
                        height={40}
                        width={90} 
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
