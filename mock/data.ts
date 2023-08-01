export const area = [
  { id: 1, areaName: '北京市', areaCode: '11', parentId: null },
  { id: 2, areaName: '北京市', areaCode: '1101', parentId: 1 },
  { id: 3, areaName: '东城区', areaCode: '110101', parentId: 2 },
  { id: 4, areaName: '西城区', areaCode: '110102', parentId: 2 },
  { id: 5, areaName: '朝阳区', areaCode: '110105', parentId: 2 },
  { id: 6, areaName: '丰台区', areaCode: '110106', parentId: 2 },
  { id: 7, areaName: '石景山区', areaCode: '110107', parentId: 2 },
  { id: 8, areaName: '海淀区', areaCode: '110108', parentId: 2 },
  { id: 9, areaName: '门头沟区', areaCode: '110109', parentId: 2 },
  { id: 10, areaName: '房山区', areaCode: '110111', parentId: 2 },
  { id: 11, areaName: '通州区', areaCode: '110112', parentId: 2 },
  { id: 12, areaName: '顺义区', areaCode: '110113', parentId: 2 },
  { id: 13, areaName: '昌平区', areaCode: '110114', parentId: 2 },
  { id: 14, areaName: '大兴区', areaCode: '110115', parentId: 2 },
  { id: 15, areaName: '怀柔区', areaCode: '110116', parentId: 2 },
  {
    id: 16,
    areaName: '平谷区',
    areaCode: '110117',
    parentId: 2,
  },
  { id: 17, areaName: '密云区', areaCode: '110118', parentId: 2 },
  { id: 18, areaName: '延庆区', areaCode: '110119110119', parentId: 2 },
];

export const community = [
  {
    id: 1,
    communityName: '北京城建·天坛府丨九阙',
    communityAddress: '[ 东城 - 天坛 ] 景泰路与安乐林路交汇处 ',
    areaId: 3,
  },
  {
    id: 2,
    communityName: '玺源台',
    communityAddress: '西城 广安门外',
    areaId: 4,
  },
  {
    id: 3,
    communityName: '阳光上东',
    communityAddress: '朝阳 酒仙桥',
    areaId: 5,
  },
];

export const building = [
  {
    id: 1,
    buildingName: '一单元',
    communityId: 1,
  },
  {
    id: 2,
    buildingName: '二单元',
    communityId: 1,
  },
  {
    id: 3,
    buildingName: '三单元',
    communityId: 1,
  },
  {
    id: 4,
    buildingName: '一单元',
    communityId: 2,
  },
  {
    id: 5,
    buildingName: '二单元',
    communityId: 2,
  },
  {
    id: 6,
    buildingName: '三单元',
    communityId: 2,
  },
  {
    id: 7,
    buildingName: '一单元',
    communityId: 3,
  },
  {
    id: 8,
    buildingName: '二单元',
    communityId: 3,
  },
  {
    id: 9,
    buildingName: '三单元',
    communityId: 3,
  },
];

export const user = [
  {
    id: 1,
    userName: 'yudachao',
    password: '123456',
    avatar: 'https://robohash.org/yudachao?set=4',
    communityId: 1,
  },
  {
    id: 2,
    userName: 'lisi',
    password: '123456',
    avatar: 'https://robohash.org/lisi?set=4',
    communityId: 2,
  },
  {
    id: 3,
    userName: 'zhangsan',
    password: '123456',
    avatar: 'https://robohash.org/zhangsan?set=4',
    communityId: 3,
  },
];
