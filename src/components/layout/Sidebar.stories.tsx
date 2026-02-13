import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';

const meta = {
    title: 'Layout/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen', // Sidebar usually takes full height
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div className="h-screen flex">
                <Story />
                <div className="flex-1 bg-gray-50 p-8">
                    <h1 className="text-2xl font-bold text-gray-800">Conteúdo Principal</h1>
                    <p className="text-gray-500 mt-2">O sidebar ocupa a esquerda da tela.</p>
                </div>
            </div>
        ),
    ],
};
