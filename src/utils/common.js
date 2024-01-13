import _ from 'lodash'
export const encodeQueryData = (data, encode = true) => {
  const ret = [];
  if (encode) {
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  } else {
    for (let d in data) ret.push(d + "=" + data[d]);
  }
  return ret.join("&");
};

export const isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const convertValueDayToName = (value) => {
  switch (value) {
    case "monday":
      return "Thứ 2";
    case "tuesday":
      return "Thứ 3";
    case "wednesday":
      return "Thứ 4";
    case "thursday":
      return "Thứ 5";
    case "friday":
      return "Thứ 6";
    case "saturday":
      return "Thứ 7";
    case "sunday":
      return "Chủ nhật";
    default:
      return "Thứ 2";
  }
};

export const splitString = (s, l, ml) => {
  let returnString = "";
  let currentIndex = 1;
  let lengthPerSplit;
  let maxLine;
  if (!l) {
    lengthPerSplit = 20;
  } else {
    lengthPerSplit = l;
  }
  if (!ml) {
    maxLine = 1;
  } else {
    maxLine = ml;
  }
  let startPos = 0;
  let endPos = lengthPerSplit;
  if (s.length <= lengthPerSplit) {
    return s;
  }
  while (currentIndex * lengthPerSplit <= s.length) {
    returnString = returnString + s.substring(startPos, endPos);
    currentIndex++;
    startPos = endPos;
    endPos = currentIndex * lengthPerSplit;
    if (currentIndex === maxLine + 1) {
      returnString += "...";
      return returnString;
    }
    if (s[startPos] !== " ") {
      returnString += "-";
    }
  }
  returnString += s.substring(startPos, endPos);
  return returnString;
};

export const categoryTree = (arr = []) => {
  const { res } = arr.reduce(
    (acc, curr) => {
      if (acc.parentMap[curr.parentId]) {
        (acc.parentMap[curr.parentId].children =
          acc.parentMap[curr.parentId].children || []).push(curr);
      } else {
        acc.res.push(curr);
      }
      acc.parentMap[curr.id] = curr;
      return acc;
    },
    { parentMap: {}, res: [] }
  );
  return res;
};

export const capitalizeFirstLetter = (string = null) => {
  let str = string.charAt(0).toUpperCase() + string.slice(1);
  return str
}
export const camelize = (str, capitalizeFirstLetter = true) => {
  str = _.camelCase(str);
  if (capitalizeFirstLetter) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}
