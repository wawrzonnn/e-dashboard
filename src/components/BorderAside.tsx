import React, { PropsWithChildren } from 'react';

interface BorderAsideProps {
   src: string;
   alt: string;
}

export const BorderAside = ({ src, alt }: PropsWithChildren<BorderAsideProps>) => {
   return <img src={src} alt={alt} />;
};
