import clsx from "clsx";
import Checkbox from "./Checkbox";
import RadioButton from "./RadioButton";

export interface MenuItemProps {
    label: string;
    description?: string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: "checkbox" | "radio" | "none";
    className?: string;
}

/**
 * A generic list item used for menus, selection lists and dropdowns.
 * Based on 'List element' and 'Bullet List Element' from Figma.
 * 
 * @param type - "checkbox" for multiselect, "radio" for single select, "none" for plain items
 * @param selected - Whether the item is selected/checked
 * @param disabled - Whether the item is disabled
 */
export default function MenuItem({
    label,
    description,
    selected = false,
    disabled = false,
    onClick,
    type = "none",
    className,
}: MenuItemProps) {
    return (
        <div
            onClick={() => !disabled && onClick?.()}
            className={clsx(
                "flex items-center gap-3 px-3 py-2 relative transition-colors duration-200 select-none",
                disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
                !disabled && !selected && "hover:bg-surface-dark",
                selected && "bg-surface-dark",
                !disabled && selected && "hover:bg-surface-darker",
                className
            )}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1,
                transition: 'background-color 0.2s',
                userSelect: 'none'
            }}
        >
            {type === "checkbox" && (
                <Checkbox
                    checked={selected}
                    disabled={disabled}
                    onChange={() => { }}
                />
            )}

            {type === "radio" && (
                <RadioButton
                    checked={selected}
                    disabled={disabled}
                    onChange={() => { }}
                />
            )}

            <div className="flex flex-col flex-1 min-w-0">
                <span
                    className={clsx(
                        "text-xs font-sans font-medium truncate",
                        disabled ? "text-disabled" : "text-default"
                    )}
                    style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: disabled ? '#cbcdd3' : '#202123',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {label}
                </span>
                {description && (
                    <span
                        className="text-[10px] text-muted truncate"
                        style={{
                            fontSize: '10px',
                            color: '#94979b',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {description}
                    </span>
                )}
            </div>
        </div>
    );
}
