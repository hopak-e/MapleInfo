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

export interface UnionRanking {
  ranking: [
    {
      date: string;
      ranking: number;
      character_name: string;
      world_name: string;
      class_name: string;
      sub_class_name: string;
      union_level: number;
      union_power: number;
    }
  ];
}

export interface HyperStatPreset {
  stat_type: string;
  stat_point: number;
  stat_level: number;
  stat_increase: string;
}

export interface HyperStat {
  use_preset_no: string;
  hyper_stat_preset_1: HyperStatPreset[];
  hyper_stat_preset_2: HyperStatPreset[];
  hyper_stat_preset_3: HyperStatPreset[];
}

export interface AbilityPreset {
  ability_info: [
    { ability_no: string; ability_grade: string; ability_value: string }
  ];
}

export interface Ability {
  preset_no: number;
  ability_preset_1: AbilityPreset;
  ability_preset_2: AbilityPreset;
  ability_preset_3: AbilityPreset;
}

export interface EquipmentPreset {
  item_equipment_part?: string;
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  item_description: string;
  item_shape_name?: string;
  item_shape_icon?: string;
  gender?: string;
  item_total_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
    armor?: string;
    speed?: string;
    jump?: string;
    boss_damage?: string;
    ignore_monster_armor?: string;
    all_stat?: string;
    damage?: string;
    equipment_level_decrease?: number;
    max_hp_rate?: string;
    max_mp_rate?: string;
  };
  item_base_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
    armor?: string;
    speed?: string;
    jump?: string;
    boss_damage?: string;
    ignore_monster_armor?: string;
    all_stat?: string;
    max_hp_rate?: string;
    max_mp_rate?: string;
    base_equipment_level?: number;
  };
  potential_option_grade?: string;
  additional_potential_option_grade?: string;
  potential_option_1?: string;
  potential_option_2?: string;
  potential_option_3?: string;
  additional_potential_option_1?: string;
  additional_potential_option_2?: string;
  additional_potential_option_3?: string;
  equipment_level_increase?: number;
  item_exceptional_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
  };
  item_add_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
    armor?: string;
    speed?: string;
    jump?: string;
    boss_damage?: string;
    damage?: string;
    all_stat?: string;
    equipment_level_decrease?: number;
  };
  growth_exp?: number;
  growth_level?: number;
  scroll_upgrade?: string;
  cuttable_count?: string;
  golden_hammer_flag?: string;
  scroll_resilience_count?: string;
  scroll_upgradeable_count?: string;
  soul_name?: string;
  soul_option?: string;
  item_etc_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
    armor?: string;
    speed?: string;
    jump?: string;
  };
  starforce?: string;
  starforce_scroll_flag?: string;
  item_starforce_option?: {
    str?: string;
    dex?: string;
    int?: string;
    luk?: string;
    max_hp?: string;
    max_mp?: string;
    attack_power?: string;
    magic_power?: string;
    armor?: string;
    speed?: string;
    jump?: string;
  };
  special_ring_level?: number;
  date_option_expire?: string;
}

export interface Title {
  title_name: string;
  title_icon: string;
  title_description: string;
  date_option_expire: string;
  item_equipment_slot: string;
}
export interface Equipment {
  preset_no: number;
  item_equipment_preset_1: EquipmentPreset[];
  item_equipment_preset_2: EquipmentPreset[];
  item_equipment_preset_3: EquipmentPreset[];
  title: Title;
}

export interface Android {
  date: string;
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_hair: {
    hair_name: string;
    base_color: string;
    mix_color: string;
    mix_rate: string;
  };
  android_face: {
    face_name: string;
    base_color: string;
    mix_color: string;
    mix_rate: string;
  };
  android_skin_name: string;
  android_cash_item_equipment: [
    {
      cash_item_equipment_part: string;
      cash_item_equipment_slot: string;
      cash_item_name: string;
      cash_item_icon: string;
      cash_item_description: string;
      cash_item_option: [
        {
          option_type: string;
          option_value: string;
        },
        {
          option_type: string;
          option_value: string;
        }
      ];
      date_expire: string;
      date_option_expire: string;
      cash_item_label: string;
      cash_item_coloring_prism: {
        color_range: string;
        hue: number;
        saturation: number;
        value: number;
      };
      android_item_gender: string;
    },
    {
      cash_item_equipment_part: string;
      cash_item_equipment_slot: string;
      cash_item_name: string;
      cash_item_icon: string;
      cash_item_description: string;
      cash_item_option: [
        {
          option_type: string;
          option_value: string;
        },
        {
          option_type: string;
          option_value: string;
        }
      ];
      date_expire: string;
      date_option_expire: string;
      cash_item_label: string;
      cash_item_coloring_prism: {
        color_range: string;
        hue: number;
        saturation: number;
        value: number;
      };
      android_item_gender: string;
    }
  ];
  android_ear_sensor_clip_flag: string;
  android_gender: string;
  android_grade: string;
  android_non_humanoid_flag: string;
  android_shop_usable_flag: string;
  preset_no: string;
  android_preset_1: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin_name: string;
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
  android_preset_2: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin_name: string;
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
  android_preset_3: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin_name: string;
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
}

export interface ItemOption {
  str?: string;
  dex?: string;
  int?: string;
  luk?: string;
  max_hp?: string;
  max_mp?: string;
  attack_power?: string;
  magic_power?: string;
  armor?: string;
  speed?: string;
  jump?: string;
  equipment_level_decrease?: number;
  boss_damage?: string;
  ignore_monster_armor?: string;
  all_stat?: string;
  damage?: string;
}

export interface Matrix {
  date: string;
  character_class: string;
  character_skill_grade: string;
  character_skill: Skill[];
}

export interface Skill {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
}
