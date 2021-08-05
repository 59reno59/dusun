import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';

import { languages, languagesDisplay } from '../../constants/languages';
import { SET_ACTIVITY, SET_GRID_ACTIVE, SET_NOTIFICATIONS, SET_ZOOM_TOWARD_CURSOR } from '../../../store/actions/parameters';
import { ReduxState } from '../../../store';

const InputRow = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: auto;
  user-select: none;
  .checkbox {
    width: 15px;
    height: 15px;
  }
`;

export default function ModalParameters() {
    const { t, i18n } = useTranslation('parameters');
    const router = useRouter();
    const dispatch = useDispatch();
    const gridActive = useSelector((state: ReduxState) => state.gridActive);
    const zoomTowardCursor = useSelector((state: ReduxState) => state.zoomTowardCursor);
    const activity = useSelector((state: ReduxState) => state.activity);
    const notifications = useSelector((state: ReduxState) => state.notifications);

    return (
        <>
            <hr/>
            <InputRow onClick={() => dispatch({type: SET_GRID_ACTIVE, payload: !gridActive})}>
                {t('grid')}
                <input type="checkbox" className="checkbox" id="gridActive" checked={gridActive} readOnly/>
            </InputRow>
            <hr/>
            <InputRow onClick={() => dispatch({type: SET_ZOOM_TOWARD_CURSOR, payload: !zoomTowardCursor})}>
                {t('zoomCursor')}
                <input type="checkbox" className="checkbox" id="zoomTowardCursor" checked={zoomTowardCursor} readOnly/>
            </InputRow>
            <hr/>
            <InputRow onClick={() => dispatch({type: SET_ACTIVITY, payload: !activity})}>
                {t('activity')}
                <input type="checkbox" className="checkbox" id="activity" checked={activity} readOnly/>
            </InputRow>
            <hr/>
            <InputRow onClick={() => dispatch({type: SET_NOTIFICATIONS, payload: !notifications})}>
                {t('notifications')}
                <input type="checkbox" className="checkbox" id="notifications" checked={notifications} readOnly/>
            </InputRow>
            <hr/>
            <InputRow>
                {t('language')}
                <select value={i18n.language} onChange={(e) => {
                    const cookies = new Cookies();
                    cookies.set('NEXT_LOCALE', e.target.value);
                    router.push(router.pathname, router.asPath, { locale: e.target.value });
                }}>
                    {languages.map((l, i) => (
                        <option key={i} value={l}>
                            {languagesDisplay[i]}
                        </option>
                    ))}
                </select>
            </InputRow>
        </>
    );
}