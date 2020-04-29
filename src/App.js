import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {

  componentDidMount(){

    const {setCurrentUser}=this.props;

    this.unsubscribefromAuth=auth.onAuthStateChanged(async userAuth=>{
     if(userAuth){
       const userRef=await createUserProfileDocument(userAuth);
    
       userRef.onSnapshot(snapShot=>{
        this.props.setCurrentUser({
             id:snapShot.id,
             ...snapShot.data()
           });
       });
      }else{
        setCurrentUser(userAuth);
      }
      
    });
  }

  componentWillUnmount(){
    this.unsubscribefromAuth();
  }

  unsubscribefromAuth=null;
  render(){
    return (
      <div >
       <Header />
       <Switch>
         <Route exact path='/' component={Homepage}/>
         <Route  path='/shop' component={ShopPage}/>
         <Route exact  
         path='/signIn' 
         render={()=>
         this.props.currentUser ? 
         (
         <Redirect to='/'/>
         )
        :
         (
         <SignInAndSignUp/>
         )
         }/>
       </Switch>
      </div>
    );
  }
 
}

const mapStateToProps=({user})=>({
  currentUser: user.currentUser
})
const mapDispatchToProps= dispatch=>({
  setCurrentUser:user=> dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
