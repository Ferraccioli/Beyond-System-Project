import React from "react";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    intent?: "default" | "success" | "info" | "alert" | "neutral" | "warning";
    size?: "md" | "lg";
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    iconOnly?: boolean;
}

export default function Button({
    className,
    variant = "primary",
    intent = "default",
    size = "md",
    loading = false,
    startIcon,
    endIcon,
    iconOnly = false,
    children,
    ...props
}: ButtonProps) {

    // Base styles
    const baseStyles = clsx(
        "inline-flex items-center justify-center rounded-sm transition-all duration-200 font-display font-semibold whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variant !== "ghost" && "focus:ring-2 focus:ring-offset-1 focus:ring-brand-200"
    );

    // Size styles (Height & Padding & Font Size)
    const sizeStyles = {
        // Ghost has no padding (horizontal or vertical)
        md: clsx("text-3xs gap-1", variant !== "ghost" ? "h-7 px-4" : "h-auto p-0"),
        lg: clsx("text-xs gap-1.5", variant !== "ghost" ? "h-10 px-5" : "h-auto p-0"),
    };

    // Icon Only overrides (Square dimensions)
    const iconOnlyStyles = {
        md: "w-7 px-0",
        lg: "w-10 px-0",
    };

    // Color intent mapping for secondary, tertiary and ghost
    const intentStyles = {
        default: {
            secondary: "text-default hover:bg-surface-dark",
            tertiary: "text-default hover:bg-surface-neutral",
            ghost: "text-default hover:text-brand-600",
        },
        success: {
            secondary: "text-success hover:bg-green-50",
            tertiary: "text-success hover:bg-green-50",
            ghost: "text-success hover:text-success-hover",
        },
        info: {
            secondary: "text-info hover:bg-blue-50",
            tertiary: "text-info hover:bg-blue-50",
            ghost: "text-info hover:text-info-hover",
        },
        alert: {
            secondary: "text-alert hover:bg-red-50",
            tertiary: "text-alert hover:bg-red-50",
            ghost: "text-alert hover:text-alert-hover",
        },
        neutral: {
            secondary: "text-neutral hover:bg-surface-neutral",
            tertiary: "text-neutral hover:bg-surface-neutral",
            ghost: "text-neutral hover:text-neutral-hover",
        },
        warning: {
            secondary: "text-warning hover:bg-yellow-50",
            tertiary: "text-warning hover:bg-yellow-50",
            ghost: "text-warning hover:text-warning-hover",
        },
    };

    // Variant styles logic
    const variantClasses = clsx(
        variant === "primary" && "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm",
        variant === "secondary" && clsx("bg-surface-default border border-outline-default", intentStyles[intent].secondary),
        variant === "tertiary" && clsx("bg-transparent", intentStyles[intent].tertiary),
        variant === "ghost" && clsx("bg-transparent", intentStyles[intent].ghost)
    );

    // Loading spinner size override
    const spinnerSize = size === "md" ? 10 : 12;

    return (
        <button
            className={twMerge(
                baseStyles,
                sizeStyles[size],
                iconOnly && iconOnlyStyles[size],
                variantClasses,
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
