import { useState, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import Link from 'src/components/uikit/link';
import { useDataStore } from 'src/storage';
import type { IColor } from 'src/types';
import questions from 'src/data/questions';
import './styles.scss';

type IRenderColor = IColor & { arrI: number; j: number };

const HistoryPage = () => {
  const historyList = useDataStore((state) => state.historyList);

  // const [currentItem, setCurrentItem] = useState<IRenderColor | null>(null);
  const [listToRender, setListToRender] = useState<IRenderColor[][]>([]);

  const timerId = useRef<number>(0);

  // const itemsPerRow = useRef<number>(0);

  // const setItemsPerRow = () => {
  //   const list = document.querySelector('.page-history__list');
  //   if (!list) return;

  //   const listWidth = list.clientWidth;
  //   const itemWidth = list.querySelector('.page-history__item')?.clientWidth || 290;
  //   itemsPerRow.current = Math.floor((listWidth - 40) / (itemWidth + 10));
  // };

  // const updateListToRender = useCallback(() => {
  //   clearTimeout(timerId.current);

  //   timerId.current = setTimeout(() => {
  //     // setItemsPerRow();

  //     setListToRender(
  //       historyList.reduce((result, item, i): IRenderColor[][] => {
  //         if (i % itemsPerRow.current === 0) {
  //           result.push([{ ...item, arrI: result.length, j: i % itemsPerRow.current }]);
  //         } else {
  //           result[result.length - 1].push({
  //             ...item,
  //             arrI: result.length - 1,
  //             j: i % itemsPerRow.current,
  //           });
  //         }

  //         return result;
  //       }, [] as IRenderColor[][]),
  //     );
  //   }, 50);
  // }, []);

  // const updateCurrentItem = (item: IRenderColor) => {
  //   setDescriptionHeight(true);
  //   if (currentItem?.colorId === item.colorId) {
  //     setTimeout(() => setCurrentItem(null), 300);
  //     return;
  //   }
  //   setTimeout(() => setCurrentItem(item), 300);
  // };

  // useEffect(() => {
  //   updateListToRender();
  //   // window.addEventListener('resize', updateListToRender);

  //   // return () => {
  //   //   window.removeEventListener('resize', updateListToRender);
  //   //   clearTimeout(timerId.current);
  //   // };
  // }, [historyList]);

  // useEffect(() => {
  //   setDescriptionHeight();
  // }, [currentItem]);

  // useEffect(() => {
  //   if (!currentItem) return;

  //   listToRender.forEach((item) => {
  //     item.forEach((emotion) => {
  //       if (emotion.colorId === currentItem.colorId) {
  //         setCurrentItem(emotion);
  //       }
  //     });
  //   });

  //   // setItemsPerRow();
  // }, [listToRender]);

  // const setDescriptionHeight = (isClose?: boolean) => {
  //   const wrapper: HTMLDivElement | null = document.querySelector('.page-history__description-wrapper');
  //   if (!wrapper) return;

  //   if (isClose) {
  //     wrapper.style.height = '0';
  //     return;
  //   }

  //   const contentHeight = wrapper.querySelector('.page-history__description')?.clientHeight;

  //   if (!contentHeight) return;
  //   wrapper.style.height = `${contentHeight}px`;
  // };

  // const onClearHistory = () => {
  //   clearHistory();
  // };

  // const renderDescription = () => {
  //   if (!currentItem) {
  //     return null;
  //   }
  //   const optionalDescription: string | undefined = currentItem.compensate || currentItem.like;
  //   console.log('optionalDescription', optionalDescription);
  //   return (
  //     // <div className="">
  //     <div
  //       className={classnames('page-history__description', {
  //         // 'page-history__description_left': itemsPerRow.current / (currentItem.j + 1) === itemsPerRow.current,
  //         // 'page-history__description_right': itemsPerRow.current / (currentItem.j + 1) === 1,
  //       })}
  //     >
  //       {currentItem.reflection.map(({ id, value }) => {
  //         const questionText: string = questions.find((item) => item.id === id)?.text || '';
  //         return (
  //           <div className="page-history__description-item" key={id}>
  //             <div className="page-history__description-title">{questionText}</div>
  //             <div className="page-history__description-text">{value}</div>
  //           </div>
  //         );
  //       })}
  //       {optionalDescription && (
  //         <div className="page-history__description-item">
  //           {/* <div className="page-history__description-title">{questionText}</div> */}
  //           <div className="page-history__description-text">{optionalDescription}</div>
  //         </div>
  //       )}
  //     </div>
  //     // </div>
  //   );
  // };

  return (
    <div className="page-history">
      <div className="page-history__title">Палитра настроений</div>
      <div className="page-history__list">
        {/* <button onClick={onClearHistory}>очистить</button> */}
        {historyList.map((item) => {
          return (
            <Link
              key={item.colorId}
              url={`/history/${item.date.replace(' ', '-')}`}
              className={classnames('page-history__item', {
                // 'page-history__item_active': currentItem?.colorId === item.colorId,
              })}
              // onClick={() => updateCurrentItem(item)}
            >
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
