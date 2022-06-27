import React, {useState} from 'react';
import styles from '../../styles/Home.module.css';
import DatePicker, {Day, DayValue, utils} from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {useAddFormMutation} from '../generated/graphql';
import InputMask from 'react-input-mask';
import {ModalAlert, useModalAlertSettings} from './ModalAlert';

const convertDate = (date: Day) => {
    return new Date(date.year, date.month - 1, date.day);
};

enum responseStatuses {
    success = 'success',
    error = 'error'
}

export const Form = () => {

    const [dayOfBirth, setDayOfBirth] = useState<DayValue>(null);
    const [nameAndFam, setNameAndFam] = useState<string>('');
    const [nameAndFamValid, setNameAndFamValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);

    const [addFormMutation] = useAddFormMutation();

    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();

    // eslint-disable-next-line complexity
    async function send() {
        const credits = (document.getElementById('credits') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        const phoneNumber = Number((document.getElementById('phoneNumber') as HTMLInputElement)?.value.replace(/[\s, (, ), +, _, -]/gi, ''));
        const message = (document.getElementById('message') as HTMLInputElement)?.value;
        if (dayOfBirth && credits && email && phoneNumber && message) {
            try {
                setDisabled(true);
                const sendFormResponse = await addFormMutation({
                    variables: {
                        credits,
                        email,
                        number: phoneNumber,
                        dateOfBirth: convertDate(dayOfBirth),
                        message
                    }
                });
                if (sendFormResponse.data?.addForm.status === responseStatuses.success) {
                    setModalIsOpen(true);
                    setAlertText(sendFormResponse.data?.addForm.status);
                    setAlertType('success');
                    setDisabled(false);
                }
                if (sendFormResponse.data?.addForm.status === responseStatuses.error) {
                    setModalIsOpen(true);
                    setAlertText(sendFormResponse.data?.addForm.status);
                    setAlertType('error');
                    setDisabled(false);
                }
            } catch (e: any) {
                setModalIsOpen(true);
                setAlertText(e.message);
                setAlertType('error');
                setDisabled(false);
            }
        } else {
            setModalIsOpen(true);
            setAlertText('Заполните все поля!');
            setAlertType('warning');
        }
    }

    async function enterName(name: string) {
        await setNameAndFam(name.toUpperCase());
        const validWhiteSpace = nameAndFam.split(' ').length === 2;
        const validLeftWord = nameAndFam.split(' ')[0] ? nameAndFam.split(' ')[0].length > 2 && nameAndFam.split(' ')[0].length < 31 : false;
        const validRightWord = nameAndFam.split(' ')[1] ? nameAndFam.split(' ')[1].length > 2 && nameAndFam.split(' ')[1].length < 31 : false;
        setNameAndFamValid(validLeftWord && validRightWord && validWhiteSpace);
    }

    async function enterEmail(email: string) {
        setEmailValid(email.includes('@'));
    }

    async function enterPhoneNumber(phoneNumber: string) {
        setPhoneNumberValid(phoneNumber.replace(/[\s, (, ), +, _, -]/gi, '').length === 11);
    }

    return (
        <div className={styles.main_frame}>
            <div className={styles.circle} />
            <div className={styles.register_form_container}>
                <h1 className={styles.form_title}>
                        Форма обратной связи
                </h1>
                <div className={styles.form_fields}>
                    <p>Введите Ваше имя и фамилию</p>
                    <div className={styles.form_field}>
                        <input className={nameAndFamValid ? `${styles.input_style}` : `${styles.input_style_invalid}`} id={'credits'}
                            onChange={() => enterName((document.getElementById('credits') as HTMLInputElement)?.value)}
                            value={nameAndFam}

                        />
                    </div>
                    <div className={styles.form_field}>
                        <p>Введите Ваш email</p>
                        <input className={emailValid ? `${styles.input_style}` : `${styles.input_style_invalid}`} id={'email'}
                            onChange={() => enterEmail((document.getElementById('email') as HTMLInputElement)?.value)}
                        />
                    </div>
                    <div className={styles.form_field}>
                        <p>Введите Ваш номер телефона</p>
                        <InputMask mask="+7 (999) 999 - 99 - 99" onChange={() => enterPhoneNumber((document.getElementById('phoneNumber') as HTMLInputElement)?.value)}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            {() => <input type={'tel'} className={phoneNumberValid ? `${styles.input_style}` : `${styles.input_style_invalid}`} id={'phoneNumber'}/>}
                        </InputMask>
                    </div>
                    <div className={styles.form_field}>
                        <p>Выберите Вашу дату рождения</p>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <DatePicker
                                value={dayOfBirth}
                                colorPrimary="#0BCDED"
                                onChange={setDayOfBirth}
                                maximumDate={utils('en').getToday()}
                                inputPlaceholder="Дата рождения"
                            />
                        </div>
                    </div>
                    <div className={styles.form_field}>
                        <p>Введите ваше сообщение</p>
                        <textarea className={styles.input_style} style={{height: '5vw'}} id={'message'} minLength={10} maxLength={300}/>
                    </div>
                </div>
                <div className={styles.form_buttons}>
                    <button className={styles.button} type="submit" onClick={() => send()} disabled={disabled}>Отправить</button>
                </div>
                <ModalAlert/>
            </div>
        </div>
    );
};

