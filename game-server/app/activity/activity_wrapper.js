/**
 * Created by King Lee on 2014/7/14.
 */
var activity_templete = require('../../config/activity_templete');
var redis_activity_wrapper = require('../nosql/redis_activity_wrapper');

var activity_wrapper = function() {
    //  init once
    if(1)
    {
        this.init(activity_templete);
    }
};

activity_wrapper.prototype.init = function(activity_template){
    redis_activity_wrapper.add_activity('template','template',activity_template);
    redis_activity_wrapper.add_activity('qihu360','1.2.2',activity_template);
};

activity_wrapper.prototype.get = function(channel,version,cb){
    redis_activity_wrapper.get_activity(channel,version,function(reply){
        if(reply){
            cb(JSON.parse(reply));
        }else{
            redis_activity_wrapper.get_activity('template','template',function(reply){
                if(reply) {
                    cb(JSON.parse(reply));
                }
            });
        }
    });
};

module.exports = activity_wrapper;
