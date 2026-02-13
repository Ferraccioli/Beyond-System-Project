import type { Meta, StoryObj } from '@storybook/react';
import ObjectionCard from './ObjectionCard';
import { useState } from 'react';

const meta = {
    title: 'UI/ObjectionCard',
    component: ObjectionCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        index: { control: 'number' },
        objection: { control: 'text' },
        response: { control: 'text' },
        onObjectionChange: { action: 'objectionChange' },
        onResponseChange: { action: 'responseChange' },
        onDelete: { action: 'delete' },
    },
    args: {
        onObjectionChange: () => { },
        onResponseChange: () => { },
        onDelete: () => { },
    }
} satisfies Meta<typeof ObjectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        index: 0,
        objection: 'O investimento parece muito alto para o nosso momento atual.',
        response: 'Entendo perfeitamente. No entanto, se considerarmos o ROI em 6 meses, o investimento se paga 3 vezes.',
    },
};

export const Empty: Story = {
    args: {
        index: 2,
        objection: '',
        response: '',
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [objection, setObjection] = useState(args.objection);
        const [response, setResponse] = useState(args.response);
        return (
            <div className="max-w-[600px]">
                <ObjectionCard
                    {...args}
                    objection={objection}
                    response={response}
                    onObjectionChange={setObjection}
                    onResponseChange={setResponse}
                />
            </div>
        );
    },
    args: {
        index: 0,
        objection: 'Objeção aqui...',
        response: 'Resposta aqui...',
    }
};
