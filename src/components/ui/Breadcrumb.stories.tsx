import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Início' },
      { label: 'Clientes' },
      { label: 'Flash Pagamentos' },
    ],
  },
};

export const Clickable: Story = {
  args: {
    items: [
      { label: 'Início',   onClick: () => alert('Início') },
      { label: 'Agentes',  onClick: () => alert('Agentes') },
      { label: 'Prospecção outbound' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Contatos', onClick: () => {} },
      { label: 'Rafael Kato' },
    ],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'Início',    onClick: () => {} },
      { label: 'Campanhas', onClick: () => {} },
      { label: 'Q2 2026',   onClick: () => {} },
      { label: 'Sequência de emails', onClick: () => {} },
      { label: 'Email #3 — Follow-up' },
    ],
  },
};
