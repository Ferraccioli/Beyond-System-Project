import React from "react";
import clsx from "clsx";

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    error?: boolean;
}

export default function RadioButton({
    className,
    label,
    error = false,
    disabled = false,
    checked,
    onChange,
    ...props
}: RadioButtonProps) {
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
                    type="radio"
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
                        borderRadius: '50%',
                        border: `1px solid ${error ? '#fc0303' : (checked ? '#4378ff' : '#d9d9e0')}`,
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {checked && (
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#4378ff',
                                display: 'block'
                            }}
                        />
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
