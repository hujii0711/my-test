const resultInfo = {
  amData: [
    {tide: 758, time: '02:56', type: 'A2'}, //오전 만조값
    {tide: 314, time: '09:26', type: 'A1'}, //오전 간조값
  ],
  curData: [
    {tide: 221, time: '21:57', type: 'C0'}, // 현재시간값
  ],
  fixedData: [
    {tide: 546, time: '00:00', type: 'A0'}, // 0시값
    {tide: 420, time: '23:59', type: 'P0'}, // 24시값
  ],
  pmData: [
    {tide: 665, time: '15:11', type: 'P2'}, // 오후 만조값
    {tide: 211, time: '21:21', type: 'P1'}, // 오후 간조값
  ],
  data: [
    {tide: 651, time: '01:00', type: 'D0'},
    {tide: 727, time: '02:00', type: 'D0'},
    {tide: 758, time: '03:00', type: 'D0'},
    {tide: 736, time: '04:00', type: 'D0'},
    {tide: 668, time: '05:00', type: 'D0'},
    {tide: 572, time: '06:00', type: 'D0'},
    {tide: 470, time: '07:00', type: 'D0'},
    {tide: 380, time: '08:00', type: 'D0'},
    {tide: 323, time: '09:00', type: 'D0'},
    {tide: 319, time: '10:00', type: 'D0'},
    {tide: 370, time: '11:00', type: 'D0'},
    {tide: 455, time: '12:00', type: 'D0'},
    {tide: 546, time: '13:00', type: 'D0'},
    {tide: 622, time: '14:00', type: 'D0'},
    {tide: 662, time: '15:00', type: 'D0'},
    {tide: 650, time: '16:00', type: 'D0'},
    {tide: 583, time: '17:00', type: 'D0'},
    {tide: 479, time: '18:00', type: 'D0'},
    {tide: 368, time: '19:00', type: 'D0'},
    {tide: 273, time: '20:00', type: 'D0'},
    {tide: 217, time: '21:00', type: 'D0'},
    {tide: 223, time: '22:00', type: 'D0'},
    {tide: 298, time: '23:00', type: 'D0'},
  ],
};

(function a() {
  const aaa = [
    ...resultInfo.amData,
    ...resultInfo.pmData,
    ...resultInfo.curData,
    ...resultInfo.fixedData,
    ...resultInfo.data,
  ];

  const bbb = aaa.sort((a, b) => {
    const [hoursA, minutesA] = a.time.split(':').map(Number);
    const [hoursB, minutesB] = b.time.split(':').map(Number);
    const totalMinutesA = hoursA * 60 + minutesA;
    const totalMinutesB = hoursB * 60 + minutesB;
    return totalMinutesA - totalMinutesB;
  });
  console.log('bbb====', bbb);
})();

const data = [
  {tide: 546, time: '00:00', type: 'A0'}, // 0시값
  {tide: 651, time: '01:00', type: 'D0'},
  {tide: 727, time: '02:00', type: 'D0'},
  {tide: 758, time: '02:56', type: 'A2'}, //오전 만조값
  {tide: 758, time: '03:00', type: 'D0'},
  {tide: 736, time: '04:00', type: 'D0'},
  {tide: 668, time: '05:00', type: 'D0'},
  {tide: 572, time: '06:00', type: 'D0'},
  {tide: 470, time: '07:00', type: 'D0'},
  {tide: 380, time: '08:00', type: 'D0'},
  {tide: 323, time: '09:00', type: 'D0'},
  {tide: 314, time: '09:26', type: 'A1'}, //오전 간조값
  {tide: 319, time: '10:00', type: 'D0'},
  {tide: 370, time: '11:00', type: 'D0'},
  {tide: 455, time: '12:00', type: 'D0'},
  {tide: 546, time: '13:00', type: 'D0'},
  {tide: 622, time: '14:00', type: 'D0'},
  {tide: 662, time: '15:00', type: 'D0'},
  {tide: 665, time: '15:11', type: 'P2'}, // 오후 만조값
  {tide: 650, time: '16:00', type: 'D0'},
  {tide: 583, time: '17:00', type: 'D0'},
  {tide: 479, time: '18:00', type: 'D0'},
  {tide: 368, time: '19:00', type: 'D0'},
  {tide: 273, time: '20:00', type: 'D0'},
  {tide: 217, time: '21:00', type: 'D0'},
  {tide: 211, time: '21:21', type: 'P1'}, // 오후 간조값
  {tide: 221, time: '21:57', type: 'C0'}, // 현재시간값
  {tide: 223, time: '22:00', type: 'D0'},
  {tide: 298, time: '23:00', type: 'D0'},
  {tide: 420, time: '23:59', type: 'P0'}, // 24시값
];
