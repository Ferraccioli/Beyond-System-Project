import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size:   { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['online', 'offline', 'busy'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Thiago Ferraccioli', size: 'md' },
};

export const SingleName: Story = {
  args: { name: 'Ana', size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Avatar key={size} name="Thiago Ferraccioli" size={size} />
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar name="Thiago Ferraccioli" size="md" status="online" />
      <Avatar name="Rafael Kato" size="md" status="busy" />
      <Avatar name="Ana Meireles" size="md" status="offline" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {['Thiago Ferraccioli', 'João Dias', 'Ana Meireles', 'Rafael Kato'].map((name, i) => (
        <div key={name} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 4 - i, position: 'relative' }}>
          <Avatar name={name} size="sm" />
        </div>
      ))}
    </div>
  ),
};
