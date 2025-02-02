import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './card';

describe('Component: Card', () => {
  it('should be rendered correctly', () => {
    render(
      <Card
        id={1}
        name='Matrix'
        previewVideoLink='https://some-link'
        previewImage='img/the-grand-budapest-hotel.jpg'
      />
    );
  });
});
