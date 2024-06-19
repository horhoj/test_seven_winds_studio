import { useState } from 'react';
import classNames from 'classnames';
import styles from './LeftMenu.module.scss';
import { LeftMenuItemIcon } from '~/assets/icons';

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const LINK = '#';

const menuLinkList: MenuItem[] = [
  { id: 1, title: 'По проекту', link: LINK },
  { id: 2, title: 'Объекты', link: LINK },
  { id: 3, title: 'РД', link: LINK },
  { id: 4, title: 'МТО', link: LINK },
  { id: 5, title: 'СМР', link: LINK },
  { id: 6, title: 'График', link: LINK },
  { id: 7, title: 'МиМ', link: LINK },
  { id: 8, title: 'Рабочие', link: LINK },
  { id: 9, title: 'Капвложения', link: LINK },
  { id: 10, title: 'Бюджет', link: LINK },
  { id: 11, title: 'Финансирование', link: LINK },
  { id: 12, title: 'Панорамы', link: LINK },
  { id: 13, title: 'Камеры', link: LINK },
  { id: 14, title: 'Поручения', link: LINK },
  { id: 15, title: 'Контрагенты', link: LINK },
];

export function LeftMenu() {
  const [currentId, setCurrentId] = useState(5);

  return (
    <div className={styles.LeftMenu}>
      <ul className={styles.list}>
        {menuLinkList.map((el) => (
          <li key={el.id} className={classNames(styles.link, el.id === currentId && styles.linkActive)}>
            <button onClick={() => setCurrentId(el.id)}>
              <LeftMenuItemIcon /> {el.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
