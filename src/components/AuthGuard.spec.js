import React from 'react';
import { shallow } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { AuthGuard } from './AuthGuard';
chai.use(sinonChai);

describe('<AuthGuard />', () => {

  it('should call push() if no token is found', () => {
    const props = {
      token: '',
      push: sinon.spy(),
      redirectTo: '/'
    };

    shallow(<AuthGuard {...props} />);

    expect(props.push.calledOnce).to.equal(true);
  });

  it('should not call push() if a token is found', () => {
    const props = {
      token: 'test',
      push: sinon.spy(),
      redirectTo: '/'
    };

    shallow(<AuthGuard {...props} />);

    expect(props.push.calledOnce).to.equal(false);
  });
});
