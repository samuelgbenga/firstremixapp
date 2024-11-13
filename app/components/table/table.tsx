import styles from './table.module.css';

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => (
  <table className={styles.table}>{children}</table>
);

export const TableRow: React.FC<TableProps> = ({ children }) => (
  <tr className={styles.row}>{children}</tr>
);

export const TableHead: React.FC<TableProps> = ({ children }) => (
  <thead className={styles.head}>{children}</thead>
);

export const TableBody: React.FC<TableProps> = ({ children }) => (
  <tbody className={styles.body}>{children}</tbody>
);

export const TableHeadCell: React.FC<TableProps> = ({ children }) => (
  <th className={styles.headCell}>{children}</th>
);

export const TableCell: React.FC<TableProps> = ({ children }) => (
  <td className={styles.cell}>{children}</td>
);
