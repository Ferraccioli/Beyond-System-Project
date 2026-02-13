import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import { MiscellaneousServices, Construction } from '@mui/icons-material';

const meta: Meta<typeof Tabs> = {
    title: 'UI/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'changed' },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        tabs: [
            { id: 'config', label: 'Configurar', icon: <MiscellaneousServices /> },
            { id: 'prompt', label: 'Prompt', icon: <Construction /> },
        ],
        activeTab: 'config',
    },
};

export const PromptActive: Story = {
    args: {
        tabs: [
            { id: 'config', label: 'Configurar', icon: <MiscellaneousServices /> },
            { id: 'prompt', label: 'Prompt', icon: <Construction /> },
        ],
        activeTab: 'prompt',
    },
};
