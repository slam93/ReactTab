import ARTICLE from '../component/article';
import NEW from '../component/new';

const INITIAL_STATE = {
  session: null,
  dataArticle: ARTICLE,
  dataNews: NEW,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        session: action.value,
      };
    case 'GET_NEW':
      return {
        ...state,
        dataNews: action.value,
      };
    case 'GET_ARTICLE':
      return {
        ...state,
        dataArticle: action.value,
      };
    case 'SET_LIKE':
      return {
        ...state,
        dataArticle: state.dataArticle.map((article) =>
          article.id === action.id ? {...article, like: action.like} : article,
        ),
      };

    default:
      return state;
  }
};

export default reducer;
