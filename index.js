'use strict';
const unirest = require('unirest');
const fs = require('fs');
const functions = require('./functions');
const Discord = require('discord.js');
const admin = require('firebase-admin');

const client = new Discord.Client();

const discordBotToken= process.env.discordBotToken;

var mURL="";

client.login(discordBotToken);


var serviceAccount = {
    "type": "service_account",
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.client_x509_cert_url
};

var userPermissionApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = userPermissionApp.firestore();


async function getCollection() {
    console.log('getCollection');
    db.collection('cricBot').onSnapshot(function(snapshot){
      snapshot.forEach(doc => {
          if (doc.id == 'CricbuzzURL') {
              console.log(doc.id, "=>", doc.data());
							mURL = doc.data()['url']
          }
      });
    });
}

async function updateDataToFirebase() {
    try {
        console.log("updateDataToFirebase");
        var obj = {}
        obj["url"] = mURL;
        await db.collection('cricBot').doc('CricbuzzURL').set(obj)
        console.log("updateDataToFirebase done");
    } catch (err) {
        console.error(err);
    }
}

client.on('ready',()=>{
	console.log('This bot is online');
	getCollection();
})


// This should work both there and elsewhere.
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}


client.on('message', async message =>{
  if(message.author.bot){return;}
  console.log(message.content);
  var liveScore={};
  const PREFIX = '';
  let args = message.content.substring(PREFIX.length).split(" ");
  args[0] = args[0].toLowerCase();

  if(args[0] == 'c.set' || args[0] == 'c.s'){
    try{
      liveScore = await getLiveUpdate(args[1]);
      if(liveScore['title'] == undefined){
        return  message.channel.send("Please check `url`. Please provide valid `cricbuzz live match score url`").then(msg => {
                               msg.delete({ timeout: 10000 })
                            })
                            .catch(e=> console.log(e));
      }else {
        mURL = args[1];
				updateDataToFirebase()
        return  message.channel.send("Done. Will update you for - \n`"+ liveScore['title']+"`");
      }
    }catch(e){
      return  message.channel.send("Please check `url`. Please provide valid `cricbuzz live match score url`").then(msg => {
                             msg.delete({ timeout: 10000 })
                          })
                          .catch(e=> console.log(e));
    }
  }

  if(args[0] == 'c.update' || args[0] == 'c.updates' || args[0] == 'c.u'){
    try{
        if(mURL == ""){
          return  message.channel.send("Please set the CricBuzz live match score url by using `c.set {URL}` command").then(msg => {
                                 msg.delete({ timeout: 10000 })
                              })
                              .catch(e=> console.log(e));
        }
        liveScore = await getLiveUpdate(mURL);
        if(isEmptyObject(liveScore)){
          mURL = "";
					updateDataToFirebase();
          return  message.channel.send("There is problem with exisitng URL. Please set the CricBuzz live match score url by using `c.set {URL}` command");
        }
        var title = (liveScore['title'] === undefined) ? '\u200B' : liveScore['title']
        var update = (liveScore['update'] === undefined) ? '\u200B': liveScore['update']
        var live = (liveScore['live'] === undefined) ? '\u200B': liveScore['live']
        var ballTeamScore = (liveScore['ballTeamScore'] === undefined) ? '\u200B': liveScore['ballTeamScore']
        var firstBatsman = (liveScore['firstBatsman'] === undefined) ? '\u200B': liveScore['firstBatsman']
        var firstBatsmanRun = (liveScore['firstBatsmanRun'] === undefined) ? '\u200B': liveScore['firstBatsmanRun']
        var firstBatsmanBalls = (liveScore['firstBatsmanBalls'] === undefined) ? '\u200B': liveScore['firstBatsmanBalls']
        var secondBatsman = (liveScore['secondBatsman'] === undefined) ? '\u200B': liveScore['secondBatsman']
        var secondBatsmanRun = (liveScore['secondBatsmanRun'] === undefined) ? '\u200B': liveScore['secondBatsmanRun']
        var secondBatsmanBalls = (liveScore['secondBatsmanBalls'] === undefined) ? '\u200B': liveScore['secondBatsmanBalls']
        var runRate = (liveScore['runRate'] === undefined) ? '\u200B': liveScore['runRate']
        var partnership = (liveScore['partnership'] === undefined) ? '\u200B': "Partnership - "+liveScore['partnership']
        var bowler = (liveScore['bowler'] === undefined) ? '\u200B': "Bowler -  "+liveScore['bowler']
        var bowlerFigures = '\u200B';
        if( liveScore['bowlerOver'] != undefined && liveScore['bowlerRuns'] != undefined && liveScore['bowlerWickets'] != undefined){
          bowlerFigures = 'Bowler Figures - '+liveScore['bowlerOver'] +"-"+liveScore['bowlerRuns'] +"-"+ liveScore['bowlerWickets'] +" (O-R-W)"
        }
        var lastWicket = (liveScore['lastWicket'] === undefined) ? '\u200B': "LastWicket -  "+liveScore['lastWicket']
        var recentBalls = (liveScore['recentBalls'] === undefined) ? '\u200B': "RecentBalls -  "+liveScore['recentBalls']
        const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(title)
                    .setDescription(update)
                    .setThumbnail('https://cdn.iconscout.com/icon/free/png-512/cricket-logo-1845485-1564757.png')
                    .addField(live, ballTeamScore,true)
                    .addField('\u200B', '\u200B',true)
                    .addField( firstBatsman + ' ' + firstBatsmanRun+" "+firstBatsmanBalls  , secondBatsman + ' ' + secondBatsmanRun+" "+secondBatsmanBalls ,true)
                    .addField( runRate  , partnership )
                    .addField( bowler  , bowlerFigures )
                    .addField( lastWicket  , recentBalls )
                    .setFooter('Powered by CricBuzz ', 'https://thereisabotforthat-storage.s3.amazonaws.com/uploads/cricbuzzbot.png');
        return message.channel.send(exampleEmbed);
      } catch (e) {
      console.log(e);
      message.reply("`error`").then(msg => {
                             msg.delete({ timeout: 10000 })
                          })
                          .catch(e=> console.log(e));
    }
  }

  if(args[0] == 'c.commentary' || args[0] == 'c.c'){
    try{
			if(mURL == ""){
				return  message.channel.send("Please set the CricBuzz live match score url by using `c.set {URL}` command").then(msg => {
															 msg.delete({ timeout: 10000 })
														})
														.catch(e=> console.log(e));
			}
      liveScore = await getLiveUpdate(mURL);
      if(liveScore['commentary'] == undefined){
        return  message.channel.send("Sorry commentary is not available at the moment");
      }else {
        var title = (liveScore['title'] === undefined) ? '\u200B' : liveScore['title']
        var commentary = liveScore['commentary'].substring(0,2048);
        const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(title)
                    .setDescription(commentary)
                    .setThumbnail('https://cdn.iconscout.com/icon/free/png-512/cricket-logo-1845485-1564757.png')
                    .setFooter('Powered by CricBuzz ', 'https://thereisabotforthat-storage.s3.amazonaws.com/uploads/cricbuzzbot.png');
        return message.channel.send(exampleEmbed);
      }
    }catch(e){
      return  message.channel.send("`error`").then(msg => {
                             msg.delete({ timeout: 10000 })
                          })
                          .catch(e=> console.log(e));
    }
  }

  if(args[0] == 'c.help' || args[0] == 'c.h' || message.mentions.users.some(u=> u.id == client.user.id)){
    try{
      var string = "Here are the list of commands for the cricbot- \n";
      string += "`c.set/c.s {URL} - CricBuzz live match score url to get updates for match`\n"
      string += "`c.update/c.u - To get the update of the match for which URL is set for`\n"
      string += "`c.commentary/c.c - To get the commentary of the match for which URL is set for`\n"
      string += "`c.help/c.h - To get the help for bot commands.`\n"
      return  message.channel.send(string)
    }catch(e){
      return  message.channel.send("`error`").then(msg => {
                             msg.delete({ timeout: 10000 })
                          })
                          .catch(e=> console.log(e));
    }
  }
})

