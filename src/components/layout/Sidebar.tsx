
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <div className="w-[250px] h-full bg-white border-r border-outline-default flex flex-col py-6 px-5 shrink-0">

            {/* Section 1: Configuração do Agente */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex items-center">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase font-display">
                        configuração do agente
                    </h3>
                </div>

                <div className="flex flex-col gap-2">
                    <SidebarItem
                        label="Personalização do Agente IA"
                        status="pending"
                        active
                    />
                    <SidebarItem
                        label="Ferramentas"
                        status="pending"
                    />
                </div>
            </div>

            {/* Section 2: Pitch e Negociação */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase font-display">
                        pitch e negociação
                    </h3>
                </div>

                <div className="flex flex-col gap-2">
                    <SidebarItem
                        label="Intenção e Abordagem"
                        status="completed"
                    />
                    <SidebarItem
                        label="Qualificação"
                        status="completed"
                    />
                    <SidebarItem
                        label="Contorno de Objeções"
                        status="alert"
                    />
                    <SidebarItem
                        label="Argumentos de Autoridade"
                        status="alert"
                    />
                </div>
            </div>

        </div>
    );
}
