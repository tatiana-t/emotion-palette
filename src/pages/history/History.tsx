import Link from 'src/components/uikit/link';
import { useDataStore } from 'src/storage';

import './styles.scss';

const HistoryPage = () => {
  const historyList = useDataStore((state) => state.historyList);

  return (
    <div className="page-history">
      <div className="page-history__title">Палитра настроений</div>
      <div className="page-history__list">
        {historyList.map((item) => {
          return (
            <Link key={item.colorId} url={`/history/${item.colorId}`} className="page-history__item">
              <>
                <div className="page-history__color" style={{ backgroundColor: item.color }} />
                <div className="page-history__content">
                  <div className="page-history__item-title">{item.targetEmotion}</div>
                  <div className="page-history__text">{item.date}</div>
                </div>
                <svg
                  className="page-history__open-button"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.85925 3.93096C6.41463 3.23227 6.62083 2.3046 7.31921 1.85967C8.01806 1.41495 8.94569 1.62088 9.3905 2.31963L13.7655 9.19463C14.0781 9.68597 14.0782 10.3146 13.7655 10.806L9.3905 17.681C8.94557 18.3793 8.0179 18.5855 7.31921 18.1409C6.62069 17.6962 6.41494 16.7684 6.85925 16.0696L10.7216 10.0003L6.85925 3.93096Z"
                    fill="#8F8E8E"
                  />
                </svg>
              </>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
