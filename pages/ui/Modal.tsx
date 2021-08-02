import styled from 'styled-components'
import { XCircle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { ReduxState } from '../../store';
import { SET_MODAL } from '../../store/actions/infos';
import ModalTypes from '../constants/modalTypes';
import ModalInfos from './modals/Infos';
import ModalProblem from './modals/Problem';
import ModalConverter from './modals/Converter';
import ModalParameters from './modals/Parameters';
import Captcha from './modals/Captcha';
import ModalStats from './modals/Stats';
import ModalLogin from './modals/Login';
import ModalRegister from './modals/Register';

const ModalBackdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: #FFFA;
`;
const ModalContent = styled.div`
  position: relative;
  margin: 10vh auto;
  width: 80vw;
  height: 80vh;
  max-width: 800px;
  background-color: white;
  box-sizing: border-box;
  padding: 2.5rem;
  padding-bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  line-height: 1.5rem;
  display: flex;
  flex-direction: column;
  hr {
    margin: 2rem 0;
  }
  button {
    outline: none;
    background-color: white;
    border: 1px solid #555;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: 1px 1px 2px #000;
    transition: .5s;
    &:hover {
      box-shadow: 2px 2px 3px #000;
    }
  }
`;
const ContentContainer = styled.div`
  max-height: calc(80vh - 2.5rem);
  overflow: auto;
  padding-bottom: 2.5rem;
`;
const ModalTitle = styled.div`
  margin: 0;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: 0.1s;;
  &:hover {
    transform: scale(1.1);
  }
`;

const modalComponents = {
  [ModalTypes.NONE]: { title: '', component: null },
  [ModalTypes.INFOS]: { title: 'infos:title', component: <ModalInfos/> },
  [ModalTypes.PROBLEM]: { title: 'problem:title', component: <ModalProblem/> },
  [ModalTypes.CONVERTER]: { title: 'converter:title', component: <ModalConverter/> },
  [ModalTypes.PARAMETERS]: { title: 'parameters:title', component: <ModalParameters/> },
  [ModalTypes.CAPTCHA]: { title: '', component: <Captcha/> },
  [ModalTypes.STATS]: { title: 'stats:title', component: <ModalStats/> },
  [ModalTypes.LOGIN]: { title: '', component: <ModalLogin/> },
  [ModalTypes.REGISTER]: { title: '', component: <ModalRegister/> },
}

export default function Modal() {
  const { t } = useTranslation();
  const currentModal = useSelector((state: ReduxState) => state.currentModal);
  const dispatch = useDispatch();

  if (currentModal === ModalTypes.NONE)
    return null;

  return (
    <ModalBackdrop onClick={() => dispatch({ type: SET_MODAL, payload: ModalTypes.NONE })}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div style={{ height: "2.5rem" }}>
          <ModalTitle>
            {t(modalComponents[currentModal].title)}
          </ModalTitle>
          <CloseButton onClick={() => dispatch({ type: SET_MODAL, payload: ModalTypes.NONE })}>
            <XCircle color="#000" />
          </CloseButton>
        </div>
        <ContentContainer>
          {modalComponents[currentModal].component}
        </ContentContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}