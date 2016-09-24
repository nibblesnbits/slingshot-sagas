import { createSelector } from 'reselect';

function sortByOrder(a,b) {
  return a.order > b.order ? 1 : (a.order < b.order ? -1 : 0);
}

const getMessages = (state) => state.app.messages;

const sortMessages = messages =>  messages.sort(sortByOrder);

export const makeGetAndSortMessages = () => {
  return createSelector(
    [ getMessages ],
    (messages) => sortMessages(messages)
  );
};
