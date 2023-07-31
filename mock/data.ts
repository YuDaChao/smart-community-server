export const area = [
  { id: 1, area_name: '北京市', area_code: 11, parent_id: null },
  { id: 2, area_name: '北京市', area_code: 1101, parent_id: 2 },
  { id: 3, area_name: '东城区', area_code: 110101, parent_id: 2 },
  { id: 4, area_name: '西城区', area_code: 110102, parent_id: 2 },
  { id: 5, area_name: '朝阳区', area_code: 110105, parent_id: 2 },
  { id: 6, area_name: '丰台区', area_code: 110106, parent_id: 2 },
  { id: 7, area_name: '石景山区', area_code: 110107, parent_id: 2 },
  { id: 8, area_name: '海淀区', area_code: 110108, parent_id: 2 },
  { id: 9, area_name: '门头沟区', area_code: 110109, parent_id: 2 },
  { id: 10, area_name: '房山区', area_code: 110111, parent_id: 2 },
  { id: 11, area_name: '通州区', area_code: 110112, parent_id: 2 },
  { id: 12, area_name: '顺义区', area_code: 110113, parent_id: 2 },
  { id: 13, area_name: '昌平区', area_code: 110114, parent_id: 2 },
  { id: 14, area_name: '大兴区', area_code: 110115, parent_id: 2 },
  { id: 15, area_name: '怀柔区', area_code: 110116, parent_id: 2 },
  {
    id: 16,
    area_name: '平谷区',
    area_code: 110117,
    parent_id: 2,
  },
  { id: 17, area_name: '密云区', area_code: 110118, parent_id: 2 },
  { id: 18, area_name: '延庆区', area_code: 110119, parent_id: 2 },
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
