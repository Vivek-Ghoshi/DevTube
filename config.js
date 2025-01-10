const passport = require('passport');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const channelModel = require('./models/channel-model');

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
},
async(accessToken , refreshToken , profile, cb)=>{
  try{
      let channel = await channelModel.findOne({email: profile.emails[0].value});
      if(!channel){
        channel = await channelModel.create({
            name: profile.displayName,
            handle: profile.displayName,
            email: profile.emails[0].value,
            logoUrl: profile.photos[0].value.split("=")[0]
        });
      }
      cb(null,channel);
  }
  catch(err){
    cb(err)
  }
}

));

passport.serializeUser((channel,done) =>{
    done(null, channel.id)
});

passport.deserializeUser(async(id ,done)=>{
    try {
        const channel = await channelModel.findById(id);
        done(null,channel)
    } catch (error) {
        done(error)
    }
});

module.exports = passport;


