import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableRow, TableHead, TableBody, TableHeadCell, TableCell } from '~/components/table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Header 1</TableHeadCell>
            <TableHeadCell>Header 2</TableHeadCell>
            <TableHeadCell>Header 3</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Row 1, Cell 1</TableCell>
            <TableCell>Row 1, Cell 2</TableCell>
            <TableCell>Row 1, Cell 3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2, Cell 1</TableCell>
            <TableCell>Row 2, Cell 2</TableCell>
            <TableCell>Row 2, Cell 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
};
