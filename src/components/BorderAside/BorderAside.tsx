import React, { PropsWithChildren } from 'react';
import styles from './BorderAside.module.scss';

interface BorderAsideProps {
   src: string;
   alt: string;
}

export const BorderAside = ({ src, alt }: PropsWithChildren<BorderAsideProps>) => {
   return <img className={styles.image} src={src} alt={alt} />;
};
