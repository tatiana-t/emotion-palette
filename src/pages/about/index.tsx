const About = () => {
  return (
    <div className="about">
      <div className="about__title">Палитра настроения</div>
      <div className="about__subtitle">помощник в определении оттенка состояния</div>
      <div className="about__section">
        <div className="about__section-title">Как пользоваться?</div>
        <p>Чтобы выявить текущий оттенок, нужно:</p>
        <ol>
          <li>Выбрать цвет, который в данный момент вам наиболее откликается</li>
          <li>Ответить на вопросы, которые помогут перевести цвет в эмоцию</li>
          <li>Выбрать одну наиболее подходящую вашему состоянию эмоцию</li>
        </ol>
        <p>
          В разделе «Палитра» отоборазится список сохраненных цветов и эмоций — таким образом становится видна вся
          цветовая палитра вашего настроения.
        </p>
        <button>Добавить оттенок</button>
      </div>
      <div className="about__section">
        <div className="about__section-title">Как это работает?</div>
        <p>
          Сохраненные оттенки записыаются в ваш браузер и могут быть очищены при очистке данных браузера. Чтобы
          сохранить добавленную палитру на ваше устройство, нажмите кнонпку
        </p>
        <button>сохранить на устройство</button>
        <p>
          – так ваша палитра будет сохранена в формате json, и вы сможете к ней вернуться в любое время независимо от
          используемого браузера.
        </p>
      </div>
      The user requests a wipe out. Many browsers have settings that let users wipe all data stored for a given website,
      including cookies, bookmarks, stored passwords, and IndexedDB data. The browser is in private browsing mode. Some
      browsers, have "private browsing" (Firefox) or "incognito" (Chrome) modes. At the end of the session, the browser
      wipes out the database. The disk or quota limit has been reached. The data is corrupt. An incompatible change is
      made to the feature.
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology#key_characteristics">
        IndexedDB key characteristics
      </a>
    </div>
  );
};

export default About;
