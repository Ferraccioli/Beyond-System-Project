import clsx from "clsx";
import type { ElementType } from "react";

export type TagsVariant = "primary" | "neutral" | "success" | "alert" | "warning" | "info" | "special";
export type TagsSize = "md" | "lg";

export interface TagsProps {
    label: string;
    variant?: TagsVariant;
    size?: TagsSize;
    iconLeft?: ElementType;
    iconRight?: ElementType;
    className?: string;
    onClick?: () => void;
}

const variantStyles: Record<TagsVariant, { bg: string; text: string }> = {
    primary: {
        bg: "bg-orange-50",
        text: "text-orange-500",
    },
    neutral: {
        bg: "bg-surface-neutral",
        text: "text-neutral",
    },
    success: {
        bg: "bg-surface-success",
        text: "text-success",
    },
    alert: {
        bg: "bg-surface-alert",
        text: "text-alert",
    },
    warning: {
        bg: "bg-surface-warning",
        text: "text-warning",
    },
    info: {
        bg: "bg-surface-info",
        text: "text-info",
    },
    special: {
        bg: "bg-surface-special",
        text: "text-special",
    },
};

const sizeStyles: Record<TagsSize, string> = {
    md: "h-[18px] px-2 rounded-xs text-xs",
    lg: "h-[24px] px-3 rounded-sm text-sm",
};

export default function Tags({
    label,
    variant = "primary",
    size = "md",
    iconLeft: IconLeft,
    iconRight: IconRight,
    className,
    onClick,
}: TagsProps) {
    const { bg, text } = variantStyles[variant];

    return (
        <div
            className={clsx(
                "inline-flex items-center justify-center gap-1 font-sans font-medium whitespace-nowrap transition-colors",
                bg,
                text,
                sizeStyles[size],
                onClick && "cursor-pointer hover:opacity-80",
                className
            )}
            onClick={onClick}
        >
            {IconLeft && <IconLeft className="w-3 h-3 shrink-0" sx={{ fontSize: size === 'md' ? 12 : 14 }} />}
            <span className="leading-none">{label}</span>
            {IconRight && <IconRight className="w-3 h-3 shrink-0" sx={{ fontSize: size === 'md' ? 12 : 14 }} />}
        </div>
    );
}
