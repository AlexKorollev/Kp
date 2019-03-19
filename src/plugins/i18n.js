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
    fistNameRequest: 'First Name field is required',
    emailRequest: 'Email field is required',
    emailValidate: 'This field shoud be in email',
    emailExist: 'This email alredy exist',
    passwordRequest: 'Password field is required',
    passwordNotMatch: 'Passwords not match',
    minPasswordLengthIs: 'min length of password is',
    minPasswordLengthNow: 'Now it is',
    incorrectInfo: 'This email not exist or incorrect password',
    useOnlyLeterRequest: 'Use only letters',
    
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
    fistNameRequest: 'Поле для ввода имени обязательно',
    emailRequest: 'Поле для ввода имейла обязательно',
    emailValidate: 'Это поле должно быть имейлом',
    emailExist: 'Этот имейл уже существует',
    passwordRequest: 'Поле для ввода пароля обязательно',
    passwordNotMatch: 'Пароли не совпадают',
    minPasswordLengthIs: 'минимальная длина пароля',
    minPasswordLengthNow: 'Сейчас',
    incorrectInfo: 'Такого имейла не существует или неправильный пароль',
    useOnlyLeterRequest: 'Используйте только буквы',
  }
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'ru', // set fallback locale
  messages, // set locale messages
});

export default i18n;