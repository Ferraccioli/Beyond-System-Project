import React from 'react';
import clsx from 'clsx';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (id: string) => void;
    showIcons?: boolean;
    className?: string;
}

export default function Tabs({
    tabs,
    activeTab,
    onChange,
    showIcons = true,
    className
}: TabsProps) {
    return (
        <div className={clsx("bg-surface-dark p-1 rounded-md flex gap-1 items-center", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-3 py-1 rounded-[4px] text-3xs font-semibold transition-all h-7 w-[143px] justify-center cursor-pointer",
                            isActive
                                ? "bg-white text-gray-800 shadow-sm border border-outline-default"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {showIcons && tab.icon && (
                            <span className={clsx(
                                "flex items-center justify-center",
                                isActive ? "text-gray-800" : "text-gray-400"
                            )}>
                                {React.isValidElement(tab.icon)
                                    ? React.cloneElement(tab.icon as React.ReactElement<any>, {
                                        sx: { fontSize: 14 }
                                    })
                                    : tab.icon
                                }
                            </span>
                        )}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
