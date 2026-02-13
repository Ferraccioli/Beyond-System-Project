import type { Meta, StoryObj } from '@storybook/react';
import AgentCard from './AgentCard';

const meta = {
    title: 'Agents/AgentCard',
    component: AgentCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        description: { control: 'text' },
        intention: { control: 'text' },
        approach: { control: 'text' },
        qualificationsCount: { control: 'number' },
        objectionsCount: { control: 'number' },
        authorityCount: { control: 'number' },
        tools: { control: 'object' }, // Array of strings is edited as object/JSON
    },
} satisfies Meta<typeof AgentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: '[Evento v4]',
        description: 'Agente especializado em qualificação de leads B2B para eventos.',
        intention: 'Qualificação',
        approach: '(B2B) Levantada de Mão',
        tools: ['Qualificação', 'Agendamento'],
        qualificationsCount: 4,
        objectionsCount: 7,
        authorityCount: 2,
    },
};

export const CustomAgent: Story = {
    args: {
        name: 'Consultor de Vendas',
        description: 'Focado em fechamento de vendas complexas.',
        intention: 'Vendas',
        approach: 'Consultiva',
        tools: ['CRM', 'Negociação', 'Contratos'],
        qualificationsCount: 10,
        objectionsCount: 15,
        authorityCount: 5,
    },
};
