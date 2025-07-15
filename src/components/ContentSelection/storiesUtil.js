const title = 'Decision making';
const description =
  'It represents how clear employees are about the company objectives & how they align with their individual goals';
const contentWithoutCheckbox = [
  {
    id: 1,
    label: 'We have autonomy to take decisions'
  },
  {
    id: 2,
    label: 'We make decisions with strong moral principles.'
  },
  {
    id: 3,
    label:
      'We have an effective decision-making process. It represents how clear employees are about the company objectives '
  }
];

const getContentWithCheckbox = c => {
  const copy = JSON.parse(JSON.stringify(c));
  const l = copy.length;
  copy.forEach((elem, i) => {
    copy[i].showCheckbox = true;
    copy[i].isChecked = i === 0;
    copy[i].isIndeterminate = false;
    copy[i].isDisabled = false;
    copy[i].ctaLabel = i === l - 1 ? 'Edit' : '';
  });
  return copy;
};

const getUpdatedContentWithCheckedItems = (content, checkedState) => {
  const updatedContent = [...content];
  updatedContent.forEach((c, i) => {
    const item = { ...c };
    item.isChecked = checkedState;
    updatedContent[i] = item;
  });
  return updatedContent;
};

export {
  title,
  description,
  contentWithoutCheckbox,
  getContentWithCheckbox,
  getUpdatedContentWithCheckedItems
};
