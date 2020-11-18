import React from "react";

type stats = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

interface StatsBarProps {
    title: string;
    base: number;
    ev?: number;
    // nativeEffect?: [] | [stats, stats];
    nativeEffect?: [] | [boolean, boolean];
}

declare function StatsBar(props: StatsBarProps): React.FunctionComponent<StatsBarProps, any>
export default StatsBar
