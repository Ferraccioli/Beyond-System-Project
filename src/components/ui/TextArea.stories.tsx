import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta = {
    title: 'UI/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
        showToolbar: { control: 'boolean' },
        showActions: { control: 'boolean' },
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Escreva sua mensagem...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Descrição',
        placeholder: 'Detelhe a situação...',
    },
};

export const RichTextEditor: Story = {
    args: {
        label: 'Conteúdo Rico',
        placeholder: 'Comece a escrever...',
        showToolbar: true,
        showFormattingIcons: true,
        showTitleSelect: true,
        showTagSelect: true,
    },
};

export const WithActions: Story = {
    args: {
        label: 'Comentários',
        placeholder: 'Deixe seu comentário...',
        showActions: true,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Mensagem',
        error: true,
        placeholder: 'Campo obrigatório...',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Desativado',
        value: 'Conteúdo bloqueado para edição.',
        disabled: true,
    },
};
