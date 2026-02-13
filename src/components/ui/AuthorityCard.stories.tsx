import type { Meta, StoryObj } from '@storybook/react';
import AuthorityCard from './AuthorityCard';
import { useState } from 'react';

const meta = {
    title: 'UI/AuthorityCard',
    component: AuthorityCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        index: { control: 'number' },
        content: { control: 'text' },
        onContentChange: { action: 'contentChange' },
        onDelete: { action: 'delete' },
    },
    args: {
        onContentChange: () => { },
        onDelete: () => { },
    }
} satisfies Meta<typeof AuthorityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        index: 0,
        content: 'Nossa empresa tem mais de 20 anos no mercado de tecnologia, atendendo grandes empresas como Google e Microsoft.',
    },
};

export const Empty: Story = {
    args: {
        index: 1,
        content: '',
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [content, setContent] = useState(args.content);
        return (
            <div className="max-w-[600px]">
                <AuthorityCard
                    {...args}
                    content={content}
                    onContentChange={(val) => setContent(val)}
                />
            </div>
        );
    },
    args: {
        index: 0,
        content: 'Edite este texto para testar o componente.',
    }
};
