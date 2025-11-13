import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import type { ListRowProps } from 'react-virtualized';
import Link from 'src/components/uikit/link';
import { useDataStore } from 'src/storage';
import { setHistoryFromDB, setTotalCount } from 'src/storage';
import 'react-virtualized/styles.css';
import './styles.scss';

const ROW_HEIGHT = 76;
const DEFAULT_ROWS_COUNT = 20;

const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rowsCount, setRowsCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const historyList = useDataStore((state) => state.historyList);
  const count = useDataStore((state) => state.count);

  const location = useLocation();
  const [initialScroll, setInitialScroll] = useState<number | undefined>(undefined);

  const setScrollPosition = useCallback((scrollTop: number) => {
    setInitialScroll(scrollTop);

    setTimeout(() => {
      setInitialScroll(undefined);
    }, 300);
  }, []);

  useEffect(() => {
    setTotalCount();

    if (location.state?.scrollTop) {
      setScrollPosition(location.state.scrollTop);
      window.history.replaceState(null, '');
    }
  }, [location, setScrollPosition]);

  useEffect(() => {
    if (count) {
      setRowsCount(count > DEFAULT_ROWS_COUNT ? DEFAULT_ROWS_COUNT : count);
    }
  }, [count]);

  const getList = async (limit: number, offset: number) => {
    if (historyList.length === count) return;
    setIsLoading(true);
    try {
      await setHistoryFromDB({ limit, offset });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreRows = async ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
    if (count === historyList.length) return () => {};
    if (isLoading) return () => {};
    return getList(stopIndex - startIndex, startIndex);
  };

  const onScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    setInitialScroll(scrollTop);
    if (count === historyList.length) return;

    if (scrollTop === scrollHeight - clientHeight) {
      let countToLoad = DEFAULT_ROWS_COUNT;
      if (historyList.length + countToLoad > count) {
        countToLoad = count - historyList.length;
      }
      setRowsCount(historyList.length + countToLoad);
    }
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    return !!historyList[index];
  };

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const content = historyList[index];
    if (!content) return null;
    return (
      <div key={key} className="" style={style}>
        <Link url={`/history/${content.colorId}`} state={{ scrollTop: initialScroll }} className="page-history__item">
          <>
            <div className="page-history__color" style={{ backgroundColor: content.color }} />
            <div className="page-history__content">
              <div className="page-history__item-title">{content.targetEmotion}</div>
              <div className="page-history__date">{content.date}</div>
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
      </div>
    );
  };

  return (
    <div className="page-history">
      <div className="page-history__title">Палитра настроений</div>
      {count ? (
        <div className="page-history__list" ref={listRef}>
          <AutoSizer>
            {({ width, height }) => (
              <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowsCount}>
                {({ onRowsRendered, registerChild }) => (
                  <>
                    <List
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={rowRenderer}
                      width={width}
                      height={height}
                      rowHeight={ROW_HEIGHT}
                      rowCount={rowsCount}
                      onScroll={onScroll}
                      scrollTop={initialScroll}
                    />
                    {isLoading && 'loading...'}
                  </>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </div>
      ) : (
        <div className="page-history__empty">
          <div className="page-history__group">
            <div className="page-history__text">Здесь будут отображаться цвета ваших настроений</div>
            <img className="page-history__empty-pic" src="src/assets/palette.svg" alt="" />
          </div>

          <div className="page-history__text">Начните заполнять палитру, нажав на плюс</div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
