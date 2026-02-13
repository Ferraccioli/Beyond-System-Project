import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import { FilterList } from '@mui/icons-material';

const meta = {
    title: 'UI/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        placeholder: { control: 'text' },
        label: { control: 'text' },
        size: {
            control: 'radio',
            options: ['md', 'lg'],
        },
        fullWidth: { control: 'boolean' },
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
        startIcon: { control: false },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Selecione uma opção',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Categoria',
        placeholder: 'Selecione',
    },
};

export const WithValue: Story = {
    args: {
        label: 'Status',
        value: 'Ativo',
    },
};

export const WithIcon: Story = {
    args: {
        value: 'Filtros',
        startIcon: <FilterList />,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Campo Obrigatório',
        error: true,
        placeholder: 'Selecione',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Indisponível',
        disabled: true,
        value: 'Bloqueado',
    },
};
