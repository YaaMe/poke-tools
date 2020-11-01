// declare module StatsBar {
//     import React from "react";
//
//     type stats = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
//     interface StatsBarProps {
//         title: string;
//         ev: number;
//         iv?: number;
//         effect?: [] | [stats, stats];
//     }
//
//     export const StatsBar: (props: StatsBarProps) => React.FunctionComponent<StatsBarProps>
// }

type stats = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

interface StatsBarProps {
    title: string;
    ev: number;
    iv?: number;
    // effect?: [] | [stats, stats];
    effect?: [] | [boolean, boolean];
}

declare class StatsBar extends React.Component<StatsBarProps, any> {}
export default StatsBar
