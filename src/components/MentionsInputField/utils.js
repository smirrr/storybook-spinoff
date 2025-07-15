import { EMOJIS_PALETTE_OPTIONS } from '../EmojiPalette';

export const filterListByEitherOfTwoParams = (
  dataList,
  key1,
  key2,
  filterKeyword = ''
) => {
  return dataList.filter(
    item =>
      (item[key1] &&
        item[key1].toLowerCase().includes(filterKeyword.toLowerCase())) ||
      (item[key2] &&
        item[key2].toLowerCase().includes(filterKeyword.toLowerCase()))
  );
};

export const getUserIdsFromMentionString = value => {
  const userIdsArray = [];
  // eslint-disable-next-line no-useless-escape
  if (value.match(/(\/\/\~\[)/g)) {
    let lastIndexOfMention = 0;
    let startIndexOfName = '';
    let endIndexOfName = '';
    let startIndexOfId = '';
    let endIndexOfId = '';

    // eslint-disable-next-line no-useless-escape
    const count = value.match(/(\/\/\~\[)/g).length;
    if (count > 0) {
      for (let i = 0; i < count; i += 1) {
        startIndexOfName = value.indexOf('//~[', lastIndexOfMention) + 4;
        endIndexOfName = value.indexOf('](', startIndexOfName);

        startIndexOfId = value.indexOf('](', endIndexOfName) + 2;
        endIndexOfId = value.indexOf(')~//', startIndexOfId);

        userIdsArray.push(value.slice(startIndexOfId, endIndexOfId));
        lastIndexOfMention = endIndexOfId;
      }
    }
  }
  return userIdsArray;
};

export const removeEmojisFromAString = originalText => {
  let text = originalText;
  if (!text) return text;
  Object.keys(EMOJIS_PALETTE_OPTIONS.emojis_data).forEach(emoji => {
    if (text) text = text.replace(new RegExp(emoji, 'g'), '');
  });
  if (text) text = text.trim();
  return text;
};

export const adjustInputHeight = (elementID, resetHeight, defaultHeight) => {
  const elem = document.getElementById(elementID);
  if (elem) {
    if (resetHeight) {
      elem.setAttribute('style', `height: ${defaultHeight || '50px'}`);
      return;
    }
    elem.setAttribute('style', `height: ${defaultHeight || '50px'}`);
    elem.setAttribute('style', `height: ${elem.scrollHeight}px`);
  }
};
