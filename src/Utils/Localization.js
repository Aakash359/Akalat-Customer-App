
import { I18nManager } from 'react-native';
import LocalizedStrings from 'react-native-localization';

import English from '../Assets/Languages/English.json';
import Arabic from '../Assets/Languages/Arabic.json';

export let localize = new LocalizedStrings({
    en: English,
    ar: Arabic,
});

export const getTextAlignment = () => {
    if (I18nManager.isRTL) {
        return 'right';
    } else {
        return 'left';
    }
};
