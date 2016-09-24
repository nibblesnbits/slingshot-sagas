import { createSelector } from 'reselect';

function sortByOrder(a,b) {
  return a.order > b.order ? 1 : (a.order < b.order ? -1 : 0);
}

const getMessages = (state) => state.app.messages;

const sortMessages = messages =>  messages.sort(sortByOrder);
// const orderMessages = messages => messages.map((m, i) => { m.order = i; return m; });
// const allButThisId = id => messages => messages.filter(m => m.id !== id);
// const justThisId = id => messages => messages.filter(m => m.id === id);

export const makeGetAndSortMessages = () => {
  return createSelector(
    [ getMessages ],
    (messages) => sortMessages(messages)
  );
};
