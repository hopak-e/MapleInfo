export interface StarForceResult {
  count: number;
  next_cursor: string;
  starforce_history: StarForceHistory[];
}

export interface StarForceHistory {
  id: string;
  item_upgrade_result: string;
  before_starforce_count: number;
  after_starforce_count: number;
  starcatch_result: string;
  superior_item_flag: string;
  destroy_defence: string;
  chance_time: string;
  event_field_flag: string;
  upgrade_item: string;
  protect_shield: string;
  bonus_stat_upgrade: string;
  character_name: string;
  world_name: string;
  target_item: string;
  date_create: string;
  starforce_event_list: [
    {
      success_rate: string;
      cost_discount_rate: string;
      plus_value: string;
      starforce_event_range: string;
    }
  ];
}

export interface Statement {
  [key: number]: { count: number; success: number; destroyed: number };
}
