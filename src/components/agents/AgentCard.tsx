import React from "react";
import {
    MoreVert,
    Assignment,
    PanTool,
    CheckCircleOutline,
    WarningAmber,
    WorkspacePremium
} from "@mui/icons-material";

interface AgentCardProps {
    name?: string;
    description?: string;
    intention?: string;
    tools?: string[];
    approach?: string;
    qualificationsCount?: number;
    objectionsCount?: number;
    authorityCount?: number;
}

export default function AgentCard({
    name = "[Evento v4]",
    description = "Sem descrição",
    intention = "Qualificação",
    tools = ["Qualificação"],
    approach = "(B2B) Levantada de Mão",
    qualificationsCount = 4,
    objectionsCount = 7,
    authorityCount = 2,
}: AgentCardProps) {
    return (
        <div className="w-full bg-surface-default border border-outline-default rounded-[4px] p-6 flex items-stretch gap-6 shadow-sm hover:shadow-md transition-shadow font-sans">
            {/* Menu / Drag Handle Section */}
            <div className="min-w-[16px] flex flex-col items-center pt-1">
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVert fontSize="small" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6">

                {/* Header: Intention & Name */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        {/* Intention Tag */}
                        <span className="bg-special text-white text-xs font-medium px-3 py-1 rounded-full">
                            {intention}
                        </span>
                        {/* Agent Name */}
                        <h3 className="text-sm font-semibold text-gray-600">
                            {name}
                        </h3>
                    </div>
                    {/* Description */}
                    <p className="text-xs text-gray-300 font-medium whitespace-pre-wrap">
                        {description}
                    </p>
                </div>

                {/* Tools Section */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>FERRAMENTAS</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                        {(tools || []).map((tool, index) => (
                            <div key={index} className="flex items-center gap-1 bg-surface-special border border-purple-100 rounded-[4px] px-2 py-1 text-gray-800">
                                <Assignment sx={{ fontSize: 12 }} className="text-special" />
                                <span className="text-[10px] font-medium font-sans">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Capacities Section */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>CAPACIDADES</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                        {/* Approach */}
                        <CapacityTag
                            icon={<PanTool sx={{ fontSize: 12 }} />}
                            text={`Abordagem: ${approach}`}
                            variant="orange"
                        />
                        {/* Qualifications */}
                        <CapacityTag
                            icon={<CheckCircleOutline sx={{ fontSize: 14 }} />}
                            text={`${qualificationsCount} qualificações`}
                            variant="purple"
                        />
                        {/* Objections */}
                        <CapacityTag
                            icon={<WarningAmber sx={{ fontSize: 12 }} />}
                            text={`${objectionsCount} objeções`}
                            variant="teal"
                        />
                        {/* Authority */}
                        <CapacityTag
                            icon={<WorkspacePremium sx={{ fontSize: 12 }} />}
                            text={`${authorityCount} argumentos de autoridade`}
                            variant="blue"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

// Sub-components for internal organization

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 w-full">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                {children}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    );
}

function CapacityTag({ icon, text, variant }: { icon: React.ReactNode; text: string; variant: 'orange' | 'purple' | 'teal' | 'blue' }) {
    const variants = {
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
        teal: "bg-green-50 text-green-700", // Using green tokens for teal/success-ish feel as per Figma colors roughly
        blue: "bg-blue-50 text-blue-600"
    };

    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-[2px] ${variants[variant]}`}>
            {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "text-current" })
                : icon}
            <span className="text-xs font-medium">{text}</span>
        </div>
    );
}
