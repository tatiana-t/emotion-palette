import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Button from 'src/components/uikit/button';
import Icon from 'src/components/uikit/icon';
import api from 'src/storage/api/index';
import useDataStore from 'src/storage/store';
import questions from 'src/data/questions';
import steps from 'src/data/steps';
import './styles.scss';

const DetailPage = () => {
  const color = useDataStore((state) => state.currentColor);
  const setCurrentColor = useDataStore((state) => state.setCurrentColor);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (color) return;

    const pathArr = location.pathname.split('/');
    const colorId = pathArr[pathArr.length - 1];

    api
      .getItem(colorId)
      .then((data) => {
        if (data) {
          setCurrentColor(data);
        }
      })
      .catch((e) => {
        console.error('Error occured while getting color: ', e);
      });

    return () => {
      setCurrentColor(null);
    };
  }, [color]);

  if (!color) return null;

  const descriptionTitle: string = steps.find((item) => item.id === color.reflectionType)?.title || '';

  return (
    <div className="detail-page">
      <Button
        className="detail-page__back"
        onClick={() => {
          console.log('click');
          navigate(-1);
        }}
      >
        <Icon icon="left" />
      </Button>
      <div className="detail-page__title">{color.targetEmotion}</div>
      <div className="detail-page__subtitle">{color.date}</div>
      <div className="detail-page__description">
        {color.reflection.map(({ id, value }) => {
          const questionText: string = questions.find((item) => item.id === id)?.text || '';
          return (
            <div className="detail-page__description-item" key={id}>
              <div className="detail-page__description-title">{questionText}</div>
              <div className="detail-page__description-text">{value}</div>
            </div>
          );
        })}
        {color.reflectionType && color[color.reflectionType] !== 'yes' && (
          <div className="detail-page__description-item">
            <div className="detail-page__description-title">{descriptionTitle}</div>
            <div className="detail-page__description-text">{color[color.reflectionType]}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailPage;
