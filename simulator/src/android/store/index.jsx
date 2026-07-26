import { configureStore } from "@reduxjs/toolkit";

import wallReducer from './reducers/wallpaper';
import quickpanelReducer from './reducers/quickpanel';
import globalReducer from "./reducers/global";
import homeReducer from "./reducers/home";
import widgetReducer from "./reducers/widget";

import WhatsAppReducer from './reducers/apps/whatsapp';
import YouTubeReducer from './reducers/apps/youtube';

const allReducers = {
  wallpaper: wallReducer,
  quickpanel: quickpanelReducer,
  global: globalReducer,
  home: homeReducer,
  widget: widgetReducer,
  whatsapp: WhatsAppReducer,
  youtube: YouTubeReducer
};

const store = configureStore({ reducer: allReducers });

export default store;
