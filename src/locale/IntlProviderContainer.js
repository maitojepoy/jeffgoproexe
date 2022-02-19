import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { getLocale } from 'state/locale/selectors';
import en from 'locale/messages/en';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  messages: en,
});

const IntlProviderContainer = connect(mapStateToProps, null)(IntlProvider);

export default IntlProviderContainer;
