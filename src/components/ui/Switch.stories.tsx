import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Switch from './Switch';

const meta = {
    title: 'UI/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        onCheckedChange: { action: 'toggled' },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        labelPosition: {
            control: 'select',
            options: ['left', 'right'],
        },
        leftLabel: { control: 'text' },
        rightLabel: { control: 'text' },
    },
    // Add a render function that handles state for all stories by default
    render: (args) => {
        const [checked, setChecked] = useState(args.checked);
        return (
            <Switch
                {...args}
                checked={checked}
                onCheckedChange={(val) => {
                    setChecked(val);
                    args.onCheckedChange?.(val);
                }}
            />
        );
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Usage
export const Default: Story = {
    args: {
        checked: false,
    },
};

export const Active: Story = {
    args: {
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        checked: false,
        disabled: true,
    },
};

export const DisabledActive: Story = {
    args: {
        checked: true,
        disabled: true,
    },
};

// With Single Label
export const WithLabel: Story = {
    args: {
        checked: false,
        label: "Ativar Notificações",
    },
};

export const WithLeftLabel: Story = {
    args: {
        checked: true,
        label: "Modo Escuro",
        labelPosition: "left",
    },
};

// With Dual Labels (Monthly/Yearly Toggle Style)
export const DualLabels: Story = {
    args: {
        checked: false,
        leftLabel: "Mensal",
        rightLabel: "Anual",
    },
};
