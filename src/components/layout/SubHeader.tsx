
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Tabs from "../ui/Tabs";
import { ArrowBack, FiberManualRecord, History, MiscellaneousServices, Construction } from "@mui/icons-material";

interface SubHeaderProps {
    activeTab?: 'config' | 'prompt';
    onTabChange?: (tab: 'config' | 'prompt') => void;
    onSave?: () => void;
    showTabsIcons?: boolean;
}

export default function SubHeader({
    activeTab = 'config',
    onTabChange,
    onSave,
    showTabsIcons = true
}: SubHeaderProps) {
    const tabs = [
        { id: 'config', label: 'Configurar', icon: <MiscellaneousServices /> },
        { id: 'prompt', label: 'Prompt', icon: <Construction /> },
    ];

    return (
        <div className="w-full h-[54px] bg-white border-b border-outline-default flex items-center justify-between px-4 py-1">
            {/* Left: Breadcrumbs & Tabs */}
            <div className="flex items-center gap-2 h-7">

                {/* Back Button (Icon Only) */}
                <Button
                    variant="secondary"
                    size="md"
                    iconOnly
                    className="w-7 h-7 text-gray-500 border-outline-default"
                >
                    <ArrowBack sx={{ fontSize: 14 }} />
                </Button>

                {/* Status Dropdown */}
                <div className="w-[140px]">
                    <Dropdown
                        size="md"
                        value="Rascunho"
                        startIcon={<FiberManualRecord sx={{ fontSize: 8, color: '#696c71' }} />}
                        className="h-7 text-3xs font-semibold"
                    />
                </div>

                {/* History Icon */}
                <Button
                    variant="secondary"
                    size="md"
                    iconOnly
                    className="w-7 h-7"
                >
                    <History sx={{ fontSize: 18 }} />
                </Button>
            </div>

            {/* Center: Tabs (Configurar / Prompt) */}
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                showIcons={showTabsIcons}
                onChange={(id) => onTabChange?.(id as 'config' | 'prompt')}
            />

            {/* Right: Actions */}
            <div className="flex items-center">
                <Button
                    variant="primary"
                    size="md"
                    onClick={onSave}
                    className="h-7 text-3xs font-semibold"
                >
                    Salvar Alterações
                </Button>
            </div>
        </div>
    );
}
