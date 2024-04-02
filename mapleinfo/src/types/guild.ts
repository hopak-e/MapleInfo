export interface GuildRanking {
  ranking: Guild[];
}

export interface Guild {
  date: string;
  ranking: number;
  guild_name: string;
  world_name: string;
  guild_level: number;
  guild_master_name: string;
  guild_mark?: string;
  guild_point: number;
  guild_mark_custom?: string;
  guildId?: string;
  guild_member?: [string];
  guild_member_count?: number;
  guild_fame?: number;
  guild_skill: GuildSkill[];
  guild_noblesse_skill: GuildSkill[];
  suro_ranking?: number;
  fame_ranking?: number;
  flag_ranking?: number;
}

export interface GuilImg {
  guild_mark?: string;
  guild_mark_custom?: string;
}

export interface GuildSkill {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_effect: string;
  skill_icon: string;
}
