import { IconButtonProps } from 'src/components/shared/iconButton/iconButton.interfaces';

import styles from 'src/components/shared/iconButton/iconButton.module.scss';

function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <button
      className={`${styles['button']} ${
        props.size ? styles['button--' + props.size] : styles['button--large']
      }`}
      type="button"
      onClick={props.handleClick}
    >
      <img className={styles.image} src={props.iconSrc} alt={props.alt}></img>
    </button>
  );
}

export default IconButton;
