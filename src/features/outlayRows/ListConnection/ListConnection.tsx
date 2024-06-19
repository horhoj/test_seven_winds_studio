import { useMemo } from 'react';
import { ListPosition } from '../types';
import styles from './ListConnection.module.scss';
import { getUUID } from '~/utils/getUUID';

interface ListConnectionProps {
  listPosition: ListPosition[];
  deep: number;
  children: React.ReactNode;
}
export function ListConnection({ listPosition, deep, children }: ListConnectionProps) {
  const data = useMemo(
    // () => listPosition.map((position) => ({ position, id: getUUID() })).slice(1),
    () => listPosition.map((position) => ({ position, id: getUUID() })),
    [listPosition, deep],
  );

  return (
    <div className={styles.ListConnection}>
      {data.map((el) => (
        <div key={el.id} className={styles.connect}>
          {el.position === ListPosition.BOUND && (
            <>
              <div className={styles.centerVerticalLine} />
            </>
          )}

          {el.position === ListPosition.START && (
            <>
              <div className={styles.centerVerticalLine} />
              <div className={styles.centerHorizontalHalfLine} />
            </>
          )}

          {el.position === ListPosition.CENTER && (
            <>
              <div className={styles.centerVerticalLine} />
              <div className={styles.centerHorizontalHalfLine} />
            </>
          )}

          {el.position === ListPosition.END && (
            <>
              <div className={styles.centerHorizontalHalfLine} />
              <div className={styles.centerVerticalHalfLine} />
            </>
          )}
        </div>
      ))}
      <div className={styles.iconWrapper} onDoubleClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
