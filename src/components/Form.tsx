import React, {useState, useEffect} from 'react';
import styles from '../../styles/Home.module.css';
import DatePicker, {Day, DayValue, utils} from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {useAddFormMutation} from '../generated/graphql';

const convertDate = (date: Day) => {
    return new Date(date.year, date.month - 1, date.day);
};

export const Form = () => {

    const [dayOfBirth, setDayOfBirth] = useState<DayValue>(null);
    const [status, setStatus] = useState<string>('');

    const [addFormMutation] = useAddFormMutation();

    useEffect(() => {
        if (dayOfBirth) {
            console.log(convertDate(dayOfBirth));
        }
    }, [dayOfBirth]);

    async function send() {
        const credits = (document.getElementById('credits') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        const phoneNumber = Number((document.getElementById('phoneNumber') as HTMLInputElement)?.value);
        const message = (document.getElementById('message') as HTMLInputElement)?.value;
        if (dayOfBirth) {
            try {
                const sendFormResponse = await addFormMutation({
                    variables: {
                        credits,
                        email,
                        number: phoneNumber,
                        dateOfBirth: convertDate(dayOfBirth),
                        message
                    }
                });
                if (sendFormResponse.data?.addForm.status) {
                    setStatus(sendFormResponse.data?.addForm.status);
                }
            } catch (e: any) {
                console.log(e.message);
            }

        }
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
                        <input className={styles.input_style} id={'credits'}/>
                    </div>
                    <div className={styles.form_field}>
                        <p>Введите Ваш email</p>
                        <input className={styles.input_style} id={'email'}/>
                    </div>
                    <div className={styles.form_field}>
                        <p>Введите Ваш номер телефона</p>
                        <input type={'number'} className={styles.input_style} id={'phoneNumber'} style={{}}/>
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
                        <textarea className={styles.input_style} style={{height: '5vw'}} id={'message'}/>
                    </div>
                </div>
                <div className={styles.form_buttons}>
                    <button className={styles.button} type="submit" onClick={() => send()}>Отправить</button>
                </div>
                <div>{status}</div>
            </div>
        </div>
    );
};
