import db from '../../firebase/config';
import { Alert } from 'react-native';
import { authSlice } from './authReducer';

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSingUpUser = ({ login, email, password }) => async (dispatch, getState) => {
    try {
        await db.auth().createUserWithEmailAndPassword(email, password);

        const user = await db.auth().currentUser;

        await user.updateProfile({
            displayName: login,
        })

        const { uid, displayName } = await db.auth().currentUser;

        dispatch(updateUserProfile({ userId: uid, login: displayName, email }));
        console.log('user', user);
    } catch (error) {
        Alert.alert('error', error);
        Alert.alert('error.message', error.message);
    }
};

export const authSingInUser = ({ email, password }) => async (dispatch, getState) => {
    try {
        const user = await db.auth().signInWithEmailAndPassword(email, password);
        console.log('user', user);
            } catch (error) {
                Alert.alert('error', error);
                Alert.alert('error.message', error.message);
            }
};

export const authSingOutUser = () => async (dispatch, getState) => {
    await db.auth().signOut();
    dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
    await db.auth().onAuthStateChanged((user) => {
        if (user) {
            const userUpdateProfile = {
                login: user.displayName,
                userId: user.uid,
                email: user.email,
            };
            dispatch(updateUserProfile(userUpdateProfile));
            dispatch(authStateChange({ stateChange: true }));
        };
    });
};