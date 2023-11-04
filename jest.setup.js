jest.mock('@shopify/restyle', () => {
  const RealModule = jest.requireActual('@shopify/restyle');
  const RN = jest.requireActual('react-native');
  RealModule.createText = () => RN.Text;
  RealModule.createBox = () => RN.View;
  RealModule.createRestyleComponent = (f, c) => c || RN.View;
  return RealModule;
});
