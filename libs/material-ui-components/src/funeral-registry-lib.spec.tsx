import { render } from '@testing-library/react';

import FuneralRegistryLib from './funeral-registry-lib';

describe('FuneralRegistryLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FuneralRegistryLib />);
    expect(baseElement).toBeTruthy();
  });
});
