import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikethroughS,
    InsertLink,
    FormatListBulleted,
    FormatListNumbered,
    Image as ImageIcon,
} from "@mui/icons-material";
import Button from "./Button";
import Dropdown from "./Dropdown";

export interface TextAreaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    // Toolbar Visibility Flags
    showToolbar?: boolean;
    showFormattingIcons?: boolean; // Bold, Italic, etc.
    showTitleSelect?: boolean; // Styles dropdown
    showTagSelect?: boolean;   // Dynamic tags dropdown

    // Actions Flags
    showActions?: boolean;

    onSave?: () => void;
    onCancel?: () => void;
}

export default function TextArea({
    className,
    label,
    value = "",
    onChange,
    placeholder = "Placeholder",
    error = false,
    disabled = false,

    // Default configs based on Figma common usage
    showToolbar = true,
    showFormattingIcons = true,
    showTitleSelect = true,
    showTagSelect = true,

    showActions = false,
    onSave,
    onCancel,
    ...props
}: TextAreaProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [hasContent, setHasContent] = useState(value !== "");

    // Initial value sync
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
            setHasContent(editorRef.current.textContent !== "" || editorRef.current.innerHTML !== "");
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            const textContent = editorRef.current.textContent || "";
            // Check if it's truly empty (sometimes innerHTML is <br>)
            setHasContent(textContent.trim() !== "" || (content !== "" && content !== "<br>"));
            onChange?.(content);
            checkActiveFormats();
        }
    };

    const checkActiveFormats = () => {
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
        setIsStrike(document.queryCommandState('strikethrough'));
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        handleInput();
        editorRef.current?.focus();
    };

    const handleLink = () => {
        const url = prompt("Insira a URL:");
        if (url) {
            execCommand('createLink', url);
            // Apply custom link styles (underline + color info)
            // Note: document.execCommand('createLink') creates a standard <a>.
            // We rely on CSS to style these <a> tags inside the editor.
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const text = e.clipboardData.getData('text');
        const selection = window.getSelection();

        // Check if pasted text is a URL and we have a selection
        const isUrl = /^(https?:\/\/[^\s]+)$/.test(text.trim());
        if (isUrl && selection && selection.rangeCount > 0 && !selection.isCollapsed) {
            e.preventDefault();
            execCommand('createLink', text.trim());
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full relative">
            {label && (
                <label className="text-3xs font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">
                    {label}
                </label>
            )}

            <div className={clsx(
                "group flex flex-col w-full rounded-sm transition-all duration-200 border bg-white relative outline-none",
                // Border & Background Logic
                error
                    ? "border-alert bg-surface-default focus-within:ring-2 focus-within:ring-red-100 focus-within:border-alert-600"
                    : disabled
                        ? "border-outline-default bg-surface-dark pointer-events-none opacity-60"
                        : "border-outline-default bg-surface-default hover:border-outline-dark focus-within:ring-2 focus-within:ring-brand-200 focus-within:border-brand-500",
                className
            )}>

                {/* 1. Toolbar (Optional) */}
                {showToolbar && !disabled && (
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-outline-default">

                        {/* Title Select (Using Dropdown Component) */}
                        {showTitleSelect && (
                            <div className="w-[107px]">
                                <Dropdown
                                    size="md"
                                    value="Parágrafo"
                                    // Actually Dropdown has fixed arrow right. 
                                    // "Parágrafo" input in Figma has an icon on the left? No, it looks like text + arrow.
                                    // Let's use Dropdown as intended.
                                    // The previous Input had `endIcon`. Dropdown has fixed endIcon.
                                    className="cursor-pointer hover:bg-surface-neutral"
                                    fullWidth
                                />
                            </div>
                        )}

                        {/* Tags Select (Using Dropdown Component) */}
                        {showTagSelect && (
                            <div className="w-[115px]">
                                <Dropdown
                                    size="md"
                                    value="Tags"
                                    className="cursor-pointer hover:bg-surface-neutral"
                                    fullWidth
                                />
                            </div>
                        )}

                        {/* Divider if selectors present */}
                        {(showTitleSelect || showTagSelect) && showFormattingIcons && (
                            <div className="w-px h-5 bg-outline-default mx-1" />
                        )}

                        {/* Formatting Icons */}
                        {showFormattingIcons && (
                            <div className="flex items-center gap-1 text-gray-400">
                                <button
                                    type="button"
                                    onClick={() => execCommand('bold')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isBold ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                >
                                    <FormatBold sx={{ fontSize: 14 }} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => execCommand('italic')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isItalic ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                >
                                    <FormatItalic sx={{ fontSize: 14 }} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => execCommand('underline')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isUnderline ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                >
                                    <FormatUnderlined sx={{ fontSize: 14 }} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => execCommand('strikethrough')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isStrike ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                >
                                    <StrikethroughS sx={{ fontSize: 14 }} />
                                </button>

                                <div className="w-px h-4 bg-gray-200 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => execCommand('insertUnorderedList')}
                                    className="w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors text-gray-500 hover:bg-surface-neutral"
                                >
                                    <FormatListBulleted sx={{ fontSize: 14 }} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => execCommand('insertOrderedList')}
                                    className="w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors text-gray-500 hover:bg-surface-neutral"
                                >
                                    <FormatListNumbered sx={{ fontSize: 14 }} />
                                </button>
                                <button
                                    type="button"
                                    className="w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors text-gray-300 cursor-not-allowed"
                                    title="Inserção de imagem não disponível"
                                >
                                    <ImageIcon sx={{ fontSize: 14 }} />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLink}
                                    className="w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors text-gray-500 hover:bg-surface-neutral"
                                >
                                    <InsertLink sx={{ fontSize: 14 }} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Text Input Area */}
                <div className="relative w-full">
                    {!hasContent && (
                        <div className="absolute top-3 left-3 text-xs text-gray-400 pointer-events-none font-sans">
                            {placeholder}
                        </div>
                    )}
                    <div
                        ref={editorRef}
                        contentEditable={!disabled}
                        onInput={handleInput}
                        onKeyUp={checkActiveFormats}
                        onMouseUp={checkActiveFormats}
                        onPaste={handlePaste}
                        className={clsx(
                            "w-full min-h-[120px] p-3 text-xs text-gray-800 bg-transparent outline-none resize-y font-sans rich-text-editor",
                            disabled && "text-gray-400 cursor-not-allowed resize-none"
                        )}
                        style={{ whiteSpace: 'pre-wrap' }}
                        {...(props as any)}
                    />
                </div>

                {/* 3. Actions Footer (Optional) */}
                {showActions && !disabled && (
                    <div className="flex items-center justify-between p-2 border-t border-outline-default">
                        <div className="flex gap-2">
                            {/* Potential Left actions or status */}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="md"
                                onClick={onCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={onSave}
                            >
                                Salvar
                            </Button>
                        </div>
                    </div>
                )}

            </div>

            {/* Error Message */}
            {error && (
                <span className="text-3xs text-alert font-medium mt-0.5">
                    Este campo é obrigatório
                </span>
            )}
        </div>
    );
}
