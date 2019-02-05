// media helper, add needed sizes for devices into the object

const size = {
  desktop: "1024px",
  mobileL: "420px",
  tablet: "768px"
};

const device = Object.keys(size).reduce((acc, key) => {
  acc[key] = style => `
    @media screen and (max-width: ${size[key]}) {
      ${style};
    }
  `;
  return acc;
}, {});

export default device;
