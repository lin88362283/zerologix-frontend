import React from 'react';

import styles from './BasicLayout.module.scss';
import { Outlet } from 'react-router-dom';
import BasicHeader from '../components/BasicHeader';

const BasicLayout = () => {

	return (
		<div className={styles.container}>
			<BasicHeader />
			<Outlet />
		</div>
	)
}

export default BasicLayout;