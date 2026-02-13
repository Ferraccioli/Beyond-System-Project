import type { Meta, StoryObj } from '@storybook/react';
import QualificationCard from './QualificationCard';
// Force rebuild after dependency installation

const meta = {
    title: 'UI/QualificationCard',
    component: QualificationCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        index: { control: 'number' },
        question: { control: 'text' },
        acceptable: { control: 'text' },
        disqualifying: { control: 'text' },
        isFirst: { control: 'boolean' },
        isLast: { control: 'boolean' },
        onQuestionChange: { action: 'questionChange' },
        onAcceptableChange: { action: 'acceptableChange' },
        onDisqualifyingChange: { action: 'disqualifyingChange' },
        onDelete: { action: 'delete' },
        onMoveUp: { action: 'moveUp' },
        onMoveDown: { action: 'moveDown' },
    },
    args: {
        onQuestionChange: () => { },
        onAcceptableChange: () => { },
        onDisqualifyingChange: () => { },
        onDelete: () => { },
    }
} satisfies Meta<typeof QualificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        index: 0,
        question: 'Qual é o tamanho da sua empresa?',
        acceptable: 'Acima de 50 funcionários',
        disqualifying: 'Empresas individuais ou com menos de 5 funcionários',
        isFirst: true,
        isLast: false,
    },
};

export const Empty: Story = {
    args: {
        index: 1,
        question: '',
        acceptable: '',
        disqualifying: '',
        isFirst: false,
        isLast: true,
    },
};

export const Middle: Story = {
    args: {
        index: 1,
        question: 'Você já utiliza alguma ferramenta de CRM?',
        acceptable: 'Sim, Salesforce ou Hubspot',
        disqualifying: 'Não utiliza CRM ou usa planilhas',
        isFirst: false,
        isLast: false,
    },
};
