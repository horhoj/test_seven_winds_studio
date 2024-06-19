import { useState } from 'react';
import classNames from 'classnames';
import styles from './HeaderTop.module.scss';
import { HeaderTopBackIcon, HeaderTopGridIcon } from '~/assets/icons';

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const LINK = '#';

const menuLinkList: MenuItem[] = [
  { id: 1, title: 'Просмотр', link: LINK },
  { id: 2, title: 'Управление', link: LINK },
];

export function HeaderTop() {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className={styles.HeaderTop}>
      <HeaderTopGridIcon />
      <HeaderTopBackIcon />
      <ul className={styles.list}>
        {menuLinkList.map((el) => (
          <li key={el.id}>
            <button
              className={classNames(styles.button, el.id === currentId && styles.buttonActive)}
              onClick={() => setCurrentId(el.id)}
            >
              {el.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
