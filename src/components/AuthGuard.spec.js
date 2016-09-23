import React from 'react';
import { shallow } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { AuthGuard } from './AuthGuard';

chai.use(sinonChai);

const exampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsInJvbGVzIjpbInVzZXIiXSwiYWRtaW4iOnRydWV9.VG3h3kPqUQHdxrhdLOnECDmgZW22dKo9Pebu6Qgt4SI";

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

  it('should not call push() if a valid role is found', () => {
    const props = {
      token: exampleToken,
      push: sinon.spy(),
      redirectTo: '/',
      allowedRoles: ["user"]
    };

    shallow(<AuthGuard {...props} />);

    expect(props.push.calledOnce).to.equal(false);
  });

  it('should call push() if a valid role is not found', () => {
    const props = {
      token: exampleToken,
      push: sinon.spy(),
      redirectTo: '/',
      allowedRoles: ["admin"]
    };

    shallow(<AuthGuard {...props} />);

    expect(props.push.calledOnce).to.equal(true);
  });
});
