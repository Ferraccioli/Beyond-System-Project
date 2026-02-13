import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useState } from 'react';

const meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Checkbox Label',
        checked: false,
    },
};

export const Checked: Story = {
    args: {
        label: 'Checked Item',
        checked: true,
    },
};

export const Error: Story = {
    args: {
        label: 'Error State',
        checked: false,
        error: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Item',
        checked: false,
        disabled: true,
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return (
            <Checkbox
                {...args}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    },
    args: {
        label: 'Click me',
    }
};

export const Group: Story = {
    render: () => {
        return (
            <div className="flex flex-col gap-3">
                <Checkbox label="Option One" />
                <Checkbox label="Option Two" checked />
                <Checkbox label="Option Three" error />
                <Checkbox label="Option Four" disabled />
            </div>
        );
    }
};
