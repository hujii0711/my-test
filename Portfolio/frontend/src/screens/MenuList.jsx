import Login from './login/Login';
import Register from './login/Register';
import SnsLogin from './login/SnsLogin';
import MainTab from './tabs/MainTab';
import ArticleView from './tabs/articles/ArticleView';
import ArticleWrite from './tabs/articles/ArticleWrite';
import ShareScreen from './direct/ShareScreen';
import NotifyPushScreen from './direct/NotifyPushScreen';
import FilmingScreen from './direct/FilmingScreen';
import SendEmailScreen from './direct/SendEmailScreen';
import CalendarScreen from './direct/CalendarScreen';
import QRCodeScreen from './direct/QRCodeScreen';
import MapScreen from './direct/MapScreen';
import LinkScreen from './direct/LinkScreen';
import LocationScreen from './direct/LocationScreen';
import VoiceScreen from './direct/VoiceScreen';
import DialogScreen from './direct/DialogScreen';

export const MenuList = [
  {id: 'MainTab', component: MainTab},
  {id: 'ArticleView', component: ArticleView},
  {id: 'ArticleWrite', component: ArticleWrite},
  {id: 'Login', component: Login, options: {headerShown: false}},
  {id: 'Register', component: Register},
  {id: 'SnsLogin', component: SnsLogin},
  {id: 'ShareScreen', component: ShareScreen},
  {id: 'NotifyPushScreen', component: NotifyPushScreen},
  {id: 'FilmingScreen', component: FilmingScreen},
  {id: 'SendEmailScreen', component: SendEmailScreen},
  {id: 'CalendarScreen', component: CalendarScreen},
  {id: 'QRCodeScreen', component: QRCodeScreen},
  {id: 'MapScreen', component: MapScreen},
  {id: 'LinkScreen', component: LinkScreen},
  {id: 'LocationScreen', component: LocationScreen},
  {id: 'VoiceScreen', component: VoiceScreen},
  {id: 'DialogScreen', component: DialogScreen},
];
