const animalData = [
  {
    id: 0,
    name: 'King Charles Spaniel',
    email: 'Lauretta_Nicolas76@hotmail.com',
    color: 'lime',
    location: 'Vermont'
  },
  {
    id: 1,
    name: 'Greater Swiss Mountain Dog',
    email: 'Evans_Anderson64@hotmail.com',
    color: 'azure',
    location: 'Massachusetts'
  },
  {
    id: 2,
    name: 'Greyhound',
    email: 'Vernice.OConner@hotmail.com',
    color: 'ivory',
    location: 'Georgia'
  },
  {
    id: 3,
    name: 'Wirehaired Vizsla',
    email: 'Vincenza_Larkin49@hotmail.com',
    color: 'green',
    location: 'South Dakota'
  },
  {
    id: 4,
    name: 'Swedish White Elkhound',
    email: 'Stuart_Brekke90@hotmail.com',
    color: 'azure',
    location: 'Colorado'
  },
  {
    id: 5,
    name: 'Pungsan Dog',
    email: 'Shad73@gmail.com',
    color: 'plum',
    location: 'Minnesota'
  },
  {
    id: 6,
    name: 'Sporting Lucas Terrier',
    email: 'Boris.Reinger@yahoo.com',
    color: 'olive',
    location: 'Indiana'
  },
  {
    id: 7,
    name: 'King Charles Spaniel',
    email: 'Roslyn.Koelpin14@hotmail.com',
    color: 'black',
    location: 'Minnesota'
  },
  {
    id: 8,
    name: 'Stephens Stock',
    email: 'Ian.Wiegand@gmail.com',
    color: 'magenta',
    location: 'Maine'
  },
  {
    id: 9,
    name: 'Old Danish Pointer',
    email: 'Travon_Lebsack@yahoo.com',
    color: 'green',
    location: 'Oregon'
  }
];

const selectedItemsFormattedString = selectedItems => {
  if (selectedItems.length > 0) {
    let visibleItems = '';
    let currentItemIndex = 0;
    while (
      visibleItems.length < 25 &&
      currentItemIndex < selectedItems.length
    ) {
      if (
        visibleItems.length + selectedItems[currentItemIndex].name.length <
        25
      ) {
        visibleItems += `${visibleItems.length > 0 ? ',' : ''}${
          selectedItems[currentItemIndex].name
        }`;
        currentItemIndex += 1;
      } else {
        break;
      }
    }
    if (currentItemIndex === 0) {
      visibleItems = `${selectedItems[0].name.slice(0, 12)}...`;
      currentItemIndex += 1;
    }
    return `${visibleItems}${
      selectedItems.length > currentItemIndex
        ? ` + ${selectedItems.length - currentItemIndex}`
        : ''
    }`;
  }
  return '';
};

export { selectedItemsFormattedString, animalData };
