import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioCard from './RadioCard';

const meta = {
    title: 'UI/RadioCard',
    component: RadioCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        selected: { control: 'boolean' },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
    args: {
        title: 'Card title',
        description: 'Card description',
    }
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Card title',
        description: 'Card description',
        selected: false,
    },
};

export const Selected: Story = {
    args: {
        title: 'Card title',
        description: 'Card description',
        selected: true,
    },
};

export const Disabled: Story = {
    args: {
        title: 'Card title',
        description: 'Card description',
        selected: false,
        disabled: true,
    },
};

export const Group: Story = {
    render: () => {
        const [selectedValue, setSelectedValue] = useState('one');

        return (
            <div className="flex flex-col gap-3">
                <RadioCard
                    title="Option One"
                    description="Standard selection for general purpose usage."
                    selected={selectedValue === 'one'}
                    onClick={() => setSelectedValue('one')}
                />
                <RadioCard
                    title="Option Two"
                    description="Alternative choice for specialized configurations."
                    selected={selectedValue === 'two'}
                    onClick={() => setSelectedValue('two')}
                />
                <RadioCard
                    title="Option Three"
                    description="Professional tier with advanced features enabled."
                    selected={selectedValue === 'three'}
                    onClick={() => setSelectedValue('three')}
                />
            </div>
        );
    }
};
