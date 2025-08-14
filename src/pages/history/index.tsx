import { Fragment, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { useDataStore, clearHistory } from 'src/storage';
import type { IColor } from 'src/types';
import './styles.scss';

type IRenderColor = IColor & { arrI: number; j: number };

const HistoryPage = () => {
  const historyList = useDataStore((state) => state.historyList);

  const [currentItem, setCurrentItem] = useState<IRenderColor | null>(null);
  const [listToRender, setListToRender] = useState<IRenderColor[][]>([]);

  const timerId = useRef<number>(0);

  const itemsPerRow = useRef<number>(0);

  const setItemsPerRow = () => {
    const list = document.querySelector('.page-history__list');
    if (!list) return;

    const listWidth = list.clientWidth;
    const itemWidth = list.querySelector('.page-history__item')?.clientWidth || 290;
    itemsPerRow.current = Math.floor((listWidth - 40) / (itemWidth + 10));
  };

  const updateListToRender = () => {
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setItemsPerRow();

      setListToRender(
        historyList.reduce((result, item, i): IRenderColor[][] => {
          if (i % itemsPerRow.current === 0) {
            result.push([{ ...item, arrI: result.length, j: i % itemsPerRow.current }]);
          } else {
            result[result.length - 1].push({
              ...item,
              arrI: result.length - 1,
              j: i % itemsPerRow.current,
            });
          }

          return result;
        }, [] as IRenderColor[][]),
      );
    }, 50);
  };

  const updateCurrentItem = (item: IRenderColor) => {
    setDescriptionHeight(true);
    if (currentItem?.colorId === item.colorId) {
      setTimeout(() => setCurrentItem(null), 300);
      return;
    }
    setTimeout(() => setCurrentItem(item), 300);
  };

  useEffect(() => {
    updateListToRender();
    window.addEventListener('resize', updateListToRender);

    return () => {
      window.removeEventListener('resize', updateListToRender);
      clearTimeout(timerId.current);
    };
  }, [historyList]);

  useEffect(() => {
    setDescriptionHeight();
  }, [currentItem]);

  useEffect(() => {
    if (!currentItem) return;

    listToRender.forEach((item) => {
      item.forEach((emotion) => {
        if (emotion.colorId === currentItem.colorId) {
          setCurrentItem(emotion);
        }
      });
    });

    setItemsPerRow();
  }, [listToRender]);

  const setDescriptionHeight = (isClose?: boolean) => {
    const wrapper: HTMLDivElement | null = document.querySelector('.page-history__description-wrapper');
    if (!wrapper) return;

    if (isClose) {
      wrapper.style.height = '0';
      return;
    }

    const contentHeight = wrapper.querySelector('.page-history__description')?.clientHeight;

    if (!contentHeight) return;
    wrapper.style.height = `${contentHeight}px`;
  };

  const onClearHistory = () => {
    clearHistory();
  };

  const renderDescription = () => {
    if (!currentItem) {
      return null;
    }
    return (
      // <div className="">
      <div
        className={classnames('page-history__description', {
          'page-history__description_left': itemsPerRow.current / (currentItem.j + 1) === itemsPerRow.current,
          'page-history__description_right': itemsPerRow.current / (currentItem.j + 1) === 1,
        })}
      >
        {currentItem.description.map(({ id, text, answer }) => {
          return (
            <Fragment key={id}>
              {!!answer ? (
                <div className="page-history__description-item" key={id}>
                  <div className="page-history__description-title">{text}</div>
                  <div className="page-history__description-text">{answer}</div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      // </div>
    );
  };

  return (
    <div className="page-history">
      <div className="page-history__list">
        <button onClick={onClearHistory}>очистить</button>
        {listToRender.map((arr, i) => {
          return (
            <div className="page-history__row-wrapper" key={i}>
              <div className="page-history__row">
                {arr.map((item) => {
                  return (
                    <div
                      key={item.colorId}
                      className={classnames('page-history__item', {
                        'page-history__item_active': currentItem?.colorId === item.colorId,
                      })}
                      onClick={() => updateCurrentItem(item)}
                    >
                      <div className="page-history__color" style={{ backgroundColor: item.color }} />
                      <div className="page-history__content">
                        <div className="page-history__title">{item.date}</div>
                        <div className="page-history__text">{item.emotion}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {currentItem?.arrI === i && (
                <div className="page-history__description-wrapper">{renderDescription()}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
