if(process.env.NODE_ENV == 'production'){
  module.exports = {
    mongoURI: 'mongodb://<skotra>:<Sree420@>@ds115360.mlab.com:15360/vidjot-prod'
  }
  }else{
    module.exports = {
      mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds131983.mlab.com:31983/storybook-dev'
    } 
  }
  