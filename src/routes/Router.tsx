import { FC, Suspense } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { TCurrency } from 'types';
import { BUY_SELL_URL } from '@/constants';
import { Loader } from '@deriv-com/ui';
import { routes } from './routes-config';

type TState = { [key: string]: string[] | TCurrency | string; from: string };

declare module 'react-router-dom' {
    export function useHistory(): {
        goBack: () => void;
        push: (path: string, state?: TState) => void;
        replace(arg0: { pathname: string; search: string }): void;
    };

    export function useRouteMatch(path: string): boolean;
}

type TRoutesWithSubRoutes = {
    component: FC<RouteComponentProps>;
    path: string;
    routes?: TRoutesWithSubRoutes[];
};

const RouteWithSubRoutes = (route: TRoutesWithSubRoutes) => {
    return (
        <Switch>
            {route.routes?.map(subRoute => (
                <Route key={subRoute.path} path={subRoute.path} render={props => <subRoute.component {...props} />} />
            ))}
            <Route path={route.path} render={props => <route.component {...props} />} />
        </Switch>
    );
};

const Router: FC = () => {
    return (
        <Suspense fallback={<Loader isFullScreen />}>
            <Switch>
                {routes.map(route => (
                    <RouteWithSubRoutes key={route.path} {...route} />
                ))}
                {/* TODO: Add 404 page here once ready */}
                <Redirect exact from='/*' to={BUY_SELL_URL} />
                <Redirect exact from='/' to={BUY_SELL_URL} />
            </Switch>
        </Suspense>
    );
};

export default Router;
