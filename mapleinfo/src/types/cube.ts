export interface CubeResult {
  count: number;
  next_cursor: string;
  potential_history: CubeHistory[];
}

export interface CubeHistory {
  id: string;
  character_name: string;
  date_create: string;
  potential_type: string;
  item_upgrade_result: string;
  miracle_time_flag: string;
  item_equipment_part: string;
  item_level: number;
  target_item: string;
  potential_option_grade: string;
  additional_potential_option_grade: string;
  upgrade_guarantee: boolean;
  upgrade_guarantee_count: number;
  before_potential_option: [
    {
      value: string;
      grade: string;
    }
  ];
  before_additional_potential_option: [
    {
      value: string;
      grade: string;
    }
  ];
  after_potential_option: [
    {
      value: string;
      grade: string;
    }
  ];
  after_additional_potential_option: [
    {
      value: string;
      grade: string;
    }
  ];
}

export interface CubeStatements {
  [key: string]: {
    potentialOption: { count: number; success: number };
    additionalOption: { count: number; success: number };
  };
}

export interface CubePrice {
  250: { [key: string]: number };
  200: { [key: string]: number };
  160: { [key: string]: number };
  1: { [key: string]: number };
}
