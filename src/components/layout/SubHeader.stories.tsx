import type { Meta, StoryObj } from '@storybook/react';
import SubHeader from './SubHeader';

const meta: Meta<typeof SubHeader> = {
    title: 'Layout/SubHeader',
    component: SubHeader,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        onTabChange: { action: 'tabChanged' },
        onSave: { action: 'saved' },
        showTabsIcons: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof SubHeader>;

export const Default: Story = {
    args: {
        activeTab: 'config',
        showTabsIcons: true,
    },
};

export const WithoutIcons: Story = {
    args: {
        activeTab: 'config',
        showTabsIcons: false,
    },
};

export const PromptSelected: Story = {
    args: {
        activeTab: 'prompt',
        showTabsIcons: true,
    },
};
