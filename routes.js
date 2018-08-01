import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Dashboard from './modules/Dashboard';
import Profile from './modules/Profile';
import Login from './modules/Login';
import Register from './modules/Register';
import Buy from './modules/Buy';
import Deliver from './modules/Deliver';
import Commit from './modules/Commit';
import CommitDelivery from './modules/CommitDelivery';
import News from './modules/News';
import NewsList from './modules/NewsList';
import Activate from './modules/Activate';
import Thankyou from './modules/Thankyou';
import Transactions from './modules/Transactions';
import ForgotPassword from './modules/ForgotPassword';
import ResetPassword from './modules/ResetPassword';
import ResetAUTHPassword from './modules/ResetAUTHPassword';
import SMSVerify from './modules/SMSVerify';
import ChangePhoto from './modules/ChangePhoto';
import Rinkeby from './modules/Rinkeby';
import NotFound from './modules/NotFound';
import RecentActivity from "./modules/RecentActivity";
import Downloads from "./modules/Downloads";

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/index.html" component={Dashboard} />
            <Route path="/profile" component={Profile}/>
            <Route path="/login" component={Login}  />
            <Route path="/register" component={Register}/>
            <Route path="/buy" component={Buy}/>
            <Route path="/deliver" component={Deliver}/>
            <Route path="/commit" component={Commit}/>
            <Route path="/commitdelivery" component={CommitDelivery}/>
            <Route path="/news/:id" component={News}/>
            <Route path="/news" component={NewsList}/>
            <Route path="/thankyou" component={Thankyou}/>
            <Route path="/forgot" component={ForgotPassword}/>
            <Route path="/activate/:token" component={Activate}/>
            <Route path="/transactions/:id" component={Transactions}/>
            <Route path="/activity" component={RecentActivity}/>
            <Route path="/resetpassword/:token" component={ResetPassword}/>
            <Route path="/resetpassword" component={ResetAUTHPassword}/>
            <Route path="/smsverify" component={SMSVerify}/>
            <Route path="/rinkeby" component={Rinkeby}/>
            <Route path="/downloads" component={Downloads}/>
            <Route path="/changephoto" component={ChangePhoto}/>
            <Route path="/downloads" component={Downloads}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;

