import { expect } from 'chai';
import { makeGetAndSortMessages } from './messagesSelectors';

function sortByOrder(a,b) {
  return a.order > b.order ? 1 : (a.order < b.order ? -1 : 0);
}

describe('messageSelectors', () => {
  describe('makeGetAndSortMessages', () => {
    it('should correctly sort messages', () => {
      const selector = makeGetAndSortMessages();

      const messages = [{
          title: 'test0',
          text: 'test0',
          className: 'test0',
          hidden: true,
          id: 'test0',
          order: 2
        }, {
          title: 'test2',
          text: 'test2',
          className: 'test2',
          hidden: true,
          id: 'test2',
          order: 1
        }
      ];

      const result = selector({
        app: {
          messages: messages
        }
      });

      expect(result).to.deep.equal(messages.sort(sortByOrder));

    });
  });
});
