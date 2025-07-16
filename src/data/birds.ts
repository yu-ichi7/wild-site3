
export type ContentBlock = {
  type: 'image' | 'text';
  value: string;
};

export type Bird = {
  id: number;
  name: string;
  englishName: string;
  scientificName: string;
  content: ContentBlock[];
};

export const birds: Bird[] = [
  {
    id: 1,
    name: 'スズメ',
    englishName: 'Eurasian Tree Sparrow',
    scientificName: 'Passer montanus',
    content: [
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '人家の近くでよく見られる、日本人にとって最も身近な野鳥の一つ。チュンチュンという鳴き声が特徴です。社会性が高く、群れで行動することが多いです。' },
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '主に植物の種子を食べますが、繁殖期には昆虫なども捕食します。都市部から農村部まで、幅広い環境に適応しています。' },
    ],
  },
  {
    id: 2,
    name: 'メジロ',
    englishName: 'Warbling white-eye',
    scientificName: 'Zosterops japonicus',
    content: [
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '目の周りの白い輪が特徴的な、鮮やかなウグイス色の小鳥。チー、チーと細く鳴きます。' },
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '花の蜜や果汁を好み、春には梅や桜の花に集まる姿がよく見られます。椿の花の蜜も大好きです。' },
    ],
  },
  {
    id: 3,
    name: 'シジュウカラ',
    englishName: 'Japanese Tit',
    scientificName: 'Parus minor',
    content: [
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '胸にある黒いネクタイのような模様が特徴。ツツピー、ツツピーという特徴的なさえずりを持っています。' },
      { type: 'image', value: '/images/placeholder.svg' },
      { type: 'text', value: '昆虫やクモ、木の実などを食べます。非常に好奇心旺盛で、賢い鳥としても知られています。冬には他のカラ類と混群を作ることもあります。' },
    ],
  },
];
