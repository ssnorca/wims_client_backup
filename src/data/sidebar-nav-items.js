export default function(designation, valid) {
  //console.log(designation)
  if(designation!='null' || designation!=null){
    if (designation) {
      //   console.log(valid);
             if(valid>0){
               //console.info(valid);
                   if(designation==="manager"){
                    return [
                      {
                        title: "Dashboard",
                        to: "/dashboard-overview",
                        htmlBefore: '<i class="material-icons">edit</i>',
                        htmlAfter: ""
                      },
                      {
                        title: "Request",
                        htmlBefore: '<i class="material-icons">file_copy</i>',
                        to: "/request",
                      },
                      {
                        title: "Stockpiles",
                        htmlBefore: '<i class="material-icons">developer_board</i>',
                        to: "/foodpacks",
                      }
                    ];
                   }else if (designation==="admin"){
                    return [
                      {
                        title: "Dashboard",
                        to: "/dashboard-overview",
                        htmlBefore: '<i class="material-icons">edit</i>',
                        htmlAfter: ""
                      },
                      {
                        title: "Request",
                        htmlBefore: '<i class="material-icons">file_copy</i>',
                        to: "/request",
                      },    {
                        title: "Raw Materials",
                        htmlBefore: '<i class="material-icons">dashboard</i>',
                        to: "/rawmaterials",
                      },
                      {
                        title: "Stockpiles",
                        htmlBefore: '<i class="material-icons">developer_board</i>',
                        to: "/foodpacks",
                      },
                      {
                        title: "User Profile",
                        htmlBefore: '<i class="material-icons">person</i>',
                        to: "/user-profile-lite",
                      }
                    ];
                   }else{
                    return [
                      {
                        title: "Dashboard",
                        to: "/dashboard-overview",
                        htmlBefore: '<i class="material-icons">edit</i>',
                        htmlAfter: ""
                      },
                      {
                        title: "Request",
                        htmlBefore: '<i class="material-icons">file_copy</i>',
                        to: "/request",
                      }
                    ];
                   }
           }
           else{
             //console.info('user unvalidated');
  
              return [
                {
                  title: "About",
                  htmlBefore: '<i class="material-icons">info</i>',
                  to: "/about",
                }
              ];
             }
     
     
       }
       
       else{
         //console.info('user dont exist');
         return [
          {
    
            title: "Fillup Form",
            htmlBefore: '<i class="material-icons">info</i>',
            to: "/fillupform",
          },
        ]
       }
  }
  
  
  
  }
  