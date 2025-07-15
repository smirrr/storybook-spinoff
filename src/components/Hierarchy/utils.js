const getId = (min, max) => {
  const mi = Math.ceil(min);
  const mx = Math.floor(max);
  return Math.floor(Math.random() * (mx - mi + 1)) + mi;
};

const functionalUnits = ['Marketing', 'Technology', 'Finance', 'Business'];

const getLabel = () => {
  return functionalUnits[Math.floor(Math.random() * functionalUnits.length)];
};

const generateUser = (name, parent = '_root') => {
  return {
    refId: getId(100000, 999999),
    userName: name,
    parent: parent === '_root' ? '_root' : parent.refId,
    isExpanded: false,
    isEndNode: true,
    isLoading: false,
    label: getLabel(),
    count: getId(20, 40)
  };
};

const user1 = generateUser('Founder 1');
const user2 = generateUser('Founder 2');
const user3 = generateUser('Founder 3');
const user4 = generateUser('L1 Leader 1', user1);
const user5 = generateUser('L1 Leader 2', user1);
const user6 = generateUser('L1 Leader 3', user1);
const user7 = generateUser('L2 Leader 1', user5);
const user8 = generateUser('L2 Leader 2', user5);
const user9 = generateUser('L3 Leader 1', user7);
const user10 = generateUser('L1 Leader 4', user2);
const user11 = generateUser('L1 Leader 5', user2);
const user12 = generateUser('L1 Leader 6', user2);
const user13 = generateUser('L1 Leader 7', user3);
const user14 = generateUser('L1 Leader 8', user3);

user1.isEndNode = false;
user2.isEndNode = false;
user3.isEndNode = true;
user5.isEndNode = false;
user7.isEndNode = false;

const UsersMap = {
  _root: [user1, user2, user3],
  [user1.refId]: [user4, user6, user5],
  [user2.refId]: [user10, user11, user12, user13, user14],
  [user3.refId]: [],
  [user5.refId]: [user7, user8],
  [user7.refId]: [user9]
};

export default UsersMap;
