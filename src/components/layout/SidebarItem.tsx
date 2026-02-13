
import { Schedule, Check, PriorityHigh } from "@mui/icons-material";
import clsx from "clsx";

export type SidebarItemStatus = 'pending' | 'completed' | 'alert';

interface SidebarItemProps {
    label: string;
    status?: SidebarItemStatus;
    active?: boolean;
    onClick?: () => void;
}

export default function SidebarItem({
    label,
    status = 'pending',
    active = false,
    onClick
}: SidebarItemProps) {

    // Status visual configuration
    const statusConfig = {
        pending: {
            icon: Schedule,
            iconBg: "bg-gray-100", // surface-neutral? Checking tokens. gray-100 matches Figma.
            iconColor: "text-gray-400",
            textColor: "text-gray-800"
        },
        completed: {
            icon: Check,
            iconBg: "bg-green-100",
            iconColor: "text-success", // maps to green-700
            textColor: "text-gray-800"
        },
        alert: {
            icon: PriorityHigh,
            iconBg: "bg-red-50",
            iconColor: "text-alert", // maps to red-500
            textColor: "text-alert"
        }
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full flex items-center gap-3 px-2 py-1 rounded-[4px] transition-colors duration-200 group text-left",
                active ? "bg-surface-dark" : "hover:bg-gray-50 bg-transparent"
            )}
        >
            {/* Icon Container */}
            <div className={clsx(
                "w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0",
                config.iconBg
            )}>
                <IconComponent
                    sx={{ fontSize: 12 }}
                    className={config.iconColor}
                />
            </div>

            {/* Label */}
            <span className={clsx(
                "text-[11px] font-sans font-normal leading-normal",
                config.textColor
            )}>
                {label}
            </span>
        </button>
    );
}
