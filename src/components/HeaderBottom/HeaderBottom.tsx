import styles from './HeaderBottom.module.scss';
import { HeaderBottomArrowDownIcon } from '~/assets/icons';

export function HeaderBottom() {
  return (
    <div className={styles.HeaderBottom}>
      <div className={styles.left}>
        <div>
          <div className={styles.title}>Название проекта</div>
          <div className={styles.helper}>Аббревиатура</div>
        </div>
        <button className={styles.arrowDownButton}>
          <HeaderBottomArrowDownIcon />
        </button>
      </div>
    </div>
  );
}
