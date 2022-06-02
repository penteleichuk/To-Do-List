import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStoreType } from "../../../../app/s2-bll/store";
import { LoadingPage } from "../../../../components/loading/LoadingPage";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { logout } from "../s2-bll/loginThunks";
import {DesignType} from "../../../../app/s2-bll/appSlice";

export const Logout = ({ design }: { design: DesignType }) => {

	const isAuth = useSelector<AppStoreType, boolean>(state => state.auth.isAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(logout());
	}, [dispatch])

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return <LoadingPage design={design} />
}