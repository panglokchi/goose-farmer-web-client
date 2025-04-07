import { MissionObjective } from "./mission-objective";

export interface Mission {
    id: number;
    objectives: MissionObjective[];
    name: string;
    description: string;
    expiry: string | null;
    repeat: string;
    exp_reward: number;
    egg_reward: number;
    feed_reward: number;
    summon_reward: number;
    player: number
}
