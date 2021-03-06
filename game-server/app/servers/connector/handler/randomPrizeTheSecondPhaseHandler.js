/**
 * Created by King Lee on 2014/9/16.
 */
var handlerMgr = require("./../handlerMgr");
var consts = require("../../../util/consts");
var pomelo = require('pomelo');

handlerMgr.handler(consts.TYPE_MSG.TYPE_RANDOM_PRIZE_THE_SECOND_PHASE, function(msg, session, next) {
    var channel = msg.channel;
    var version = msg.version;
    var device_guid = msg.player_guid;
    var single_gacha = msg.single_gacha;
    var random_prize_the_second_phase_wrapper = pomelo.app.get('random_prize_the_second_phase_wrapper');
    var count = 0;
    var gacha_result = [];
    if(single_gacha == "true" ){
        count = 1;
    }
    else{
        count = 12;
    }
    var free_flag = 1;
    var activity = {};
    var activity_wrapper = pomelo.app.get('activity_wrapper');
    activity_wrapper.get(channel,version,function(activity_json) {
        for (var v in activity_json) {
            if (consts.TYPE_ACTIVITY.TYPE_RANDOM_PRIZE_THE_SECOND_PHASE == parseInt(activity_json[v].type)) {
                activity = activity_json[v];
                break;
            }
        }
        //  random prize
        random_prize_the_second_phase_wrapper.get(device_guid,function(reply){
            if(null != reply){
                free_flag = JSON.parse(reply)
            }
            //  if is single random prize, free_flag set zero
            if(1 == free_flag && single_gacha == "true" ){
                free_flag = 0;
            }
            for(var i = 0; i < count; ++i){
                var gacha_array = new Array();
                for(var j = 0; j < activity.gacha_random_num; ++j){
                    var prize = random_prize_the_second_phase_wrapper.random();
                    if(!prize){
                        continue;
                    }
                    gacha_array.push(prize);
                }
                for(var j = 0; j < activity.gacha2_random_num; ++j){
                    var prize = random_prize_the_second_phase_wrapper.random2();
                    if(!prize){
                        continue;
                    }
                    gacha_array.push(prize);
                }
                gacha_result.push(gacha_array);
            }
            random_prize_the_second_phase_wrapper.set(device_guid,free_flag);
            next(null, {
                code: 0,
                msg_id : msg.msg_id,
                flowid : msg.flowid,
                time:Math.floor(Date.now()/1000),
                gacha_result : gacha_result,
                use_ticket : msg.use_ticket == "true" ? "1": "0"
            });
        });

    });
});
