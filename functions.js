function  getTitle(data){
  console.log('getTitle');
  var regexRateLimit  = /<h4 class="cb-list-item ui-header ui-branding-header">([^<]*)<\/h4>/g;
  var regexSrc = /<h4 class="cb-list-item ui-header ui-branding-header">([^<]*)<\/h4>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getLive(data){
  console.log('getLive');
  var regexRateLimit  = /<span class='miniscore-teams ui-bat-team-scores'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='miniscore-teams ui-bat-team-scores'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getFirstBatsman(data){
  console.log('getFirstBatsman');
  var regexRateLimit  = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getSecondBatsman(data){
  console.log('getSecondBatsman');
  var regexRateLimit  = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[1] != undefined){
    return matches[1][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[1] != undefined){
       return matches[1][1];
     }else {
        return null;
     }
  }
}

function  getFirstBatsmanRun(data){
  console.log('getFirstBatsmanRun');
  var regexRateLimit  = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" ><b>([^<]*)/g;
  var regexSrc = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" ><b>([^<]*)/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getFirstBatsmanBalls(data){
  console.log('getFirstBatsmanBalls');
  var regexRateLimit  = /<span style='font-weight:normal'>([^<]*)<\/span>/g;
  var regexSrc = /<span style='font-weight:normal'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getSecondBatsmanRun(data){
  console.log('getSecondBatsmanRun');
  var regexRateLimit  = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" ><b>([^<]*)/g;
  var regexSrc = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" ><b>([^<]*)/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[1] != undefined){
    return matches[1][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[1] != undefined){
       return matches[1][1];
     }else {
        return null;
     }
  }
}

function  getSecondBatsmanBalls(data){
  console.log('getSecondBatsmanBalls');
  var regexRateLimit  = /<span style='font-weight:normal'>([^<]*)<\/span>/g;
  var regexSrc = /<span style='font-weight:normal'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[1] != undefined){
    return matches[1][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[1] != undefined){
       return matches[1][1];
     }else {
        return null;
     }
  }
}

function  getBowler(data){
  console.log('getBowler');
  var regexRateLimit  = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='bat-bowl-miniscore'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[2] != undefined){
    return matches[2][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[2] != undefined){
       return matches[2][1];
     }else {
        return null;
     }
  }
}

function  getBowlerOver(data){
  console.log('getBowlerOver');
  var regexRateLimit  = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" >([^<]*)<\/td>/g;
  var regexSrc = /<td colspan="1" class="cbz-grid-table-fix " style="width:20%;" >([^<]*)<\/td>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getBowleRuns(data){
  console.log('getBowleRuns');
  var regexRateLimit  = /<td colspan="1" class="cbz-grid-table-fix " style="width:11%;" >([^<]*)<\/td>/g;
  var regexSrc = /<td colspan="1" class="cbz-grid-table-fix " style="width:11%;" >([^<]*)<\/td>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[5] != undefined){
    return matches[5][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[5] != undefined){
       return matches[5][1];
     }else {
        return null;
     }
  }
}

function  getBowlerWickets(data){
  console.log('getBowlerWickets');
  var regexRateLimit  = /<td colspan="1" class="cbz-grid-table-fix " style="width:18%;" ><b>([^<]*)<\/b><\/td>/g;
  var regexSrc = /<td colspan="1" class="cbz-grid-table-fix " style="width:18%;" ><b>([^<]*)<\/b><\/td>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getPartnership(data){
  console.log('getPartnership');
  var regexRateLimit  = /<span style='color:#333'>([^<]*)<\/span>/g;
  var regexSrc = /<span style='color:#333'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
  }
}

function  getRecentBalls(data){
  console.log('getRecentBalls');
  var regexRateLimit  = /<span style='color:#333'>([^<]*)<\/span>/g;
  var regexSrc = /<span style='color:#333'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[2] != undefined){
    return matches[2][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[2] != undefined){
       if( matches[2][1].substring(0,1) =='.'){
         return matches[2][1];
       }
        return matches[1][1];
     }else {
        return null;
     }
  }
}

function  getLastWicket(data){
  console.log('getLastWicket');
  var regexRateLimit  = /<span style='color:#333'>([^<]*)<\/span>/g;
  var regexSrc = /<span style='color:#333'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[1] != undefined){
    console.log("hi "+matches[1][1]);
    if(matches[1] != undefined){
      if( matches[1][1].substring(0,1) =='.'){
        return null;
      }
    }
    return matches[1][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[1] != undefined){
       console.log("hi "+matches[1][1]);
       if( matches[1][1].substring(0,1) =='.'){
         return null;
       }
       return matches[1][1];
     }else {
        return null;
     }
  }
}

function  getRunRate(data){
  console.log('getRunrate');
  var regexRateLimit  = /<span class='crr'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='crr'>([^<]*)<\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    var string = matches[0][1];
    string = string.replace("&nbsp;","")
    return string;
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       var string = matches[0][1];
       string = string.replace("&nbsp;","")
       return string;
     }else {
        return null;
     }
  }
}

function  getCommentary(data){
  console.log('getCommentary');
  var regexRateLimit  = /<p class='commtext'>([^<]*[<b>]*[^<]*[<\/b]*[^<]*)<\/p>/g;
  var regexSrc = /<p class='commtext'>([^<]*[<b>]*[^<]*[<\/b]*[^<]*)<\/p>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  var i;
  var string ="";
  if(matches.length>0){
    var count = 0;
    for(i=0;i<matches.length;i++){
      if( !matches[i][1].includes("</span>")){
        string+= matches[i][1].replace("<b>","**").replace("</b>","**").replace("<i>","*").replace("</i>","*")+"\n";
        count++;
      }
      if(count > 6){
        break;
      }
    }
    if(string ==""){
      return null;
    }
    return string;
  }else {
        return null;
  }
}

function  getDetails(data){
  console.log('getDetails');
  var regexRateLimit  = /<div class='cbz-ui-status'>([^<]*)<\/div>/g;
  var regexSrc = /<div class='cbz-ui-status'>([^<]*)<\/div>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    var string = matches[0][1];
    string = string.replace("&nbsp;","")
    return string;
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       var string = matches[0][1];
       string = string.replace("&nbsp;","")
       return string;
     }else {
        return null;
     }
   }
}

function  getBallTeamScore(data){
  console.log('getTeamOneScore');
  var regexRateLimit  = /<span class='teamscores ui-bowl-team-scores'>([^<]*)<\/span>/g;
  var regexSrc = /<span class='teamscores ui-bowl-team-scores'>([^<]*)<br><\/span>/g;
  var matches = [...data.matchAll(regexRateLimit)];
  if(matches[0] != undefined){
    return matches[0][1];
  }else {
     matches = [...data.matchAll(regexSrc)];
     if(matches[0] != undefined){
       return matches[0][1];
     }else {
        return null;
     }
   }
}

module.exports = {getTitle, getLive, getFirstBatsman, getSecondBatsman, getFirstBatsmanRun, getFirstBatsmanBalls, getSecondBatsmanRun, getSecondBatsmanBalls, getBowler, getBowlerOver, getBowleRuns, getBowlerWickets, getPartnership, getRecentBalls,getLastWicket, getRunRate, getCommentary, getDetails, getBallTeamScore};
