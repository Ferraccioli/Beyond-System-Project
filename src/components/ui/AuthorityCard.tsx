"use client";

import React from "react";
import { motion } from "framer-motion";
import { Delete } from "@mui/icons-material";
import Button from "./Button";
import Tags from "./Tags";
import TextArea from "./TextArea";

export interface AuthorityCardProps {
    index: number;
    content: string;
    onContentChange: (value: string) => void;
    onDelete: () => void;
}

const AuthorityCard: React.FC<AuthorityCardProps> = ({
    index,
    content,
    onContentChange,
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
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-gray-800 font-display">
                            Escreva o argumento de autoridade da sua solução <span className="text-alert-500">*</span>
                        </h3>
                        <Tags
                            variant="neutral"
                            size="md"
                            label={`Argumento ${index + 1}`}
                            className="!h-[18px]"
                        />
                    </div>
                    <p className="text-xs text-gray-500 font-normal leading-[16px]">
                        Descreva dados, cases, clientes famosos, ou certificações relevantes.
                    </p>
                </div>

                <TextArea
                    placeholder="Ex: Nossa empresa tem mais de 10 anos de experiência..."
                    value={content}
                    onChange={onContentChange}
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
                    Excluir Argumento de Autoridade
                </Button>
            </div>
        </motion.div>
    );
};

export default AuthorityCard;
