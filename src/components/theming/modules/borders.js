// Because we need to add keys explicitly , and also to ensure readability of the aliasing, we will disable array-destructuring preference
/* eslint-disable prefer-destructuring */
const borders = {
  size2: "2px",
  size4: "4px",
};

// TODO: refactor to make better sense as a scale
const radii = ["50%", "2px", "4px", "4px", "8px"];
radii.rounded = radii[0];
radii.full = radii[0];
radii.small = radii[1];
radii.medium = radii[2];
radii.large = radii[3];
radii.xlarge = radii[4];

export { radii, borders };
