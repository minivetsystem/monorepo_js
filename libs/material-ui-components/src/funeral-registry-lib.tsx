import styles from './funeral-registry-lib.module.scss';

/* eslint-disable-next-line */
export interface FuneralRegistryLibProps {}

export function FuneralRegistryLib(props: FuneralRegistryLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FuneralRegistryLib!</h1>
    </div>
  );
}

export default FuneralRegistryLib;
