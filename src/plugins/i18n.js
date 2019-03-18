import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en': {
    homePage: 'Home',
    profilePage: 'Profile',
    login: 'Login',
    logOut: 'Log Out',
    singUp: 'Sign Up',
    lastPosts: 'Last posts',
    noPosts: 'No posts',
    aboutUser: 'About',
    delete: 'Delete',
    submitButton: 'Submit',
    profileEdit: 'Profile edit',
    cancelButton: 'Сancel',
  },
  'ru': {
    homePage: 'Главная',
    profilePage: 'Профиль',
    login: 'Логин',
    logOut: 'Выйти',
    singUp: 'Регистрация',
    lastPosts: 'Последние посты',
    noPosts: 'Нет постов',
    aboutUser: 'Информация о',
    delete: 'Удалить',
    submitButton: 'Принять',
    profileEdit: 'Изменить профиль',
    cancelButton: 'Отмена',
  }
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'ru', // set fallback locale
  messages, // set locale messages
});

export default i18n;