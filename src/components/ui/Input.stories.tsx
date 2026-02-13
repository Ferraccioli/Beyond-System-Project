import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Search, Email } from '@mui/icons-material';

const meta = {
    title: 'UI/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        size: {
            control: 'radio',
            options: ['md', 'lg'],
        },
        fullWidth: { control: 'boolean' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        startIcon: { control: false },
        endIcon: { control: false },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Digite algo...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Nome Completo',
        placeholder: 'Ex: João Silva',
    },
};

export const WithIconStart: Story = {
    args: {
        placeholder: 'Buscar...',
        startIcon: <Search />,
    },
};

export const WithIconEnd: Story = {
    args: {
        label: 'Email',
        placeholder: 'seu@email.com',
        endIcon: <Email />,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Email',
        value: 'email_invalido',
        error: true,
        errorMessage: 'Formato de email inválido',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Somente Leitura',
        value: 'Valor fixo',
        disabled: true,
    },
};
