import chroma from 'chroma-js';
// export default [
//   ['#C52281', '#EB59AE', '#F081C2', '#F7BCDF', '#FFE8F5'],
//   ['#C21E1E', '#E23B3B', '#FF6E6E', '#FFB9B9', '#FFE6E6'],
//   ['#CD811D', '#F1A542', '#FCBF71', '#FFD7A3', '#FFEBD2'],
//   ['#C7BE20', '#F5EC41', '#F8F167', '#FCF89E', '#FCFAD2'],
//   ['#3C6412', '#559116', '#8FDB3F', '#BAEE82', '#E3F7CD'],
//   ['#109579', '#2DD2AE', '#4BEAC8', '#A2F6E4', '#D1FCF3'],
//   ['#0E93A2', '#1DD1E5', '#7FE6F1', '#A4EEF6', '#D3F9FD'],
//   ['#18679F', '#2D92DB', '#58B2F3', '#93D1FD', '#CDEAFF'],
//   ['#7833A9', '#964BCB', '#BD72F3', '#DBA7FF', '#F1DEFF'],
// ];

const colors = ['#FF6E6E', '#FCBF71', '#F8F167', '#8FDB3F', '#4BEAC8', '#58B2F3', '#BD72F3', '#F081C2'];

const palette = colors.map((color) => {
  return chroma.scale(['#000000', color, '#ffffff']).mode('lch').colors(15).splice(1, 13);
});

export default palette;
// colorsTest.push(chroma.scale(['#000000', '#FF6E6E', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#FCBF71', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#F8F167', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#8FDB3F', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#4BEAC8', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#58B2F3', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#BD72F3', '#ffffff']).mode('lch').colors(15).splice(1, 13));
//     colorsTest.push(chroma.scale(['#000000', '#F081C2', '#ffffff']).mode('lch').colors(15).splice(1, 13));
