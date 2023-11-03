import React from 'react';
import {render} from '@testing-library/react-native';
import Box from '@/components/UI/Box';

describe('Box', () => {
  test('renders a Box component', () => {
    render(<Box />);
  });
});
