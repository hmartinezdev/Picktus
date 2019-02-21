import reducer from './user-reducer'
import { TypeKeys } from './user-actions'
​
describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        { authenticated: false }
    );
  });

  it('should return the initial state set in the parameters', () => {
    expect(reducer({}, {})).toEqual(
        {}
    );
  });

  describe(`it should handle ${TypeKeys.USER_LOGIN_SUCCESS}`, () => {
   it('with a valid user', () => {
      const firebaseUser = { 
      email:'ok',
      emailVerified: true,
      displayName: 'hugo',
      photoURL: 'url',
      uid: 'id'
    };

    const user = { 
      email:'ok',
      emailVerified: true,
      name: 'hugo',
      photoUrl: 'url',
      uid: 'id'
    };

    expect(reducer(undefined, {type:TypeKeys.USER_LOGIN_SUCCESS, user:firebaseUser})).toEqual({authenticated: true, user});
   });

   it('with an empty user', () => {
    const firebaseUser = { 
   
    };

    const user = { 
      email:'',
      emailVerified: false,
      name: '',
      photoUrl: '',
      uid: undefined,
    };

    expect(reducer(undefined, {type:TypeKeys.USER_LOGIN_SUCCESS, user:firebaseUser})).toEqual({authenticated: true, user});
   });
  });

  describe(`it should handle ${TypeKeys.USER_SERVER_AUTH}`, () => {
    it('with a valid user', () => {
      const firebaseUser = { 
        email:'ok',
        emailVerified: true,
        displayName: 'hugo',
        photoURL: 'url',
        uid: 'id'
      };
  
      const user = { 
        email:'ok',
        emailVerified: true,
        name: 'hugo',
        photoUrl: 'url',
        uid: 'id'
      };
  
      expect(reducer(undefined, {type:TypeKeys.USER_SERVER_AUTH, user:firebaseUser})).toEqual({authenticated: true, user});
    });

    it('with an empty user', () => {
      const firebaseUser = { 
      };
  
      const user = { 
        email:'',
        emailVerified: false,
        name: '',
        photoUrl: '',
        uid: undefined,
      };
  
      expect(reducer(undefined, {type:TypeKeys.USER_SERVER_AUTH, user:firebaseUser})).toEqual({authenticated: true, user});
    });

    it('with nothing', () => {
      expect(reducer(undefined, {type:TypeKeys.USER_SERVER_AUTH})).toEqual({authenticated: false});
    });
  });

  it(`it should handle ${TypeKeys.USER_LOGIN_FAILURE}`, () => {
    expect(reducer(undefined, {type:TypeKeys.USER_LOGIN_FAILURE})).toEqual({authenticated: false});
  });

  it(`it should handle ${TypeKeys.USER_CREATION_START}`, () => {
    expect(reducer(undefined, {type:TypeKeys.USER_CREATION_START})).toEqual({authenticated: false, userCreation: { inProgress: true } });
  });

  it(`it should handle ${TypeKeys.USER_CREATION_SUCCESS}`, () => {
    expect(reducer(undefined, {type:TypeKeys.USER_CREATION_SUCCESS})).toEqual({authenticated: false,  userCreation: { inProgress: false }});
  });

  it(`it should handle ${TypeKeys.USER_CREATION_FAILURE}`, () => {
    expect(reducer(undefined, {type:TypeKeys.USER_CREATION_FAILURE, error: new Error()})).toEqual({authenticated: false,  userCreation: { inProgress: false, error: 'Error' }});
  });

  it(`it should handle ${TypeKeys.USER_LOGOUT}`, () => {
    expect(reducer(undefined, {type:TypeKeys.USER_LOGOUT})).toEqual({authenticated: false});
  });
})