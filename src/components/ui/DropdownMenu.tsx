import React, { useState } from "react";
import clsx from "clsx";
import MenuItem from "./MenuItem";
import Input from "./Input";
import { Search } from "@mui/icons-material";
import { motion } from "framer-motion";

export interface DropdownOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface DropdownSection {
    title: string;
    options: DropdownOption[];
}

export interface DropdownMenuProps {
    options?: DropdownOption[];
    sections?: DropdownSection[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    multiple?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    maxHeight?: number;
    className?: string;
    onSearch?: (query: string) => void;
}



export default function DropdownMenu({
    options = [],
    sections = [],
    value,
    onChange,
    multiple = false,
    searchable = false,
    searchPlaceholder = "Pesquisar",
    maxHeight = 280,
    className,
    onSearch,
}: DropdownMenuProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    const handleOptionClick = (optionValue: string) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValues = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            onChange?.(newValues);
        } else {
            onChange?.(optionValue);
        }
    };

    const isSelected = (optionValue: string): boolean => {
        if (Array.isArray(value)) {
            return value.includes(optionValue);
        }
        return value === optionValue;
    };

    const filterOptions = (opts: DropdownOption[]): DropdownOption[] => {
        if (!searchQuery) return opts;
        return opts.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const renderOption = (option: DropdownOption) => {
        return (
            <MenuItem
                key={option.value}
                label={option.label}
                description={option.description}
                selected={isSelected(option.value)}
                disabled={option.disabled}
                type={multiple ? "checkbox" : "none"}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
            />
        );
    };

    const renderOptions = (opts: DropdownOption[]) => {
        const filtered = filterOptions(opts);
        return filtered.map(renderOption);
    };

    const renderSections = () => {
        return sections.map((section, index) => {
            const filtered = filterOptions(section.options);
            if (filtered.length === 0) return null;

            return (
                <div key={index}>
                    <div
                        className="px-2 py-1 text-muted font-sans font-bold text-[10px] uppercase"
                        style={{
                            padding: '4px 8px',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#94979b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {section.title}
                    </div>
                    {filtered.map(renderOption)}
                </div>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={clsx(
                "bg-white border border-outline-default rounded-md overflow-hidden origin-top-left",
                className
            )}
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d9d9e0',
                borderRadius: '6px',
                boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {searchable && (
                <div
                    className="px-3 py-2 border-b border-outline-default"
                    style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid #d9d9e0'
                    }}
                >
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={searchPlaceholder}
                        startIcon={<Search />}
                        size="md"
                        fullWidth
                    />
                </div>
            )}

            <div
                className="flex-1 overflow-y-auto"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    maxHeight: `${maxHeight}px`
                }}
            >
                {sections.length > 0 ? renderSections() : renderOptions(options)}
            </div>
        </motion.div>
    );
}
