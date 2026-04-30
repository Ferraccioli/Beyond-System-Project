import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from './Button';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
    },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Texto de ajuda ou contexto adicional',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Passe o mouse aqui</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map(p => (
        <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
          <Button variant="secondary">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: 'Este tooltip contém um texto mais longo para demonstrar o comportamento de quebra de linha com maxWidth de 240px.',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Tooltip longo</Button>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  args: {
    content: 'Isso não vai aparecer',
    disabled: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Tooltip desabilitado</Button>
    </Tooltip>
  ),
};
