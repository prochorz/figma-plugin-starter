const importAll = (r: any) => {
  const images: any = {};
  r.keys().forEach((item: any) => {
    images[item.replace('./', '').replace(/\.(svg)$/, '')] = r(item).default;
  });
  return images;
};

// eslint-disable-next-line
export const dynamicIcons = importAll(require['context']('!@svgr/webpack!../../../assets/svg', false, /\.(svg)$/));
