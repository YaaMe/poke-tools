/*
* Pokemon Rank by season
*
* Examples:
*
* {id: 812, form: 0}
* {id: 80, form: 2}
*/
interface PokemonRankInfo {
    id: number;
    form: number;
}

/* Season Info
*
* Example:
"11": {
  "10111": {
    "name": "第11季",
    "start": "2020/10/01 12:00",
    "end": "2020/11/01 07:59",
    "cnt": 189200,
    "rule": 0,
    "season": 11,
    "rst": 0,
    "ts1": 1602238767,
    "ts2": 1602238780,
    "reg": "000000251"
  },
  "10112": {
    "name": "第11季",
    "start": "2020/10/01 12:00",
    "end": "2020/11/01 07:59",
    "cnt": 189197,
    "rule": 1,
    "season": 11,
    "rst": 0,
    "ts1": 1602238767,
    "ts2": 1602238780,
    "reg": "000000252"
  }
},
*/

interface Season {
    // 赛季序号
    [id: string]: SeasonInfos;
}

interface SeasonInfos {
    // 赛季id命名规则，10固定开头，后跟赛季序号，最后跟rule+1
    // 如10111为11赛季单人赛，10092为9赛季双人赛，以此类推
    [id: string]: SeasonInfo;
}

interface SeasonInfo {
    name: string; // 赛季名称
    start: string; // 开始时间
    end: string; // 结束时间
    cnt: number; // 参赛人数
    rule: number; // 0单人 1双人
    season: number; // 赛季序号
    rst: number;
    ts1: number; // 训练家排名标准时间
    ts2: number; // Pokemon排名标准时间
    reg: string;
}


/* Trainer Rank by season
*
* Example:
*
* icon: "7b0372e759b7c0f5583872593d950d322ef6d9ad.png"
* lng: "1"
* name: "R"
* rank: 1
* rating_value: "2074557"
*/
interface TrainerRankInfo {
    icon: string;           // 训练家头像
    lng: string;            // 训练家注册语言
    name: string;           // 训练家名称
    rank: number;           // 分级，1000名分一级
    rating_value: string;   // 排名分
}
