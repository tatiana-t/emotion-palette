import { Fragment } from 'react';
import uesStore from 'src/store/data';
import './styles.scss';

const HistoryPage = () => {
  const historyList = uesStore((state) => state.historyList);

  return (
    <div className="page-history">
      {historyList.map((item) => {
        return (
          <div className="page-history__item" key={item.id}>
            <div className="page-history__date">{item.date}</div>
            <div className="page-history__row">
              <span className="page-history__color" style={{ backgroundColor: item.color }} />
              <div className="">{item.emotion}</div>
            </div>
            <div className="page-history__more-button">Подробнее</div>
            <div className="page-history__more">
              {item.description.map(({ id, text, answer }) => {
                return (
                  <Fragment key={id}>
                    {!!answer ? (
                      <div className="" key={id}>
                        <div className="">{text}</div>
                        <div className="">{answer}</div>
                      </div>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryPage;
