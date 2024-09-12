import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useForm} from "react-hook-form";
import {SignUpAttributes} from "../../types/types";
import {getProfileUser, loginUser} from "../../store/slices/userSlice";

export const Authorization: FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.userReducer);
    const {register, handleSubmit, formState} = useForm<SignUpAttributes>({
        mode: 'onChange',

    });
    const onSubmit = (data: SignUpAttributes) => {
        dispatch(loginUser(data));
    };
    useEffect(() => {
        state.accessToken && dispatch(getProfileUser(state.accessToken));
    }, [state.accessToken]);
    useEffect(() => {
        state.authorizationIsSuccess && alert('Авторизация прошла успешно.');
    }, [state.authorizationIsSuccess]);
    return (!state.userProfile ?
            <section className="registration">
                <div className="registration__wrapper container">
                    <h1 className="main-h1">
                        Авторизация
                    </h1>

                    <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>

                        <label>
                            <legend>Email</legend>
                            <input className="main-input"
                                   type="email"
                                   {...register('email', {
                                       required: {
                                           value: true,
                                           message: 'Поле обязательно для заполнения',
                                       }
                                   })}/>
                            {state.registrationError && state.registrationError.errors.email &&
                                <span className="registration__error">{state.registrationError.errors.email[0]}</span>}
                        </label>

                        <label>
                            <legend>Пароль</legend>
                            <input className="main-input"
                                   type="password"
                                   {...register('password', {
                                       required: {
                                           value: true,
                                           message: 'Поле обязательно для заполнения',
                                       }
                                   })}/>
                            {state.registrationError && state.registrationError.errors.password &&
                                <span
                                    className="registration__error">{state.registrationError.errors.password[0]}</span>}
                        </label>
                        <button className="main-button registration__button " type="submit">
                            Авторизоваться
                        </button>
                    </form>
                </div>
            </section> : <div>
                <div className="container">
                    <span className="notification">Вы успешно авторизовались</span>
                </div>
            </div>
    );

};