import React, { useEffect, useState } from 'react';
import { Text, TextStyle, Dimensions, PixelRatio, StyleSheet } from 'react-native';

const calculateFontSize = (size: number) => {
  const { width, height } = Dimensions.get('window');
  const baseWidth = 360;
  const baseHeight = 640;
  const scale = (width / baseWidth + height / baseHeight) / 2;
  return PixelRatio.roundToNearestPixel(size * scale);
};

interface DynamicTextProps {
  children: React.ReactNode;
  size: number;
  style?: TextStyle;
  numberOfLines?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontFamily?: string;
}

const CustomText = (props: DynamicTextProps) => {
  const {
    children,
    size,
    style,
    numberOfLines,
    fontWeight = 'normal',
    fontFamily = 'Geist',
  } = props;

  const [fontSize, setFontSize] = useState(calculateFontSize(size));

  useEffect(() => {
    const updateFontSize = () => setFontSize(calculateFontSize(size));
    const subscription = Dimensions.addEventListener('change', updateFontSize);
    updateFontSize();
    return () => subscription?.remove();
  }, [size]);

  return (
    <Text
      style={[
        styles.defaultText,
        { fontSize, fontWeight, fontFamily },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: '#000',
  },
});

export default CustomText;
