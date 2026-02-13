import clsx from "clsx";

export interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    labelPosition?: "left" | "right";
    // For "both sides" activation (e.g. Monthly / Yearly)
    leftLabel?: string;
    rightLabel?: string;
    className?: string;
    id?: string;
}

export default function Switch({
    checked = false,
    onCheckedChange,
    disabled = false,
    label,
    labelPosition = "right",
    leftLabel,
    rightLabel,
    className,
    id,
}: SwitchProps) {
    const handleToggle = () => {
        if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
        }
    };

    // Determine labels based on props
    // If leftLabel/rightLabel are used, they take precedence for "both sides" layout
    const hasDualLabels = !!leftLabel || !!rightLabel;

    // Common label classes
    const labelClasses = (isActive: boolean) => clsx(
        "text-sm font-sans cursor-pointer select-none transition-colors",
        disabled ? "text-gray-300 cursor-not-allowed" : isActive ? "text-gray-800 font-medium" : "text-gray-500"
    );

    return (
        <div className={clsx("inline-flex items-center gap-3", className)}>
            {/* Left Label (if dual or single-left) */}
            {(leftLabel || (label && labelPosition === "left")) && (
                <span
                    className={labelClasses(hasDualLabels ? !checked : true)}
                    onClick={handleToggle}
                >
                    {leftLabel || label}
                </span>
            )}

            {/* Switch Track */}
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                id={id}
                onClick={handleToggle}
                className={clsx(
                    "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none focus:outline-none focus:ring-0 appearance-none p-0 border-0",
                    disabled ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
                )}
                style={{
                    width: 36,
                    height: 18,
                    backgroundColor: checked ? '#24923c' : '#cbcdd3'
                }}
            >
                {/* Switch Knob */}
                <span
                    className="pointer-events-none absolute block shadow-sm ring-0 transition-transform duration-200 ease-in-out"
                    style={{
                        top: 2,
                        left: 2,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        zIndex: 10,
                        transform: checked ? 'translateX(18px)' : 'translateX(0)'
                    }}
                />
            </button>

            {/* Right Label (if dual or single-right) */}
            {(rightLabel || (label && labelPosition === "right")) && (
                <span
                    className={labelClasses(hasDualLabels ? checked : true)}
                    onClick={handleToggle}
                >
                    {rightLabel || label}
                </span>
            )}
        </div>
    );
}
