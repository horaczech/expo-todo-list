import React from 'react';
import {render} from '@testing-library/react-native';
import Pressable from '@/components/UI/Pressable';

describe('Pressable', () => {
  test('renders a Pressable component', () => {
    render(<Pressable />);
  });
});
