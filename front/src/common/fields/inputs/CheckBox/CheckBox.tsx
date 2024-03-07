import { FC } from 'react';

import styles from './Checkbox.module.css';

export const ChecBox: FC<InputProps> = ({ label, ...props }) => {
	return (
		<label className={styles.checkbox_container}>
			<input className={styles.checkbox} type="checkbox" checked={props.checked} {...props} />
			<span className={styles.custom_checkbox} />
			<span className={styles.label}>{label}</span>
		</label>
	);
};
