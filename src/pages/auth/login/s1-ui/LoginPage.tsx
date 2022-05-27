import * as yup from 'yup';
import { Field, Form, Formik } from "formik"
import { ChangeTheme } from "../../../../components/changeTheme/ChangeTheme"
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { authLogin } from '../s2-bll/thunks/loginThunks';
import { Notification } from './../../../../components/notification/Notification'
import { useSelector } from 'react-redux';
import './Form.css'
import { AppStoreType } from '../../../../app/s2-bll/state/store';
import { Navigate } from 'react-router-dom';

export const LoginPage = (): JSX.Element => {

	const isAuth = useSelector<AppStoreType, boolean>(state => state.auth.isAuth);

	const dispatch = useAppDispatch();

	const validationSchema = yup.object({
		email: yup.string().typeError('Invalid email').required('Required'),
		password: yup.string().min(4, "Must be longer than 2 characters").max(20).required("Required"),
		remember: yup.boolean(),
		captcha: yup.string(),
	})

	const handleSubmit = (values: any) => {
		dispatch(authLogin(values));
	}

	if (isAuth) {
		return <Navigate to={'/'} />
	}

	return <div className="wrapper">
		<header className='header'>
			<ChangeTheme />
		</header>

		<section>
			<Formik initialValues={{ email: 'free@samuraijs.com', password: 'free', remember: false, captcha: '', error: '' }} validateOnBlur onSubmit={handleSubmit} validationSchema={validationSchema}>
				{({ values, errors, touched, handleChange, handleBlur, isValid, dirty, status }) => (

					<Form className={'form'}>
						<h1 className={'formTitle'}>Auth</h1>
						<div className={'formDescription'}>
							<div>Use common test account credentials:</div>
							<div>Email: free@samuraijs.com</div>
							<div>Password: free</div>
						</div>
						<div className={'formWrapper'}>
							<label htmlFor="email" className={'formLabel'}>
								<span className={'formLabelText'}>Email: {touched.email && errors.email && <span>{errors.email}</span>}</span>
							</label>
							<Field className={'input'} type="text" name="email" placeholder={'email'} value={values.email} onBlur={handleBlur} onChange={handleChange} />
						</div>

						<div className={'formWrapper'}>
							<label htmlFor="password" className={'formLabel'}>
								<span className={'formLabelText'}>Password: {touched.password && errors.password && <span>{errors.password}</span>}</span>
							</label>
							<Field className={'input'} type="password" name="password" placeholder={'password'} value={values.password} onBlur={handleBlur} onChange={handleChange} />
						</div>

						{/* {props.captcha &&
						<div className={style.formWrapper}>
							<label htmlFor="password" className={style.formLabel}>
								<span className={style.formLabelText}>Captcha: {touched.captcha && errors.captcha && <span>{errors.captcha}</span>}</span>
							</label>
							<Field className={style.input} type="text" name="captcha" value={values.captcha} onBlur={handleBlur} onChange={handleChange} />
							<img style={{ marginTop: "10px" }} src={props.captcha} alt="" />
						</div>
					} */}

						<div className={'formWrapper'}>
							<Field type="checkbox" name="remember" onBlur={handleBlur} onChange={handleChange} />
							<span style={{ display: "inline-block" }} className={'formLabelText'}>Remember me?</span>
						</div>

						{status?.error && <div className={'formError'}>{status.error}</div>}

						<div className={'formWrapper'}>
							<button className={'formButton'} type={'submit'} disabled={!isValid && !dirty}>Sign</button>
						</div>
					</Form>
				)}
			</Formik>
		</section>

		<Notification />
	</div>
}