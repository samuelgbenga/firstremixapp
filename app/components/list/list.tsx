import { classes } from '~/utils/style';
import styles from './list.module.css';

interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const List = ({ ordered, children, className, ...rest }: ListProps) => {
  const Element = ordered ? 'ol' : 'ul';

  return (
    <Element className={classes(styles.list, className)} {...rest}>
      {children}
    </Element>
  );
};

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListItem = ({ children, ...rest }: ListItemProps) => {
  return (
    <li className={styles.item} {...rest}>
      {children}
    </li>
  );
};
