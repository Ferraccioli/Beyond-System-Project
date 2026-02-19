import React from "react";
import clsx from "clsx";
import { ArrowDropDown } from "@mui/icons-material";

export interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string; // Floating label or top label if needed, but usually just the selected value for simple dropdowns
    value?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    fullWidth?: boolean;
    size?: "md" | "lg";
}

export default function Dropdown({
    className,
    label,
    value,
    placeholder = "Selecione",
    error = false,
    disabled = false,
    startIcon,
    fullWidth = false,
    size = "md",
    ...props
}: DropdownProps) {

    return (
        <div className={clsx("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>
            {label && (
                <label className="text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                className={clsx(
                    "group flex items-center justify-between rounded-sm transition-all duration-200 border text-left",
                    // Size styles
                    size === "md" ? "h-7 px-2 text-xs" : "h-10 px-3 text-sm",
                    // Border & Background Logic
                    error
                        ? "border-alert bg-surface-default"
                        : disabled
                            ? "border-outline-default bg-surface-dark cursor-not-allowed opacity-60"
                            : "border-outline-default bg-surface-default hover:border-outline-dark focus:ring-2 focus:ring-brand-200 focus:border-brand-500",
                    fullWidth ? "w-full" : "w-auto",
                    className
                )}
                disabled={disabled}
                {...props}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {startIcon && (
                        <span className={clsx("flex-shrink-0", disabled ? "text-gray-400" : "text-gray-500")}>
                            {React.cloneElement(startIcon as React.ReactElement<{ sx?: any }>, { sx: { fontSize: size === 'md' ? 14 : 18 } })}
                        </span>
                    )}

                    <span className={clsx(
                        "whitespace-nowrap h-full bg-transparent outline-none text-default font-medium font-sans",
                        !value ? "text-gray-400" : "text-gray-800",
                        size === "md" ? "text-xs" : "text-sm"
                    )}>
                        {value || placeholder}
                    </span>
                </div>

                <ArrowDropDown
                    sx={{ fontSize: size === 'md' ? 16 : 20 }}
                    className={clsx("flex-shrink-0 ml-2", disabled ? "text-gray-300" : "text-gray-500 group-hover:text-gray-700")}
                />
            </button>
            {/* Error Message */}
            {error && (
                <span className="text-3xs text-alert font-medium mt-0.5">
                    Campo obrigatório
                </span>
            )}
        </div>
    );
}
