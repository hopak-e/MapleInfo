export interface CharStatData {
  stat_name: string;
  stat_value: string;
}

export interface CharBasicData {
  character_class: string;
  character_class_level: string;
  character_guild_name: string;
  character_image: string;
  character_level: number;
  character_name: string;
  character_exp: number;
  character_exp_rate: string;
  world_name: string;
  character_popularity: number;
  union_level?: string;
  final_stat: CharStatData[];
  ranking: number;
  total_ranking: number;
  world_ranking: number;
}

export interface HyperStatPreset {
  stat_type: string;
  stat_poinet: number;
  stat_level: number;
  stat_increase: string;
}

export interface HyperStat {
  use_preset_no: string;
  hyper_stat_preset_1: HyperStatPreset[];
  hyper_stat_preset_2: HyperStatPreset[];
  hyper_stat_preset_3: HyperStatPreset[];
}
