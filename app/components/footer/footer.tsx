import { Link } from '~/components/link';
import { Text } from '~/components/text';
import { classes } from '~/utils/style';
import config from '~/config.json';
import styles from './footer.module.css';

interface FooterProps {
    className?: string;
  }

export const Footer : React.FC<FooterProps> = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} ${config.name}.`}
      </span>
      <Link secondary className={styles.link} href="/humans.txt" target="_self">
        Crafted by yours truly
      </Link>
    </Text>
  </footer>
);
