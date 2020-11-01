import {stats} from "containers/Group/BuildMember/DexInfo/StatsBar/index";

declare namespace StatsBar {
    export interface StatsBarProps {
        title: string;
        ev: number;
        iv?: number;
        effect?: [stats?, stats?];
    }

    export type stats = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

    export function getStatsBarStyle(ev: number)
    export function StatsBar ({title, ev, iv, effect = []}: StatsBar)
}
