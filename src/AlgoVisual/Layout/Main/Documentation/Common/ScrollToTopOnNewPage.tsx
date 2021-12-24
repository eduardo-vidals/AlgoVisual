import { useEffect } from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

function ScrollToTopOnNewPage(props: Props) {
    const {history} = props;
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return null;
}

export default withRouter(ScrollToTopOnNewPage);
