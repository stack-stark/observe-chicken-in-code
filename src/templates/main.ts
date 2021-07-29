const CreateJSRun = require('./javaScript');

export const generateContent = (fileType: string): string => {
  switch (fileType) {
    case 'JavaScript':
     return new CreateJSRun().createCode();
    default:
      break;
  }
  return '';
}