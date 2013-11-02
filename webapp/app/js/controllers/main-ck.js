"use strict";angular.module("dscover.me").controller("MainCtrl",function(e,t,n,r,i){function s(){e.volumes.default==0&&e.$apply(e.muted=!0);n.volume=e.volumes.default}e.title="dscover.me";i.success(function(t){e.tracks=t});e.current=0;e.playing=!1;e.paused=!1;e.muted=!1;e.volumes={"default":.5,options:{orientation:"vertical",min:0,max:1,step:.1,range:"min",change:s,slide:s}};e.play=function(){if(!e.tracks.length)return;e.paused||(n.src=e.tracks[e.current].url);n.play();e.playing=!0};e.pause=function(){if(e.playing){n.pause();e.playing=!1;e.paused=!0}};e.next=function(){e.paused=!1;e.tracks.length>e.current+1?e.current++:e.current=0;e.playing&&e.play()};e.prev=function(){e.paused=!1;if(e.current>0){e.current--;e.play()}};e.muteVolume=function(){if(e.muted==1){e.muted=!1;e.volumes.default=.5}else{n.volume=0;e.volumes.default=0;e.muted=!0}};n.addEventListener("ended",function(){e.$apply(e.next)});n.addEventListener("timeupdate",function(){var t=document.getElementById("duration"),i=parseInt(n.currentTime%60),s=n.duration,o=i/s*100;$(".progress").html(r("<div class='progress-bar' style='width:"+o+"%'><span class='sr-only'>60% Complete</span></div>")(e))},!1)}).factory("audio",function(e){var t=e[0].createElement("audio");return t}).factory("fetchTracks",function(e,t){return t.get("tracks.json")});