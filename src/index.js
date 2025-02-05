import path from 'node:path';
import * as functions from './utils.js';
import stylish from './formatters/stylish.js';

export default function gendiff(filepath1, filepath2, formatName = stylish) {
  if (filepath1 === undefined || filepath2 === undefined) {
    return 'Error: File paths are missing.';
  }
  if (typeof formatName !== 'function') {
    throw new TypeError('formatName must be a function');
  }
  const extFile1 = path.extname(filepath1);
  const extFile2 = path.extname(filepath2);
  const pathFileOne = ((ext) => {
    if (ext === '.json') {
      return path.resolve(process.cwd(), '__fixtures__', filepath1);
    }
    if (ext === '.yaml' || ext === '.yml') {
      return path.resolve(process.cwd(), 'parsers', filepath1);
    }
    return '';
  });
  const pathFileTwo = ((extension) => {
    if (extension === '.json') {
      return path.resolve(process.cwd(), '__fixtures__', filepath2);
    }
    if (extension === '.yaml' || extension === '.yml') {
      return path.resolve(process.cwd(), 'parsers', filepath2);
    }
    return '';
  });
  const fileOneAnalysis = functions.analizeFile(pathFileOne(extFile1));
  const fileTwoAnalysis = functions.analizeFile(pathFileTwo(extFile2));
  const object = functions.diff(fileOneAnalysis, fileTwoAnalysis);
  return formatName(object);
}
