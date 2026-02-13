import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';

const meta = {
    title: 'UI/MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        description: { control: 'text' },
        selected: { control: 'boolean' },
        disabled: { control: 'boolean' },
        type: {
            control: 'select',
            options: ['none', 'checkbox', 'radio']
        },
    },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Menu Item',
        type: 'none',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Menu Item',
        description: 'This is a helpful description',
        type: 'none',
    },
};

export const WithCheckbox: Story = {
    args: {
        label: 'Checkbox Item',
        type: 'checkbox',
        selected: false,
    },
};

export const CheckboxSelected: Story = {
    args: {
        label: 'Selected Checkbox',
        type: 'checkbox',
        selected: true,
    },
};

export const WithRadio: Story = {
    args: {
        label: 'Radio Item',
        type: 'radio',
        selected: false,
    },
};

export const RadioSelected: Story = {
    args: {
        label: 'Selected Radio',
        type: 'radio',
        selected: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Item',
        type: 'checkbox',
        disabled: true,
    },
};

export const DisabledSelected: Story = {
    args: {
        label: 'Disabled Selected',
        type: 'checkbox',
        selected: true,
        disabled: true,
    },
};

export const LongText: Story = {
    args: {
        label: 'This is a very long menu item label that should truncate with ellipsis',
        description: 'And this is an even longer description that will also truncate when it exceeds the available space',
        type: 'checkbox',
    },
};

export const MenuList: Story = {
    render: () => (
        <div className="w-64 bg-white border border-outline-default rounded-md overflow-hidden shadow-sm">
            <MenuItem label="First Item" type="none" />
            <MenuItem label="Second Item" type="none" />
            <MenuItem label="Third Item" type="none" selected />
            <MenuItem label="Fourth Item" type="none" />
            <MenuItem label="Disabled Item" type="none" disabled />
        </div>
    ),
};

export const CheckboxList: Story = {
    render: () => (
        <div className="w-64 bg-white border border-outline-default rounded-md overflow-hidden shadow-sm">
            <MenuItem label="Option 1" type="checkbox" />
            <MenuItem label="Option 2" type="checkbox" selected />
            <MenuItem label="Option 3" type="checkbox" selected />
            <MenuItem label="Option 4" type="checkbox" disabled />
            <MenuItem label="Option 5" type="checkbox" />
        </div>
    ),
};

export const RadioList: Story = {
    render: () => (
        <div className="w-64 bg-white border border-outline-default rounded-md overflow-hidden shadow-sm">
            <MenuItem label="Option 1" type="radio" />
            <MenuItem label="Option 2" type="radio" selected />
            <MenuItem label="Option 3" type="radio" />
            <MenuItem label="Option 4" type="radio" disabled />
        </div>
    ),
};
