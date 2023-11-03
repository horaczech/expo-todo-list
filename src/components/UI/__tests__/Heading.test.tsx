import React from 'react';
import {render} from '@testing-library/react-native';
import Heading from '@/components/UI/Heading';

describe('Heading', () => {
  test('renders a Heading component', () => {
    render(<Heading />);
  });
});
