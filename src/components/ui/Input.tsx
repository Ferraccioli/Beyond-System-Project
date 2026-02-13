import React, { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    size?: "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        label,
        error = false,
        errorMessage,
        startIcon,
        endIcon,
        fullWidth = false,
        size = "lg",
        disabled,
        ...props
    }, ref) => {

        const baseContainerStyles = "relative flex items-center transition-all duration-200 rounded-sm bg-white border";

        const sizeStyles = {
            // Figma: h=[28px] px=[8px] text-[10px] (3xs)? No, Figma text is 12px for both but tight padding.
            // Let's stick to consistent padding.
            md: "h-7 text-xs",
            lg: "h-10 text-xs",
        };

        const stateStyles = error
            ? "border-alert-500 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-alert-600"
            : disabled
                ? "bg-gray-50 border-outline-default cursor-not-allowed"
                : "border-outline-default bg-white hover:border-outline-dark focus-within:ring-2 focus-within:ring-brand-200 focus-within:border-brand-500";

        const paddingLeft = startIcon ? (size === 'md' ? "pl-8" : "pl-10") : (size === 'md' ? "pl-2" : "pl-3");
        const paddingRight = endIcon ? (size === 'md' ? "pr-8" : "pr-10") : (size === 'md' ? "pr-2" : "pr-3");

        return (
            <div className={clsx("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}>
                {label && (
                    <label className="text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {label}
                    </label>
                )}

                <div className={twMerge(
                    baseContainerStyles,
                    sizeStyles[size],
                    stateStyles,
                    fullWidth ? "w-full" : "w-[210px]", // Default width from Figma if not fullWidth
                    className
                )}>
                    {startIcon && (
                        <div className={clsx(
                            "absolute left-0 flex items-center justify-center pointer-events-none text-gray-400",
                            size === 'md' ? "w-7 h-7" : "w-10 h-10"
                        )}>
                            {React.cloneElement(startIcon as React.ReactElement<{ sx?: any }>, { sx: { fontSize: size === 'md' ? 14 : 18 } })}
                        </div>
                    )}

                    <input
                        ref={ref}
                        disabled={disabled}
                        className={clsx(
                            "w-full h-full bg-transparent outline-none text-default placeholder:text-gray-400 font-sans",
                            paddingLeft,
                            paddingRight
                        )}
                        {...props}
                    />

                    {endIcon && (
                        <div className={clsx(
                            "absolute right-0 flex items-center justify-center pointer-events-none text-gray-400",
                            size === 'md' ? "w-7 h-7" : "w-10 h-10"
                        )}>
                            {React.cloneElement(endIcon as React.ReactElement<{ sx?: any }>, { sx: { fontSize: size === 'md' ? 14 : 18 } })}
                        </div>
                    )}
                </div>

                {error && errorMessage && (
                    <span className="text-[10px] text-alert-600 font-medium mt-0.5">
                        {errorMessage}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
