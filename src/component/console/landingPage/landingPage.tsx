"use client";
import LandingPageCard from "./landingPageCard";
import data from '../../../../public/json/consoleDashboard.json';

export default function LandingPage({ onCardClicked }: { onCardClicked: () => void }) {
    return (
        <div className="p-6">
            {data.consoleDashboardData.map((dashboard, index) => (
                <div key={index} className="mb-6">
                    <h1 className="text-xl lg:text-3xl mb-4">{dashboard.title}</h1> {/* Normal title */}
                    <div className="flex flex-wrap gap-4 overflow-x-auto"> {/* Flex with wrap for responsiveness */}
                        {dashboard.sections && dashboard.sections.map((section, secIndex) => (
                            <div key={secIndex} className="flex-shrink-0 mb-1"> {/* Prevent cards from shrinking */}
                                <LandingPageCard key={secIndex} title={section.title} content={section.content} type={section.type} onCardClicked={onCardClicked} localStorageType={"selectedType"} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
