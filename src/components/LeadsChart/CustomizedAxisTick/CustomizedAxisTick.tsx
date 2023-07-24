import React from 'react';
import styles from './CustomizedAxisTick.module.scss';

interface IProps {
   x?: number;
   y?: number;
   payload?: any;
}

export function CustomizedAxisTick({ x, y, payload }: IProps) {
   return (
      <g transform={`translate(${x},${y})`}>
         <text x={-20} y={0} dy={16} className={styles.tick}>
            {payload.value}
         </text>
      </g>
   );
}
