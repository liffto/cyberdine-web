import React from 'react';
import Image from 'next/image';

const ThankYouPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center px-6 py-12 bg-white rounded-lg max-w-sm w-full">
                {/* Image */}
                <Image
                    src="/images/svg/scan_again_icon.svg"
                    alt="Empty State"
                    width={400}
                    height={400}
                    className="object-contain"
                />

                {/* Scan QR Text */}
                <p className="text-xl font-semibold mb-4">
                    Scan QR to order again
                </p>

                {/* Thank You Text */}
                <p className="text-lg text-gray-600">
                    Thank you, please visit again!
                </p>
            </div>
        </div>
    );
};

export default ThankYouPage;
