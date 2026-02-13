import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

const meta = {
    title: 'UI/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        multiple: { control: 'boolean' },
        searchable: { control: 'boolean' },
        searchPlaceholder: { control: 'text' },
        maxHeight: { control: 'number' },
    },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3 com texto muito longo para testar overflow' },
    { value: '4', label: 'Opção 4', disabled: true },
    { value: '5', label: 'Opção 5' },
    { value: '6', label: 'Opção 6' },
];

const sampleSections = [
    {
        title: 'Frutas',
        options: [
            { value: 'apple', label: 'Maçã' },
            { value: 'banana', label: 'Banana' },
            { value: 'orange', label: 'Laranja' },
        ],
    },
    {
        title: 'Vegetais',
        options: [
            { value: 'carrot', label: 'Cenoura' },
            { value: 'broccoli', label: 'Brócolis', disabled: true },
            { value: 'lettuce', label: 'Alface' },
        ],
    },
    {
        title: 'Proteínas',
        options: [
            { value: 'chicken', label: 'Frango' },
            { value: 'beef', label: 'Carne' },
            { value: 'fish', label: 'Peixe' },
        ],
    },
];

export const Default: Story = {
    args: {
        options: sampleOptions,
        searchable: false,
        multiple: false,
    },
};

export const WithSearch: Story = {
    args: {
        options: sampleOptions,
        searchable: true,
        searchPlaceholder: 'Pesquisar opções...',
        multiple: false,
    },
};

export const MultipleSelection: Story = {
    args: {
        options: sampleOptions,
        searchable: true,
        multiple: true,
    },
};

export const SectionedList: Story = {
    args: {
        sections: sampleSections,
        searchable: true,
        multiple: false,
    },
};

export const SectionedMultiple: Story = {
    args: {
        sections: sampleSections,
        searchable: true,
        multiple: true,
    },
};

export const Interactive: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('');
        return (
            <div className="flex flex-col gap-4">
                <DropdownMenu
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
                <div className="text-xs text-body">
                    Selecionado: <strong>{value || 'Nenhum'}</strong>
                </div>
            </div>
        );
    },
    args: {
        options: sampleOptions,
        searchable: true,
        multiple: false,
    },
};

export const InteractiveMultiple: Story = {
    render: (args) => {
        const [values, setValues] = useState<string[]>([]);
        return (
            <div className="flex flex-col gap-4">
                <DropdownMenu
                    {...args}
                    value={values}
                    onChange={(v) => setValues(v as string[])}
                />
                <div className="text-xs text-body">
                    Selecionados: <strong>{values.length > 0 ? values.join(', ') : 'Nenhum'}</strong>
                </div>
            </div>
        );
    },
    args: {
        options: sampleOptions,
        searchable: true,
        multiple: true,
    },
};

export const SectionedInteractive: Story = {
    render: (args) => {
        const [values, setValues] = useState<string[]>([]);
        return (
            <div className="flex flex-col gap-4" style={{ width: '300px' }}>
                <DropdownMenu
                    {...args}
                    value={values}
                    onChange={(v) => setValues(v as string[])}
                />
                <div className="text-xs text-body">
                    Selecionados ({values.length}): <strong>{values.length > 0 ? values.join(', ') : 'Nenhum'}</strong>
                </div>
            </div>
        );
    },
    args: {
        sections: sampleSections,
        searchable: true,
        multiple: true,
    },
};