const getLiveUpdate = (url) => {
  console.log("getLiveUpdate");
  return new Promise(async (resolve,reject)=>{
    unirest.get(url)
           .headers({
             'User-Agent': [
                   "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
                   "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
                   "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
                   "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
                   "Mozilla/5.0 (Linux; Android 9; Redmi Note 5 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36",
                   "Mozilla/5.0 (Android 9; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0",
                   "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/81.0",
                   "Mozilla/5.0 (iPhone; CPU iPhone OS 10_15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/28.0 Mobile/15E148 Safari/605.1.15",
                   "Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36 OPR/59.1.2926.54067",
                   "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36"
               ]
             })
             .end(function(res) {
                 if (res.error) {
                   console.log('GET error') ;
                   console.log(res.error);
                   return reject();
                 }
                 else{
                   console.log("resolve done for url");
                   var title = functions.getTitle(res.body);
                   var live = functions.getLive(res.body);
                   var firstBatsman = functions.getFirstBatsman(res.body);
                   var secondBatsman = functions.getSecondBatsman(res.body);
                   var firstBatsmanRun = functions.getFirstBatsmanRun(res.body);
                   var firstBatsmanBalls = functions.getFirstBatsmanBalls(res.body);
                   var secondBatsmanRun = functions.getSecondBatsmanRun(res.body);
                   var secondBatsmanBalls = functions.getSecondBatsmanBalls(res.body);
                   var bowler = functions.getBowler(res.body);
                   var bowlerOver = functions.getBowlerOver(res.body);
                   var bowlerRuns = functions.getBowleRuns(res.body);
                   var bowlerWickets = functions.getBowlerWickets(res.body);
                   var partnership = functions.getPartnership(res.body);
                   var recentBalls = functions.getRecentBalls(res.body);
                   var lastWicket = functions.getLastWicket(res.body);
                   var runRate = functions.getRunRate(res.body);
                   var commentary = functions.getCommentary(res.body);
                   var update = functions.getDetails(res.body);
                   var ballTeamScore = functions.getBallTeamScore(res.body);
                   var livescore = {};
                   if(title){
                     console.log("Title "+title);
                     livescore['title'] = title;
                   }
                   if(live){
                     console.log("Live "+live);
                     livescore['live'] = live;
                   }
                   if(firstBatsman){
                     console.log("First Batsman "+firstBatsman);
                     livescore['firstBatsman'] = firstBatsman;
                   }
                   if(secondBatsman){
                     console.log("Second Batsman "+secondBatsman);
                     livescore['secondBatsman'] = secondBatsman;
                   }
                   if(firstBatsmanRun){
                     console.log("First Batsman Run "+firstBatsmanRun);
                     livescore['firstBatsmanRun'] = firstBatsmanRun;
                   }
                   if(firstBatsmanBalls){
                     console.log("First Batsman Balls "+firstBatsmanBalls);
                     livescore['firstBatsmanBalls'] = firstBatsmanBalls;
                   }
                   if(secondBatsmanRun){
                     console.log("Second Batsman Run "+secondBatsmanRun);
                     livescore['secondBatsmanRun'] = secondBatsmanRun;
                   }
                   if(secondBatsmanBalls){
                     console.log("Second Batsman Balls "+secondBatsmanBalls);
                     livescore['secondBatsmanBalls'] = secondBatsmanBalls;
                   }
                   if(bowler){
                     console.log("Bowler "+bowler);
                     livescore['bowler'] = bowler;
                   }
                   if(bowlerOver){
                     console.log("bowlerOver "+bowlerOver);
                     livescore['bowlerOver'] = bowlerOver;
                   }
                   if(bowlerRuns){
                     console.log("bowlerRuns "+bowlerRuns);
                     livescore['bowlerRuns'] = bowlerRuns;
                   }
                   if(bowlerWickets){
                     console.log("bowlerWickets "+bowlerWickets);
                     livescore['bowlerWickets'] = bowlerWickets;
                   }
                   if(partnership){
                     console.log("partnership "+partnership);
                     livescore['partnership'] = partnership;
                   }
                   if(recentBalls){
                     console.log("recentBalls "+recentBalls);
                     livescore['recentBalls'] = recentBalls;
                   }
                   if(lastWicket){
                     console.log("lastWicket "+lastWicket);
                     livescore['lastWicket'] = lastWicket;
                   }
                   if(runRate){
                     console.log("runRate "+runRate);
                     livescore['runRate'] = runRate;
                   }
                   if(commentary){
                     console.log("commentary "+commentary);
                     livescore['commentary'] = commentary;
                   }
                   if(update){
                     console.log("update "+update);
                     livescore['update'] = update;
                   }
                   if(ballTeamScore){
                     console.log("ballTeamScore "+ballTeamScore);
                     livescore['ballTeamScore'] = ballTeamScore;
                   }
                   return resolve(livescore);
                 }
             });
  })
}
// unirest.get("https://www.cricbuzz.com/live-cricket-scores/35207/wi-vs-sl-1st-test-sri-lanka-tour-of-west-indies-2021")
//       .headers({
//       'User-Agent': [
//             "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
//             "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
//             "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
//             "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36",
//             "Mozilla/5.0 (Linux; Android 9; Redmi Note 5 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36",
//             "Mozilla/5.0 (Android 9; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0",
//             "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/81.0",
//             "Mozilla/5.0 (iPhone; CPU iPhone OS 10_15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/28.0 Mobile/15E148 Safari/605.1.15",
//             "Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36 OPR/59.1.2926.54067",
//             "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36"
//         ]
//       })
//      .end(function(res) {
//        if (res.error) {
//          console.log('GET error') ;
//          console.log(res.error);
//        }
//        else {
//          console.log("resolve done for url");
//          fs.writeFile('file.txt', res.body, function (err) {
//           if (err) return console.log(err);
//           console.log('Hello World > helloworld.txt');
//         });
//         var myRegexp = /<span class='bat-bowl-miniscore'>([^<]*)/g;
//         var matches = res.body.matchAll(myRegexp);
//         for (const match of matches) {
//           console.log(match[1]);
//           console.log(match.index)
//         }
//         var title = functions.getTitle(res.body);
//         var live = functions.getLive(res.body);
//         var firstBatsman = functions.getFirstBatsman(res.body);
//         var secondBatsman = functions.getSecondBatsman(res.body);
//         var firstBatsmanRun = functions.getFirstBatsmanRun(res.body);
//         var firstBatsmanBalls = functions.getFirstBatsmanBalls(res.body);
//         var secondBatsmanRun = functions.getSecondBatsmanRun(res.body);
//         var secondBatsmanBalls = functions.getSecondBatsmanBalls(res.body);
//         var bowler = functions.getBowler(res.body);
//         var bowlerOver = functions.getBowlerOver(res.body);
//         var bowlerRuns = functions.getBowleRuns(res.body);
//         var bowlerWickets = functions.getBowlerWickets(res.body);
//         var partnership = functions.getPartnership(res.body);
//         var recentBalls = functions.getRecentBalls(res.body);
//         var lastWicket = functions.getLastWicket(res.body);
//         var runRate = functions.getRunRate(res.body);
//         var commentary = functions.getCommentary(res.body);
//         var update = functions.getDetails(res.body);
//         var ballTeamScore = functions.getBallTeamScore(res.body);
//         var livescore = {};
//         if(title){
//           console.log("Title "+title);
//           livescore['title'] = title;
//         }
//         if(live){
//           console.log("Live "+live);
//           livescore['live'] = live;
//         }
//         if(firstBatsman){
//           console.log("First Batsman "+firstBatsman);
//           livescore['firstBatsman'] = firstBatsman;
//         }
//         if(secondBatsman){
//           console.log("Second Batsman "+secondBatsman);
//           livescore['secondBatsman'] = secondBatsman;
//         }
//         if(firstBatsmanRun){
//           console.log("First Batsman Run "+firstBatsmanRun);
//           livescore['firstBatsmanRun'] = firstBatsmanRun;
//         }
//         if(firstBatsmanBalls){
//           console.log("First Batsman Balls "+firstBatsmanBalls);
//           livescore['firstBatsmanBalls'] = firstBatsmanBalls;
//         }
//         if(secondBatsmanRun){
//           console.log("Second Batsman Run "+secondBatsmanRun);
//           livescore['secondBatsmanRun'] = secondBatsmanRun;
//         }
//         if(secondBatsmanBalls){
//           console.log("Second Batsman Balls "+secondBatsmanBalls);
//           livescore['secondBatsmanBalls'] = secondBatsmanBalls;
//         }
//         if(bowler){
//           console.log("Bowler "+bowler);
//           livescore['bowler'] = bowler;
//         }
//         if(bowlerOver){
//           console.log("bowlerOver "+bowlerOver);
//           livescore['bowlerOver'] = bowlerOver;
//         }
//         if(bowlerRuns){
//           console.log("bowlerRuns "+bowlerRuns);
//           livescore['bowlerRuns'] = bowlerRuns;
//         }
//         if(bowlerWickets){
//           console.log("bowlerWickets "+bowlerWickets);
//           livescore['bowlerWickets'] = bowlerWickets;
//         }
//         if(partnership){
//           console.log("partnership "+partnership);
//           livescore['partnership'] = partnership;
//         }
//         if(recentBalls){
//           console.log("recentBalls "+recentBalls);
//           livescore['recentBalls'] = recentBalls;
//         }
//         if(lastWicket){
//           console.log("lastWicket "+lastWicket);
//           livescore['lastWicket'] = lastWicket;
//         }
//         if(runRate){
//           console.log("runRate "+runRate);
//           livescore['runRate'] = runRate;
//         }
//         if(commentary){
//           console.log("commentary "+commentary);
//           livescore['commentary'] = commentary;
//         }
//         if(update){
//           console.log("update "+update);
//           livescore['update'] = update;
//         }
//         if(ballTeamScore){
//           console.log("ballTeamScore "+ballTeamScore);
//           livescore['ballTeamScore'] = ballTeamScore;
//         }
//       }
//      });
