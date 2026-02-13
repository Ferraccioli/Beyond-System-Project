"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowUpward,
    ArrowDownward,
    ThumbUp,
    ThumbDown,
    DeleteOutline
} from "@mui/icons-material";
import Button from "./Button";
import Tags from "./Tags";
import TextArea from "./TextArea";
import Input from "./Input";

export interface QualificationCardProps {
    index: number;
    question: string;
    acceptable: string;
    disqualifying: string;
    onQuestionChange: (value: string) => void;
    onAcceptableChange: (value: string) => void;
    onDisqualifyingChange: (value: string) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isFirst?: boolean;
    isLast?: boolean;
}

const QualificationCard: React.FC<QualificationCardProps> = ({
    index,
    question,
    acceptable,
    disqualifying,
    onQuestionChange,
    onAcceptableChange,
    onDisqualifyingChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isFirst = false,
    isLast = false
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{
                duration: 0.3,
                layout: { type: "spring", stiffness: 300, damping: 30 }
            }}
            className="border border-outline-default rounded-lg p-4 flex flex-col gap-5 bg-white shadow-sm"
        >
            <div className="flex flex-col gap-2">
                {/* Question Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tags
                            label={`Pergunta ${index + 1}`}
                            variant="neutral"
                            size="lg"
                        />
                        <h3 className="text-xs font-semibold text-gray-800 font-display">
                            O que o Agente deve perguntar? <span className="text-alert-500">*</span>
                        </h3>
                    </div>
                    {(onMoveUp || onMoveDown) && (
                        <div className="flex items-center gap-1.5">
                            <Button
                                variant="tertiary"
                                intent="default"
                                size="md"
                                iconOnly
                                startIcon={<ArrowUpward />}
                                disabled={isFirst}
                                onClick={onMoveUp}
                            />
                            <Button
                                variant="tertiary"
                                intent="default"
                                size="md"
                                iconOnly
                                startIcon={<ArrowDownward />}
                                disabled={isLast}
                                onClick={onMoveDown}
                            />
                        </div>
                    )}
                </div>

                {/* Question Input */}
                <Input
                    placeholder="Ex: Qual é o tamanho da sua empresa?"
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    fullWidth
                    size="lg"
                />
            </div>

            {/* Acceptable / Disqualifying Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Acceptable */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <ThumbUp sx={{ fontSize: 16, color: "var(--color-success, #00A344)" }} />
                        <h4 className="text-xs font-semibold text-gray-800 font-display">
                            Resposta aceitável <span className="text-alert-500">*</span>
                        </h4>
                    </div>
                    <TextArea
                        placeholder="Escreva..."
                        value={acceptable}
                        onChange={onAcceptableChange}
                        showToolbar={false}
                        className="min-h-[120px]"
                    />
                    <p className="text-[10px] text-gray-400 leading-normal">
                        Quando o lead responder desta forma, ele será considerado qualificado.
                    </p>
                </div>

                {/* Disqualifying */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <ThumbDown sx={{ fontSize: 16, color: "var(--color-alert, #FC0303)" }} />
                        <h4 className="text-xs font-semibold text-gray-800 font-display">
                            Resposta desqualificante <span className="text-alert-500">*</span>
                        </h4>
                    </div>
                    <TextArea
                        placeholder="Escreva..."
                        value={disqualifying}
                        onChange={onDisqualifyingChange}
                        showToolbar={false}
                        className="min-h-[120px]"
                    />
                    <p className="text-[10px] text-gray-400 leading-normal">
                        Quando o lead responder desta forma, ele será considerado desqualificado.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-start border-t border-outline-default pt-4 mt-1 font-semibold">
                <Button
                    variant="ghost"
                    intent="alert"
                    size="lg"
                    startIcon={<DeleteOutline />}
                    onClick={onDelete}
                >
                    Excluir pergunta de qualificação
                </Button>
            </div>
        </motion.div>
    );
};

export default QualificationCard;
