import { enableES5, produce } from 'immer';

export default (...args) => {
  enableES5();//produce 가 internet explorer 11 에서 동작 되도록 하는 설정
  return produce(...args);
};
