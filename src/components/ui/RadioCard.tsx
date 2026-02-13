import clsx from "clsx";

export interface RadioCardProps {
    title: string;
    description: string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function RadioCard({
    title,
    description,
    selected = false,
    disabled = false,
    onClick,
    className,
}: RadioCardProps) {
    return (
        <div
            onClick={() => !disabled && onClick?.()}
            className={clsx(
                "group relative flex flex-col gap-1 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer select-none ring-1",
                "w-[256px] h-auto min-h-[69px] justify-center",
                selected
                    ? "bg-surface-brand ring-brand-500 border-transparent"
                    : "bg-surface-dark ring-outline-default hover:bg-surface-darker hover:ring-outline-dark",
                disabled && "opacity-50 cursor-not-allowed grayscale",
                className
            )}
        >
            {/* Radio Indicator */}
            <div className="flex items-center gap-2">
                <div
                    className={clsx(
                        "size-3 rounded-full border flex items-center justify-center transition-colors duration-200",
                        selected
                            ? "bg-white border-brand-500"
                            : "bg-white border-outline-default group-hover:border-outline-dark"
                    )}
                >
                    {selected && (
                        <div className="size-1.5 rounded-full bg-brand-500" />
                    )}
                </div>

                <h4
                    className={clsx(
                        "text-xs font-sans font-medium leading-tight transition-colors duration-200",
                        selected ? "text-brand-500" : "text-default"
                    )}
                >
                    {title}
                </h4>
            </div>

            {/* Description */}
            <p className="text-[11px] font-sans text-body pl-5 leading-normal">
                {description}
            </p>
        </div>
    );
}
