import React from "react";
import clsx from "clsx";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    error?: boolean;
}

export default function Checkbox({
    className,
    label,
    error = false,
    disabled = false,
    checked,
    onChange,
    ...props
}: CheckboxProps) {
    return (
        <label
            className={clsx(
                "inline-flex items-center gap-2 cursor-pointer select-none",
                disabled && "opacity-40 cursor-not-allowed",
                className
            )}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none' }}
        >
            <span style={{ position: 'relative', width: '12px', height: '12px', flexShrink: 0, display: 'inline-block' }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        margin: 0,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        zIndex: 1
                    }}
                    {...props}
                />

                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '12px',
                        height: '12px',
                        borderRadius: '2.4px',
                        border: `1px solid ${error ? '#fc0303' : (checked ? '#4378ff' : '#d9d9e0')}`,
                        backgroundColor: checked ? '#4378ff' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {checked && (
                        <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            style={{ display: 'block' }}
                        >
                            <path
                                d="M1.5 4.5L3 6L6.5 2"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </span>
            </span>

            {label && (
                <span
                    className={clsx(
                        "text-xs font-sans font-medium",
                        checked ? "text-default" : "text-body",
                        error && "text-alert-600"
                    )}
                    style={{ fontSize: '12px', fontWeight: 500 }}
                >
                    {label}
                </span>
            )}
        </label>
    );
}
