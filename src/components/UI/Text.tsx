import {
  ColorProps,
  LayoutProps,
  OpacityProps,
  SpacingShorthandProps,
  TextShadowProps,
  TypographyProps,
  VariantProps,
  VisibleProps,
  color,
  createRestyleComponent,
  createVariant,
  layout,
  opacity,
  spacingShorthand,
  textShadow,
  typography,
  visible,
} from '@shopify/restyle';
import {ComponentProps, ReactNode} from 'react';
import {Text as DefaultText} from 'react-native';
import {Theme} from '@/theme/theme';

type BaseProps = ColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingShorthandProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

type Props = ComponentProps<typeof DefaultText> & {
  children?: ReactNode;
} & BaseProps &
  LayoutProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

const Text = createRestyleComponent<Props, Theme>(
  [
    color,
    opacity,
    visible,
    typography,
    spacingShorthand,
    textShadow,
    layout,
    createVariant({themeKey: 'textVariants'}),
  ],
  DefaultText,
);

export default Text;
