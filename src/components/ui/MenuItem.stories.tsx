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

export const SelectedWithDescription: Story = {
    args: {
        label: 'Selected Item',
        description: 'This is a description for the selected item',
        type: 'none',
        selected: true,
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

export const TextWrapping: Story = {
    args: {
        label: 'This is a very long menu item label that should wrap to the next line instead of truncating',
        description: 'And this is an even longer description that will also wrap to multiple lines when it exceeds the available space',
        type: 'checkbox',
    },
};

export const MenuList: Story = {
    args: {
        label: 'Menu List',
        type: 'none',
    },
    render: () => (
        <div className="w-64 bg-white border border-outline-default rounded-md overflow-hidden shadow-sm">
            <MenuItem label="First Item" description="Description for first item" type="none" />
            <MenuItem label="Second Item" type="none" />
            <MenuItem label="Third Item" description="Selected with description" type="none" selected />
            <MenuItem label="Fourth Item" type="none" />
            <MenuItem label="Disabled Item" description="Disabled description" type="none" disabled />
        </div>
    ),
};

export const CheckboxList: Story = {
    args: {
        label: 'Checkbox List',
        type: 'checkbox',
    },
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
    args: {
        label: 'Radio List',
        type: 'radio',
    },
    render: () => (
        <div className="w-64 bg-white border border-outline-default rounded-md overflow-hidden shadow-sm">
            <MenuItem label="Option 1" type="radio" />
            <MenuItem label="Option 2" type="radio" selected />
            <MenuItem label="Option 3" type="radio" />
            <MenuItem label="Option 4" type="radio" disabled />
        </div>
    ),
};
