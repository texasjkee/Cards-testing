import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, InputPassword, ChecBox } from '@common/fields';
import { useMutation, setCookie, api } from '@utils/';

import { Button } from '@common/buttons';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword
};

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value);
};

interface FormErrors {
  username: string | null;
  password: string | null;
}

interface User {
  username: string;
  password: string;
  id: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    isNotMyDevice: false
  });
  // const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
  //   'http://localhost:4000/auth',
  //   'POST'
  // );

  const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
    (values) => api.post('auth', values)
  );

  // const { data } = useQuery('http://localhost:4000/users', [formValues.username]);
  const [formErrors, setFormErrors] = useState<FormErrors>({ username: null, password: null });

  const handlerOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await authMutation(formValues);

    if (!!response && formValues.isNotMyDevice) {
      setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={handlerOnSubmit}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              value={formValues.username}
              type='text'
              label='username'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const username = e.target.value;
                setFormValues({ ...formValues, username });
                const error = validateLoginForm('username', username);
                if (error) setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username
              })}
            />
          </div>
          <div className={styles.input_container}>
            <InputPassword
              disabled={authLoading}
              value={formValues.password}
              isError={!!formErrors.password}
              label='password'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const password = e.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);
                if (error) setFormErrors({ ...formValues, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password
              })}
            />
          </div>
          <div className={styles.input_container}>
            <ChecBox
              checked={formValues.isNotMyDevice}
              label='This is not my device'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = e.target.checked;
                setFormValues({ ...formValues, isNotMyDevice: notMyComputer });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              Sign in
            </Button>
          </div>
        </form>
        <div className={styles.sing_up_container} onClick={() => navigate('/registration')}>
          Create new accaunt
        </div>
      </div>
    </div>
  );
};
