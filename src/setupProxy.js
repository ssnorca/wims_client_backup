const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
        proxy("/employee",{
            target:"https://caraga-whims-staging.dswd.gov.ph:8000",
            secure:false,
            changeOrigin:true
        })
    );
};