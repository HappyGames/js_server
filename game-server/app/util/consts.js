/**
 * Created by King Lee on 14-4-15.
 */
module.exports = {
    //  the message type communicated with server,client must define something similar.
    TYPE_MSG:{
        TYPE_MSG_BEGIN :1,
        TYPE_MSG_GET_SRV_TIME:3,
        TYPE_MSG_MAIL:4,
        TYPE_GET_ACTIVITY:5,
        TYPE_MSG_END:100
    },
    TYPE_ACTIVITY:{
        TYPE_DAILY_SIGN:1, 	    //// 每日签到
        TYPE_DROP_ITEM:2,		//// 物品掉落
        TYPE_TASK:3			    //// 每日任务
    }
};