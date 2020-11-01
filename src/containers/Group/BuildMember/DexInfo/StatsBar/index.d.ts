import React from "react";

type stats = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

interface StatsBarProps {
    title: string;
    ev: number;
    iv?: number;
    // effect?: [] | [stats, stats];
    effect?: [] | [boolean, boolean];
}

declare function StatsBar(props: StatsBarProps): React.FunctionComponent<StatsBarProps, any>
export default StatsBar
