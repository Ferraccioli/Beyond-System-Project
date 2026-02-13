"use client";

import React from "react";
import { motion } from "framer-motion";
import { Delete } from "@mui/icons-material";
import Button from "./Button";
import Tags from "./Tags";
import TextArea from "./TextArea";

export interface ObjectionCardProps {
    index: number;
    objection: string;
    response: string;
    onObjectionChange: (value: string) => void;
    onResponseChange: (value: string) => void;
    onDelete: () => void;
}

const ObjectionCard: React.FC<ObjectionCardProps> = ({
    index,
    objection,
    response,
    onObjectionChange,
    onResponseChange,
    onDelete
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-outline-default rounded-lg p-5 flex flex-col gap-5 shadow-sm"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-800 font-display">
                        Objeção do lead <span className="text-alert-500">*</span>
                    </h3>
                    <Tags
                        variant="neutral"
                        size="md"
                        label={`Objeção ${index + 1}`}
                        className="!h-[18px]"
                    />
                </div>
                <TextArea
                    placeholder="Ex: O preço está muito alto..."
                    value={objection}
                    onChange={onObjectionChange}
                    showToolbar={false}
                    showActions={false}
                    className="min-h-[80px]"
                />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-gray-800 font-display">
                    Como o Agente deve contornar? <span className="text-alert-500">*</span>
                </h3>
                <TextArea
                    placeholder="Escreva o contorno ideal..."
                    value={response}
                    onChange={onResponseChange}
                    showToolbar={false}
                    showActions={false}
                    className="min-h-[120px]"
                />
            </div>

            <div className="flex">
                <Button
                    variant="ghost"
                    intent="alert"
                    size="lg"
                    startIcon={<Delete />}
                    onClick={onDelete}
                    className="!p-0 !h-auto"
                >
                    Excluir objeção
                </Button>
            </div>
        </motion.div>
    );
};

export default ObjectionCard;
