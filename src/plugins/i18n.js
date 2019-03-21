import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en': {
    homePage: 'Home',
    profilePage: 'Profile',
    login: 'Log in',
    logOut: 'Log Out',
    singUp: 'Sign Up',
    lastPosts: 'Last posts',
    noPosts: 'No posts',
    aboutUser: 'About',
    delete: 'Delete',
    submitButton: 'Submit',
    profileEdit: 'Edit profile',
    cancelButton: 'Сancel',
    firstName: 'First Name',
    lastName: 'Last Name',
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
    addPostTextarea: 'Wanna tell something?',
    addCommentTextarea: 'Wanna leave a comment?',
    autocomplite: 'Search',
    inputLogin: 'Enter ur login',
    inputEmail: 'Enter ur email',
    inputPassword: 'Enter ur password',
    inputConfirmPassword: 'Repeat ur password',
    inputFirstName: 'Enter ur first name',
    inputLastName: 'Enter ur last name',
    noChange: 'U don\'t change ur fuelds',
    moreComments: 'More comments',
    
  },
  'ru': {
    homePage: 'Главная',
    profilePage: 'Профиль',
    login: 'Войти',
    logOut: 'Выйти',
    singUp: 'Регистрация',
    lastPosts: 'Последние посты',
    noPosts: 'Нет постов',
    aboutUser: 'Информация о',
    delete: 'Удалить',
    submitButton: 'Отправить',
    profileEdit: 'Изменить профиль',
    cancelButton: 'Отмена',
    firstName: 'Имя',
    lastName: 'Фамилия',
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
    addPostTextarea: 'Хотите написать что-нибудь?',
    addCommentTextarea: 'Хотите оставить коммент?',
    autocomplite: 'Поиск',
    inputEmail: 'Введите ваш имеил',
    inputPassword: 'Введите ваш пароль',
    inputConfirmPassword: 'Повторите пароль',
    inputFirstName: 'Введите ваше имя',
    inputLastName: 'Введите вашу фамилию',
    noChange: 'Вы ничего не изменили',
    moreComments: 'Ещё комментарии',
  }
};

const i18n = new VueI18n({
  locale: 'ru', // set locale
  fallbackLocale: 'ru', // set fallback locale
  messages, // set locale messages
});

export default i18n;