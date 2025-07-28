import { Fragment, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import useStore from 'src/store/data';
import type { IDay } from 'src/store/data';
import './styles.scss';

type IRenderDay = IDay & { arrI: number; j: number };

const HistoryPage = () => {
  const historyList = useStore((state) => state.historyList);
  const [currentItem, setCurrentItem] = useState<IRenderDay | null>(null);
  const [listToRender, setListToRender] = useState<IRenderDay[][]>([]);

  const timerId = useRef<number>(0);

  const itemsPerRow = useRef<number>(0);

  const setItemsPerRow = () => {
    const list = document.querySelector('.page-history__list');
    if (!list) return;

    const itemWidth = list.clientWidth / 3;
    itemsPerRow.current = itemWidth >= 300 ? 3 : 2;
  };
  const updateListToRender = () => {
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setItemsPerRow();

      setListToRender(
        historyList.reduce((result, item, i): IRenderDay[][] => {
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
        }, [] as IRenderDay[][]),
      );
    }, 50);
  };

  const updateCurrentItem = (item: IRenderDay) => {
    setDescriptionHeight(true);
    if (currentItem?.id === item.id) {
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
  }, []);

  useEffect(() => {
    setDescriptionHeight();
  }, [currentItem]);

  useEffect(() => {
    if (!currentItem) return;

    listToRender.forEach((item) => {
      item.forEach((emotion) => {
        if (emotion.id === currentItem.id) {
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
        {listToRender.map((arr, i) => {
          return (
            <div className="page-history__row-wrapper" key={i}>
              <div className="page-history__row">
                {arr.map((item) => {
                  return (
                    <div
                      className={classnames('page-history__item', {
                        'page-history__item_active': currentItem?.id === item.id,
                      })}
                      key={item.id}
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
