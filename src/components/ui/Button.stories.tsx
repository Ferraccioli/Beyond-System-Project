import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Add, Delete, Save } from '@mui/icons-material';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'ghost'],
        },
        intent: {
            control: 'select',
            options: ['default', 'success', 'info', 'alert', 'neutral', 'warning'],
        },
        size: {
            control: 'radio',
            options: ['md', 'lg'],
        },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        iconOnly: { control: 'boolean' },
        startIcon: { control: false },
        endIcon: { control: false },
        children: { control: 'text' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button',
    },
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        children: 'Tertiary',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost Action',
        startIcon: <Add />,
    },
};

export const SuccessGhost: Story = {
    args: {
        variant: 'ghost',
        intent: 'success',
        children: 'Confirmar',
        startIcon: <Save />,
    },
};

export const AlertSecondary: Story = {
    args: {
        variant: 'secondary',
        intent: 'alert',
        children: 'Deletar',
        startIcon: <Delete />,
    },
};

export const WithIconStart: Story = {
    args: {
        variant: 'primary',
        children: 'Adicionar',
        startIcon: <Add />,
    },
};

export const WithIconEnd: Story = {
    args: {
        variant: 'secondary',
        children: 'Deletar',
        endIcon: <Delete />,
    },
};

export const Loading: Story = {
    args: {
        variant: 'primary',
        children: 'Salvando',
        loading: true,
    },
};

export const IconOnly: Story = {
    args: {
        variant: 'secondary',
        iconOnly: true,
        children: <Save />,
    },
};
