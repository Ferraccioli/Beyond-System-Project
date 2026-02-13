import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta = {
    title: 'UI/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'alert', 'info', 'warning', 'neutral'],
        },
        message: { control: 'text' },
        duration: { control: 'number' },
    },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        variant: 'success',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et.',
    },
};

export const Alert: Story = {
    args: {
        variant: 'alert',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et.',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et.',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et.',
    },
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et.',
    },
};
