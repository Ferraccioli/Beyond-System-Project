import { useEffect, useState } from "react";
import clsx from "clsx";
import {
    CheckCircle,
    Error,
    Info,
    Warning,
    Close
} from "@mui/icons-material";

export type ToastVariant = "success" | "alert" | "info" | "warning" | "neutral";

export interface ToastProps {
    id?: string;
    message: string;
    variant?: ToastVariant;
    onClose?: () => void;
    duration?: number;
    className?: string;
}

const variantConfig = {
    success: {
        icon: CheckCircle,
        iconColor: "text-success",
        borderColor: "border-success",
    },
    alert: {
        icon: Error,
        iconColor: "text-alert",
        borderColor: "border-alert",
    },
    info: {
        icon: Info,
        iconColor: "text-info",
        borderColor: "border-info",
    },
    warning: {
        icon: Warning,
        iconColor: "text-warning",
        borderColor: "border-warning",
    },
    neutral: {
        icon: null,
        iconColor: "",
        borderColor: "border-transparent",
    },
};

export default function Toast({
    message,
    variant = "neutral",
    onClose,
    duration = 5000,
    className,
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const config = variantConfig[variant];
    const Icon = config.icon;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 300); // Wait for fade out
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={clsx(
                "flex items-center gap-4 px-5 py-4 min-w-[320px] max-w-[460px] rounded-sm shadow-xl border-l-[6px] animate-toast-in",
                "bg-[#202123] text-white",
                !isVisible && "opacity-0 translate-x-10 transition-all duration-300",
                config.borderColor,
                className
            )}
        >
            {Icon && (
                <Icon className={clsx("shrink-0", config.iconColor)} sx={{ fontSize: 24 }} />
            )}

            <p className="flex-1 text-xs font-sans leading-relaxed text-inverted">
                {message}
            </p>

            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose?.(), 300);
                }}
                className="text-gray-400 hover:text-white transition-colors ml-2"
            >
                <Close sx={{ fontSize: 18 }} />
            </button>
        </div>
    );
}
