import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from './RadioButton';
import { useState } from 'react';

const meta = {
    title: 'UI/RadioButton',
    component: RadioButton,
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
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Radio Label',
        checked: false,
    },
};

export const Selected: Story = {
    args: {
        label: 'Selected Option',
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
        label: 'Disabled Option',
        checked: false,
        disabled: true,
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [selectedValue, setSelectedValue] = useState('one');
        return (
            <div className="flex flex-col gap-2">
                <RadioButton
                    {...args}
                    label="Option One"
                    name="interactive-group"
                    checked={selectedValue === 'one'}
                    onChange={() => setSelectedValue('one')}
                />
                <RadioButton
                    {...args}
                    label="Option Two"
                    name="interactive-group"
                    checked={selectedValue === 'two'}
                    onChange={() => setSelectedValue('two')}
                />
            </div>
        );
    }
};

export const Group: Story = {
    render: () => {
        return (
            <div className="flex flex-col gap-3">
                <RadioButton label="Option One" name="group1" />
                <RadioButton label="Option Two" name="group1" checked />
                <RadioButton label="Option Three" name="group1" error />
                <RadioButton label="Option Four" name="group1" disabled />
            </div>
        );
    }
};
