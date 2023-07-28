import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import UserProfile from './views/UserProfile';
import FoodPacks from './views/FoodPacks';
import RawMaterials from './views/RawMaterials';
import Request from './views/Request';
import About from './views/About';

export default function myRoute(designation, valid, res){
  
  //let res = this.state.employee.filter(it => it.username.includes(localStorage.getItem('react-preferred_name')));
  //console.info(valid);

  //checks if the array is not empty.
  if (designation.length > 0) {
 //   console.log(valid);
        if(valid){
          //console.info(valid);
              if(designation==="manager"){
                return [
                  {
                    path: "/",
                    exact: true,
                    layout: DefaultLayout,
                    component: () => <Redirect to="/dashboard-overview" />
                  },
                  {
                    path: "/dashboard-overview",
                    layout: DefaultLayout,
                    component: BlogOverview
                  },
                  {
                    path: "/request",
                    layout: DefaultLayout,
                    component: Request
                  },
                  {
                    path: "/foodpacks",
                    layout: DefaultLayout,
                    component: FoodPacks
                  }
                ];
              }else if (designation==="admin"){
                //console.info('user admin');
                return[
                  {
                    path: "/",
                    exact: true,
                    layout: DefaultLayout,
                    component: () => <Redirect to="/dashboard-overview" />
                  },
                  {
                    path: "/dashboard-overview",
                    layout: DefaultLayout,
                    component: BlogOverview
                  },
                  {
                    path: "/request",
                    layout: DefaultLayout,
                    component: Request
                  },
                  {
                    path: "/foodpacks",
                    layout: DefaultLayout,
                    component: FoodPacks
                  }/*,
                  {
                    path: "/kits",
                    layout: DefaultLayout,
                    component: Kits
                  }*/,
                  {
                    path: "/user-profile-lite",
                    layout: DefaultLayout,
                    component: UserProfileLite
                  },
                  {
                    path: "/rawmaterials",
                    layout: DefaultLayout,
                    component: RawMaterials
                  }
                ];
              }else{
                return [
                  {
                    path: "/",
                    exact: true,
                    layout: DefaultLayout,
                    component: () => <Redirect to="/dashboard-overview" />
                  },
                  {
                    path: "/dashboard-overview",
                    layout: DefaultLayout,
                    component: BlogOverview
                  },
                  {
                    path: "/request",
                    layout: DefaultLayout,
                    component: Request
                  }
                ];
              }
      }
      else{
        //console.info('user unvalidated');
        /*if(valid == 0){
          return [
            {
              path: "/",
              exact: true,
              layout: DefaultLayout,
              component: () => <Redirect to="/fillupform" />
            },
            {
              path: "/fillupform",
              layout: DefaultLayout,
              component: UserProfile
            }
          ]
        }else{*/
          return [
            {
              path: "/",
              exact: true,
              layout: DefaultLayout,
              component: () => <Redirect to="/about" />
            },
            {
              path: "/about",
              layout: DefaultLayout,
              component: About
            }
          ];
        }

       // }

  }
  
  else{
    //console.info('user dont exist');
    return [
      {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/fillupform" />
      },
      {
        path: "/fillupform",
        layout: DefaultLayout,
        component: UserProfile
      }
    ]
  }


}

