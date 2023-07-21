import Login from './login/Login';
import Register from './login/Register';
import SnsLogin from './login/SnsLogin';
import MainTab from './tabs/MainTab';
import ArticleView from './tabs/articles/ArticleView';
import ArticleWrite from './tabs/articles/ArticleWrite';
import ChatMain from './tabs/chat/ChatMain';
import ChatSocketMessage from './tabs/chat/ChatSocketMessage';

import ShareScreen from './direct/ShareScreen';
import NotifyPushScreen from './direct/NotifyPushScreen';
import ImageUploadGallary from './direct/ImageUploadGallary';
import ImageUploadTakePicture from './direct/ImageUploadTakePicture';
import SendEmailScreen from './direct/SendEmailScreen';
import CalendarScreen from './direct/CalendarScreen';
import QRCodeScreen from './direct/QRCodeScreen';
import MapScreen from './direct/MapScreen';
import LinkScreen from './direct/LinkScreen';
import LocationScreen from './direct/LocationScreen';
import VoiceScreen from './direct/VoiceScreen';
import DialogScreen from './direct/DialogScreen';
import MenuButton from '../commons/component/MenuButton';

export const MenuList = [
  // menuList 첫번째 객체가 RootNavigator의 첫번째 렌더링 메뉴가 됨
  {id: 'MainTab', component: MainTab},
  {id: 'ArticleView', component: ArticleView},
  {id: 'ArticleWrite', component: ArticleWrite},
  {id: 'Login', component: Login, options: {headerShown: false}},
  {id: 'Register', component: Register},
  {id: 'SnsLogin', component: SnsLogin},
  {id: 'ChatMain', component: ChatMain},
  {id: 'ChatSocketMessage', component: ChatSocketMessage},
  {id: 'ImageUploadGallary', component: ImageUploadGallary},
  {id: 'ShareScreen', component: ShareScreen},
  {id: 'ImageUploadTakePicture', component: ImageUploadTakePicture},
  {id: 'NotifyPushScreen', component: NotifyPushScreen},
  {id: 'SendEmailScreen', component: SendEmailScreen},
  {id: 'CalendarScreen', component: CalendarScreen},
  {id: 'QRCodeScreen', component: QRCodeScreen},
  {id: 'MapScreen', component: MapScreen},
  {id: 'LinkScreen', component: LinkScreen},
  {id: 'LocationScreen', component: LocationScreen},
  {id: 'VoiceScreen', component: VoiceScreen},
  {id: 'DialogScreen', component: DialogScreen},
  {id: 'MenuButton', component: MenuButton},
];
