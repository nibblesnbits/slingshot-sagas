import React from 'react';
import { shallow } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mapStateToProps, AuthGuard } from './AuthGuard';

chai.use(sinonChai);

const exampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsInJvbGVzIjpbInVzZXIiXSwiYWRtaW4iOnRydWV9.VG3h3kPqUQHdxrhdLOnECDmgZW22dKo9Pebu6Qgt4SI";
const noRolesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

describe('<AuthGuard />', () => {

  it('should call push() if no token is found', () => {
    const props = {
      token: '',
      requireLogin: sinon.spy(),
      redirectTo: '/'
    };

    shallow(<AuthGuard {...props} />);

    expect(props.requireLogin.calledOnce).to.equal(true);
  });

  it('should not call push() if a token is found', () => {
    const props = {
      token: 'test',
      requireLogin: sinon.spy(),
      redirectTo: '/'
    };

    shallow(<AuthGuard {...props} />);

    expect(props.requireLogin.calledOnce).to.equal(false);
  });

  it('should not call push() if a valid role is found', () => {
    const props = {
      token: exampleToken,
      requireLogin: sinon.spy(),
      redirectTo: '/',
      allowedRoles: ["user"]
    };

    shallow(<AuthGuard {...props} />);

    expect(props.requireLogin.calledOnce).to.equal(false);
  });

  it('should call requireLogin() if a valid role is not found', () => {
    const props = {
      token: exampleToken,
      requireLogin: sinon.spy(),
      redirectTo: '/',
      allowedRoles: ["admin"]
    };

    shallow(<AuthGuard {...props} />);

    expect(props.requireLogin.calledOnce).to.equal(true);
  });

  it('should call requireLogin() if no roles are not found', () => {
    const props = {
      token: noRolesToken,
      requireLogin: sinon.spy(),
      redirectTo: '/',
      allowedRoles: ["admin"]
    };

    shallow(<AuthGuard {...props} />);

    expect(props.requireLogin.calledOnce).to.equal(true);
  });

  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const state = {
        auth: {
          username: 'test',
          token: 'test'
        }
      };

      const result = mapStateToProps(state);

      expect(result).to.deep.equal(state.auth);
    });
  });
});
