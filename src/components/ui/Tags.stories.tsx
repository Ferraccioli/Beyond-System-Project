import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, Close, Info as InfoIcon, Warning as WarningIcon, Error } from '@mui/icons-material';
import Tags from './Tags';

const meta = {
    title: 'UI/Tags',
    component: Tags,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        variant: {
            control: 'select',
            options: ['primary', 'neutral', 'success', 'alert', 'warning', 'info', 'special'],
        },
        size: {
            control: 'radio',
            options: ['md', 'lg'],
        },
    },
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Primary: Story = {
    args: {
        label: 'Label',
        variant: 'primary',
    },
};

export const Neutral: Story = {
    args: {
        label: 'Label',
        variant: 'neutral',
    },
};

export const Success: Story = {
    args: {
        label: 'Label',
        variant: 'success',
        iconLeft: CheckCircle,
    },
};

export const Alert: Story = {
    args: {
        label: 'Label',
        variant: 'alert',
        iconLeft: Error,
    },
};

export const Warning: Story = {
    args: {
        label: 'Label',
        variant: 'warning',
        iconLeft: WarningIcon,
    },
};

export const Info: Story = {
    args: {
        label: 'Label',
        variant: 'info',
        iconLeft: InfoIcon,
    },
};

export const Special: Story = {
    args: {
        label: 'Label',
        variant: 'special',
    },
};

// With Icons
export const WithIcons: Story = {
    args: {
        label: 'Label',
        variant: 'primary',
        iconLeft: CheckCircle,
        iconRight: Close,
    },
};

// Sizes
export const Large: Story = {
    args: {
        label: 'Label',
        size: 'lg',
        variant: 'primary',
    },
};

export const Medium: Story = {
    args: {
        label: 'Label',
        size: 'md',
        variant: 'primary',
    },
};
