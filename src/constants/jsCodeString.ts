const jsCodeString1 = `const str = data;
if (typeof str === 'string') {
  return str.toUpperCase();
} else {
  return false;
}`;
const jsCodeString2 = `const num = data;
try {
  num.toFixed(2);
} catch (err) {
  return null;
}
return num;
`;
const jsCodeString3 = `const arr = data;
if (Array.isArray(arr)) {
  return arr.join(', ');
} else {
  return undefined;
}`;
const jsCodeString4 = `const obj = data;
try {
  Object.keys(obj).length;
} catch (err) {
  return false;
}
return true;
`;
const jsCodeString5 = `const bool = data;
if (bool === true || bool === false) {
  return !bool;
} else {
  return 'Not a boolean';
}`;
const jsCodeString6 = `const date = data;
if (date instanceof Date) {
  return date.toISOString();
} else {
  return 'Not a date';
}`;
const jsCodeString7 = `const regex = data;
if (regex instanceof RegExp) {
  return regex.test('test');
} else {
  return false;
}`;
const jsCodeString8 = `const func = data;
if (typeof func === 'function') {
  return func() || 'Function returned undefined';
} else {
  return 'Not a function';
}`;
const jsCodeString9 = `const symbol = data;
if (typeof symbol === 'symbol') {
  return symbol.toString();
} else {
  return 'Not a symbol';
}`;
const jsCodeString10 = `const buffer = data;
if (buffer instanceof Buffer) {
  return buffer.length;
} else {
  return 0;
}`;

const jsCodeString11 = `const array = data;
    if (array.length === 0) {
      throw new Error("数组不能为空");
    }
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  `;

const jsCodeString12 = `const array = data.filter((item) => item.id === id);
const newArray = array.map((item) => item > 1);
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log('sum', sum)
console.log('newArray', newArray)
`;

const jsCodeString13 = `const array = data;
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)`;

const jsCodeString14 = `const res = data;
 if (res.data) {
  const article = res.data.article;
  const commentTree = res.data.article.articleComments;
  console.log('commentTree', commentTree)
}`;

const jsCodeString15 = `const str = data;
if (!str) {
  return '--'
}
if (str.length > 30) {
  return str.substring(0, 115)
}
return str`;

const jsCodeString16 = `const str = data;
try {
  str.length; 
} catch (err) {
  return false; 
}
return true;`;

export const jsCodeStrings = [
  jsCodeString1,
  jsCodeString2,
  jsCodeString3,
  jsCodeString4,
  jsCodeString5,
  jsCodeString6,
  jsCodeString7,
  jsCodeString8,
  jsCodeString9,
  jsCodeString10,
  jsCodeString11,
  jsCodeString12,
  jsCodeString13,
  jsCodeString14,
  jsCodeString15,
  jsCodeString16,
];
