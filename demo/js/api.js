var H5P=window.H5P=window.H5P||{};H5P.externalDispatcher=new H5P.EventDispatcher();H5P.EventDispatcher.prototype.triggerXAPI=function(verb,extra){this.trigger(this.createXAPIEventTemplate(verb,extra));};H5P.EventDispatcher.prototype.createXAPIEventTemplate=function(verb,extra){var event=new H5P.XAPIEvent();event.setActor();event.setVerb(verb);if(extra!==undefined){for(var i in extra){event.data.statement[i]=extra[i];}}
if(!('object'in event.data.statement)){event.setObject(this);}
if(!('context'in event.data.statement)){event.setContext(this);}
return event;};H5P.EventDispatcher.prototype.triggerXAPICompleted=function(score,maxScore,success){this.triggerXAPIScored(score,maxScore,'completed',true,success);};H5P.EventDispatcher.prototype.triggerXAPIScored=function(score,maxScore,verb,completion,success){var event=this.createXAPIEventTemplate(verb);event.setScoredResult(score,maxScore,this,completion,success);this.trigger(event);};H5P.EventDispatcher.prototype.setActivityStarted=function(){if(this.activityStartTime===undefined){if(this.contentId!==undefined&&H5PIntegration.contents!==undefined&&H5PIntegration.contents['cid-'+this.contentId]!==undefined){this.triggerXAPI('attempted');}
this.activityStartTime=Date.now();}};H5P.xAPICompletedListener=function(event){if((event.getVerb()==='completed'||event.getVerb()==='answered')&&!event.getVerifiedStatementValue(['context','contextActivities','parent'])){var score=event.getScore();var maxScore=event.getMaxScore();var contentId=event.getVerifiedStatementValue(['object','definition','extensions','http://h5p.org/x-api/h5p-local-content-id']);H5P.setFinished(contentId,score,maxScore);}};