import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    siblings: { control: 'number' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(7);
    return <Pagination page={page} totalPages={50} onPageChange={setPage} siblings={2} />;
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};
