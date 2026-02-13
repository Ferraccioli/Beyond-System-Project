import React from "react";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "tertiary";
    size?: "md" | "lg";
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    iconOnly?: boolean;
}

export default function Button({
    className,
    variant = "primary",
    size = "md",
    loading = false,
    startIcon,
    endIcon,
    iconOnly = false,
    children,
    ...props
}: ButtonProps) {

    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-sm transition-all duration-200 font-display font-semibold whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    // Size styles (Height & Padding & Font Size)
    const sizeStyles = {
        // Figma: h=[28px] px=[16px] text-[10px] (3xs)
        md: "h-7 px-4 text-3xs gap-1",
        // Figma: h=[40px] px=[20px] text-[12px] (xs)
        lg: "h-10 px-5 text-xs gap-1.5",
    };

    // Icon Only overrides (Square dimensions)
    const iconOnlyStyles = {
        md: "w-7 px-0",
        lg: "w-10 px-0",
    };

    // Variant styles
    const variantStyles = {
        primary: "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm",
        secondary: "bg-surface-default border border-outline-default text-default hover:bg-surface-dark active:bg-surface-darker",
        ghost: "bg-transparent text-default hover:bg-surface-neutral active:bg-surface-darker",
        tertiary: "bg-transparent text-gray-500 hover:bg-surface-dark active:bg-surface-darker",
    };

    // Loading spinner size override
    const spinnerSize = size === "md" ? 10 : 12;

    return (
        <button
            className={twMerge(
                baseStyles,
                sizeStyles[size],
                iconOnly && iconOnlyStyles[size],
                variantStyles[variant],
                loading && "cursor-wait",
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && (
                <CircularProgress
                    size={spinnerSize}
                    color="inherit"
                    className={clsx("animate-spin", variant === 'primary' ? 'text-white/80' : 'text-brand-600')}
                />
            )}

            {!loading && startIcon && (
                <span className="flex items-center justify-center">
                    {React.cloneElement(startIcon as React.ReactElement<{ sx?: any }>, { sx: { fontSize: size === 'md' ? 14 : 18 } })}
                </span>
            )}

            {!iconOnly && <span>{children}</span>}
            {iconOnly && !startIcon && !endIcon && children}

            {!loading && endIcon && (
                <span className="flex items-center justify-center">
                    {React.cloneElement(endIcon as React.ReactElement<{ sx?: any }>, { sx: { fontSize: size === 'md' ? 14 : 18 } })}
                </span>
            )}
        </button>
    );
}
