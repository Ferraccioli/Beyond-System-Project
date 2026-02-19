import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
import { AnimatePresence } from "framer-motion";
import Button from "./Button";
import Dropdown from "./Dropdown";
import DropdownMenu from "./DropdownMenu";

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
    const [isUnorderedList, setIsUnorderedList] = useState(false);
    const [isOrderedList, setIsOrderedList] = useState(false);


    const [hasContent, setHasContent] = useState(value !== "");

    // Store last selection range to restore focus when inserting tags
    const lastSelectionRange = useRef<Range | null>(null);

    // Format Dropdown State
    const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState('p');

    // Tags Dropdown State
    const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);

    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
    const [tagSearch, setTagSearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const tagOptions = [
        { value: '{{nomedocliente}}', label: 'Nome do Cliente' },
        { value: '{{nomedaempresa}}', label: 'Nome da Empresa' },
        { value: '{{cargo}}', label: 'Cargo' },
        { value: '{{email}}', label: 'Email' },
    ];

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

            // Auto-convert tags logic
            let shouldKeepMenuOpen = false;

            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0 && selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const node = range.startContainer;

                // Check if we are typing inside a text node
                if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                    const text = node.textContent;
                    const cursorOffset = range.startOffset;

                    // Find the last '{{' occurrence before the cursor
                    const lastOpenBracesIndex = text.lastIndexOf('{{', cursorOffset);

                    if (lastOpenBracesIndex !== -1) {
                        const potentialTag = text.slice(lastOpenBracesIndex, cursorOffset);
                        // Check for spaces
                        if (!potentialTag.includes(' ') && !potentialTag.includes('}')) {
                            // We have a match/potential match
                            setTagSearch(potentialTag);

                            // Check if there are options that match
                            const hasMatch = tagOptions.some(opt =>
                                opt.value.toLowerCase().startsWith(potentialTag.toLowerCase())
                            );

                            if (hasMatch) {
                                shouldKeepMenuOpen = true;

                                // If menu is not open, open it and set position
                                if (!isTagMenuOpen) {
                                    const rangeClone = range.cloneRange();
                                    rangeClone.setStart(node, lastOpenBracesIndex);
                                    rangeClone.setEnd(node, lastOpenBracesIndex + 2); // Select '{{'
                                    const rect = rangeClone.getBoundingClientRect();

                                    setMenuPosition({
                                        top: rect.bottom + 5,
                                        left: rect.left
                                    });
                                    setIsTagMenuOpen(true);
                                    // Set index to 0 when opening
                                    setHighlightedIndex(0);
                                    saveSelection();
                                }
                            }
                        }
                    }

                    // Simple approach: look for the last word appearing before cursor
                    const textBeforeCursor = text.slice(0, cursorOffset);

                    // Match {{value}} followed by a space
                    if (textBeforeCursor.endsWith(' ')) {
                        // Regex to capture the tag before the space. 
                        const match = textBeforeCursor.match(/(\{\{.*?\}\})\s$/);

                        if (match) {
                            const params = {
                                tagKey: match[1],
                                fullMatch: match[0],
                                startIndex: cursorOffset - match[0].length
                            };

                            // Check if it matches a valid tag option
                            const isValidTag = tagOptions.some(opt => opt.value === params.tagKey);

                            if (isValidTag) {
                                // We found a match. Now we need to replace the text with a tag.
                                // We need to split the text node.

                                // 1. Text before the tag
                                const beforeText = text.slice(0, params.startIndex);
                                // 2. Text after the cursor (if any)
                                const afterText = text.slice(cursorOffset);

                                // Create the tag element
                                const uniqueId = `tag-${Date.now()}`;
                                const span = document.createElement('span');
                                span.id = uniqueId;
                                span.contentEditable = "false";
                                span.className = "inline-flex items-center justify-center h-[18px] px-2 rounded-[2px] text-[11px] font-medium bg-surface-info text-info mx-0.5 select-none align-middle w-max";
                                span.textContent = params.tagKey;

                                // Reconstruct the structure
                                const parent = node.parentNode;
                                if (parent) {
                                    // Create text node for before content if it exists
                                    if (beforeText) {
                                        parent.insertBefore(document.createTextNode(beforeText), node);
                                    }

                                    // Insert the tag
                                    parent.insertBefore(document.createTextNode('\u00A0'), node); // Space before
                                    parent.insertBefore(span, node);
                                    const afterSpace = document.createTextNode('\u00A0');
                                    parent.insertBefore(afterSpace, node);

                                    // Insert after text if exists
                                    if (afterText) {
                                        parent.insertBefore(document.createTextNode(afterText), node);
                                    }

                                    // Remove original node
                                    parent.removeChild(node);

                                    // Restore cursor position: after the 'afterSpace'
                                    const newRange = document.createRange();
                                    newRange.setStart(afterSpace, 1);
                                    newRange.collapse(true);
                                    selection.removeAllRanges();
                                    selection.addRange(newRange);
                                }
                            }
                        }
                    }
                }
            }

            if (isTagMenuOpen && !shouldKeepMenuOpen) {
                setIsTagMenuOpen(false);
                setMenuPosition(null);
            }

            onChange?.(editorRef.current.innerHTML);
            checkActiveFormats();
            saveSelection();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isTagMenuOpen) {
            const filteredOptions = tagOptions.filter(opt =>
                opt.value.toLowerCase().startsWith(tagSearch.toLowerCase())
            );

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
                return;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex(prev => Math.max(prev - 1, 0));
                return;
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    handleInsertTag(filteredOptions[highlightedIndex].value);
                }
                return;
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setIsTagMenuOpen(false);
                setMenuPosition(null);
                return;
            }
        }

        if (e.key === 'Backspace') {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                if (range.collapsed) {
                    const startNode = range.startContainer;
                    // If cursor is in a text node
                    if (startNode.nodeType === Node.TEXT_NODE) {
                        // Check if we are at the beginning of this text node
                        if (range.startOffset === 0) {
                            const previousSibling = startNode.previousSibling;
                            if (previousSibling && previousSibling.nodeType === Node.ELEMENT_NODE && (previousSibling as HTMLElement).classList.contains("bg-surface-info")) {
                                e.preventDefault();
                                replaceTagWithText(previousSibling as HTMLElement, true);
                            }
                        } else if (range.startOffset === 1 && startNode.textContent === '\u00A0') {
                            // Accessing previous sibling of the text node containing the space
                            const previousSibling = startNode.previousSibling;
                            if (previousSibling && previousSibling.nodeType === Node.ELEMENT_NODE && (previousSibling as HTMLElement).classList.contains("bg-surface-info")) {
                                e.preventDefault();
                                replaceTagWithText(previousSibling as HTMLElement, true);
                            }
                        }
                    } else if (startNode.nodeType === Node.ELEMENT_NODE) {
                        // Cursor might be strictly between elements in the parent
                        const nodeBefore = startNode.childNodes[range.startOffset - 1];
                        if (nodeBefore && nodeBefore.nodeType === Node.ELEMENT_NODE && (nodeBefore as HTMLElement).classList.contains("bg-surface-info")) {
                            e.preventDefault();
                            replaceTagWithText(nodeBefore as HTMLElement, true);
                        }
                    }
                }
            }
        }
    };

    const replaceTagWithText = (tagElement: HTMLElement, openMenu: boolean = false) => {
        const text = tagElement.textContent || "";
        const parent = tagElement.parentNode;
        if (parent) {
            const textNode = document.createTextNode(text);
            parent.replaceChild(textNode, tagElement);

            // Place cursor at end of new text node
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(textNode, textNode.length);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);

            handleInput(); // Trigger state update

            if (openMenu) {
                // Determine position for menu
                // We assume tag starts with '{'
                const braceIndex = text.lastIndexOf('{');
                if (braceIndex !== -1) {
                    const range = document.createRange();
                    range.setStart(textNode, braceIndex);
                    range.setEnd(textNode, braceIndex + 1); // Select the brace
                    const rect = range.getBoundingClientRect();

                    setMenuPosition({
                        top: rect.bottom + 5,
                        left: rect.left
                    });
                    setTagSearch(text);
                    setIsTagMenuOpen(true);
                    setHighlightedIndex(0);
                }
            }
        }
    };

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            // Ensure selection is within the editor
            if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
                lastSelectionRange.current = selection.getRangeAt(0);
            }
        }
    };

    const checkActiveFormats = () => {
        // Using 'any' cast to suppress deprecation warnings for queryCommandState/Value
        // These APIs are deprecated but remain the standard for lightweight contentEditable interactions
        const doc = document as any;

        setIsBold(doc.queryCommandState('bold'));
        setIsItalic(doc.queryCommandState('italic'));
        setIsUnderline(doc.queryCommandState('underline'));
        setIsStrike(doc.queryCommandState('strikethrough'));
        setIsUnorderedList(doc.queryCommandState('insertUnorderedList'));
        setIsOrderedList(doc.queryCommandState('insertOrderedList'));

        // Check block format
        const format = doc.queryCommandValue('formatBlock');
        // formatBlock returns tags like "h3", "p", "div", etc. depending on browser
        if (format) {
            setCurrentFormat(format.toLowerCase());
        } else {
            setCurrentFormat('p');
        }
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        handleInput();
        editorRef.current?.focus();
    };

    const handleFormatChange = (format: string) => {
        execCommand('formatBlock', format);
        setCurrentFormat(format);
        setIsFormatMenuOpen(false);
    };

    const handleInsertTag = (tagValue: string) => {
        restoreSelection();

        // Logic to remove preceding tag text (e.g. {{tag or {{foo) if it exists
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0 && selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            const node = range.startContainer;
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                const offset = range.startOffset;
                const text = node.textContent;

                // Find the last '{{' before the cursor
                const lastOpenBracesIndex = text.lastIndexOf('{{', offset);

                if (lastOpenBracesIndex !== -1) {
                    const potentialTag = text.slice(lastOpenBracesIndex, offset);
                    if (!potentialTag.includes(' ')) {
                        // Adjust range to encompass the '{{' and the text following it
                        range.setStart(node, lastOpenBracesIndex);
                        range.setEnd(node, offset);
                        range.deleteContents();
                    }
                }
            }
        }

        const uniqueId = `tag-${Date.now()}`;
        // Tag HTML structure matching Tags component (neutral variant, md size)
        // using inline-flex and other tailwind classes
        const tagHtml = `\u00A0<span id="${uniqueId}" contenteditable="false" class="inline-flex items-center justify-center h-[18px] px-2 rounded-[2px] text-[11px] font-medium bg-surface-info text-info mx-0.5 select-none align-middle w-max">${tagValue}</span>\u00A0`;

        document.execCommand('insertHTML', false, tagHtml);

        setTimeout(() => {
            const insertedTag = document.getElementById(uniqueId);
            if (insertedTag) {
                insertedTag.removeAttribute('id');

                const selection = window.getSelection();
                const range = document.createRange();

                if (insertedTag.nextSibling) {
                    try {
                        range.setStart(insertedTag.nextSibling, 1);
                        range.collapse(true);
                    } catch (e) {
                        range.setStartAfter(insertedTag);
                        range.collapse(true);
                    }
                } else {
                    range.setStartAfter(insertedTag);
                    range.collapse(true);
                }

                selection?.removeAllRanges();
                selection?.addRange(range);
            }
            editorRef.current?.focus();
        }, 0);

        handleInput(); // Trigger onChange
        setIsTagMenuOpen(false);
    };

    const restoreSelection = () => {
        if (lastSelectionRange.current) {
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(lastSelectionRange.current);
        } else {
            editorRef.current?.focus();
        }
    };

    const handleLink = () => {
        const url = prompt("Insira a URL:");
        if (url) {
            execCommand('createLink', url);
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

    const formatLabel = currentFormat === 'h3' ? 'Título' : 'Corpo';

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
                        : "border-outline-default bg-surface-default hover:border-outline-dark",
                className
            )}>

                {/* 1. Toolbar (Optional) */}
                {showToolbar && !disabled && (
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-outline-default z-20 relative">

                        {/* Title Select (Using Dropdown Component as Trigger) */}
                        {showTitleSelect && (
                            <div className="relative w-[120px]">
                                <Dropdown
                                    size="md"
                                    value={formatLabel}
                                    onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                                    className="cursor-pointer hover:bg-surface-neutral w-full bg-white"
                                    fullWidth
                                />

                                <AnimatePresence>
                                    {isFormatMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsFormatMenuOpen(false)}
                                            />
                                            <div className="absolute top-full left-0 mt-1 w-full z-20">
                                                <DropdownMenu
                                                    options={[
                                                        { value: 'h3', label: 'Título' },
                                                        { value: 'p', label: 'Corpo' }
                                                    ]}
                                                    value={currentFormat}
                                                    onChange={(val) => handleFormatChange(val as string)}
                                                    searchable={false}
                                                    className="shadow-lg"
                                                />
                                            </div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Tags Select (Using Dropdown Component) */}
                        {showTagSelect && (
                            <div className="relative w-[115px]">
                                <Dropdown
                                    size="md"
                                    value="Variáveis"
                                    onClick={() => {
                                        setIsTagMenuOpen(!isTagMenuOpen);
                                        setMenuPosition(null);
                                        setTagSearch("");
                                        setHighlightedIndex(0);
                                    }}
                                    className="cursor-pointer hover:bg-surface-neutral w-full bg-white"
                                    fullWidth
                                />

                                {isTagMenuOpen && (
                                    menuPosition ? createPortal(
                                        <div
                                            className="fixed inset-0"
                                            style={{ zIndex: 9998 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsTagMenuOpen(false);
                                            }}
                                        />,
                                        document.body
                                    ) : null
                                )}
                                {isTagMenuOpen && (
                                    menuPosition ? createPortal(
                                        <div
                                            className="fixed w-[200px]"
                                            style={{
                                                top: `${menuPosition.top}px`,
                                                left: `${menuPosition.left}px`,
                                                zIndex: 9999
                                            }}
                                        >
                                            <DropdownMenu
                                                options={tagOptions.filter(opt =>
                                                    opt.value.toLowerCase().startsWith(tagSearch.toLowerCase())
                                                )}
                                                highlightedIndex={highlightedIndex}
                                                onChange={(val) => handleInsertTag(val as string)}
                                                searchable={false}
                                                className="shadow-xl border border-gray-200"
                                            />
                                        </div>,
                                        document.body
                                    ) : (
                                        <div className="absolute top-full left-0 mt-1 w-full z-20">
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsTagMenuOpen(false)}
                                            />
                                            <DropdownMenu
                                                options={tagOptions.filter(opt =>
                                                    opt.value.toLowerCase().startsWith(tagSearch.toLowerCase())
                                                )}
                                                highlightedIndex={highlightedIndex}
                                                onChange={(val) => handleInsertTag(val as string)}
                                                searchable={false}
                                                className="shadow-lg relative z-20"
                                            />
                                        </div>
                                    )
                                )}
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
                                    title="Negrito"
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
                                    title="Itálico"
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
                                    title="Sublinhado"
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
                                    title="Tachado"
                                >
                                    <StrikethroughS sx={{ fontSize: 14 }} />
                                </button>

                                <div className="w-px h-4 bg-gray-200 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => execCommand('insertUnorderedList')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isUnorderedList ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                    title="Lista não ordenada"
                                >
                                    <FormatListBulleted sx={{ fontSize: 14 }} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => execCommand('insertOrderedList')}
                                    className={clsx(
                                        "w-5 h-5 flex items-center justify-center rounded-[4px] transition-colors",
                                        isOrderedList ? "text-brand-600 bg-surface-brand" : "text-gray-500 hover:bg-surface-neutral"
                                    )}
                                    title="Lista ordenada"
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
                                    title="Inserir link"
                                >
                                    <InsertLink sx={{ fontSize: 14 }} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Text Input Area */}
                <div className="relative w-full z-0">
                    {!hasContent && (
                        <div className="absolute top-3 left-3 text-xs text-gray-400 pointer-events-none font-sans">
                            {placeholder}
                        </div>
                    )}
                    <div
                        ref={editorRef}
                        contentEditable={!disabled}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onKeyUp={() => { checkActiveFormats(); saveSelection(); }}
                        onMouseUp={() => { checkActiveFormats(); saveSelection(); }}
                        onBlur={saveSelection}
                        onPaste={handlePaste}
                        className={clsx(
                            "w-full min-h-[120px] p-3 text-xs text-gray-800 bg-transparent outline-none resize-y overflow-auto font-sans rich-text-editor",
                            "[&>h3]:text-sm [&>h3]:font-bold [&>h3]:mb-1 [&>h3]:block", // Style for H3 (Title)
                            "[&>p]:text-xs [&>p]:mb-1 [&>p]:block",                     // Style for P (Body)
                            "[&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-2",                 // Lists
                            "[&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:mb-2",              // Lists
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
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="tertiary"
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
