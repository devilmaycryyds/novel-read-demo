export let getNovelBySplit = txt => {
  if (!txt || typeof txt != 'string') return [];
  let reg = /\s*(第.{1,9}[章节卷集部篇回]\s{0}.*)\s*/g
  let startIndex = 0;
  let list = [];
  let titleList = [];
  do {
    var res = reg.exec(txt);
    if (res != null) {
      list.push(txt.substring(startIndex, res.index));
      titleList.push(res[1] || '');
      startIndex = res.index;
    } else {
      list.push(txt.substring(startIndex, txt.length));
    }
  } while (res != null);
  return {
    title: titleList,
    list: list
  };
}

export let getFileString = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = function () {
      resolve(this.result);
    }
    reader.onerror = function (err) {
      reject(err);
    }
    reader.readAsText(file);
  })
}