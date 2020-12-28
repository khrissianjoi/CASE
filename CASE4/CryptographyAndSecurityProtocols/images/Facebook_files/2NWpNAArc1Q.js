if (self.CavalryLogger) { CavalryLogger.start_js(["SaLyR"]); }

__d("LSContactGender.bs",["bs_caml_int64"],(function(a,b,c,d,e,f){"use strict";c=(a=b("bs_caml_int64")).zero;d=a.one;e=a.mk(2,0);b=a.mk(3,0);f.unknown=c;f.female=d;f.male=e;f.neuter=b}),null);
__d("LSMailboxType.bs",["bs_caml_int64"],(function(a,b,c,d,e,f){"use strict";c=(a=b("bs_caml_int64")).zero;d=a.mk(1024,0);e=a.mk(2048,0);b=a.mk(2049,0);f.messenger=c;f.tincan=d;f.whatsappPhone=e;f.whatsappInterop=b}),null);
__d("MWLSParticipant.bs",["SkytaleDB","bs_caml_int64","bs_belt_Option","LSContactType.bs","LSMailboxType.bs","SkytaleDBQuery.bs","LSContactGender.bs","LSContactBlockedByViewerStatus.bs"],(function(a,b,c,d,e,f){"use strict";var g;g={contact_id:(g=b("bs_caml_int64")).zero,thread_key:g.zero,contactType:b("LSContactType.bs").unknown,mailbox_type:b("LSMailboxType.bs").messenger,read_watermark_timestamp_ms:g.zero,read_action_timestamp_ms:g.zero,delivered_watermark_timestamp_ms:g.zero,name:"",actual_name:"",nickname:void 0,blocked_by_viewer_status:b("LSContactBlockedByViewerStatus.bs").unblocked,profile_picture_url:"",is_messenger_user:!1,is_admin:!1,gender:b("LSContactGender.bs").unknown};function h(a){var c=a[1];a=a[0];var d=a.e;if(d!==void 0)d=d;else{var e=c.p;d=e!==void 0?e:c.h}return{contact_id:a.b,thread_key:a.a,contactType:c.q,mailbox_type:b("LSMailboxType.bs").messenger,read_watermark_timestamp_ms:a.c,read_action_timestamp_ms:a.k,delivered_watermark_timestamp_ms:a.d,name:d,actual_name:c.h,nickname:a.e,blocked_by_viewer_status:c.n,profile_picture_url:c.b,is_messenger_user:c.k,is_admin:b("bs_belt_Option").getWithDefault(a.f,!1),gender:c.I}}function i(a){var c=a[1];a=a[0];return{contact_id:a.b,thread_key:a.a,contactType:c.q,mailbox_type:b("LSMailboxType.bs").messenger,read_watermark_timestamp_ms:a.c,read_action_timestamp_ms:b("bs_caml_int64").zero,delivered_watermark_timestamp_ms:a.d,name:c.h,actual_name:c.h,nickname:void 0,blocked_by_viewer_status:c.n,profile_picture_url:c.b,is_messenger_user:c.k,is_admin:!1,gender:c.I}}function a(a,c,d){return b("SkytaleDBQuery.bs").map(b("SkytaleDBQuery.bs").mergeJoin(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(a,"participants").asc,{hd:d,tl:0}),c),h)}function c(a,c,d){return b("SkytaleDBQuery.bs").map(b("SkytaleDBQuery.bs").mergeJoin(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(a,"secure_thread_participants").asc,{hd:d,tl:0}),c),i)}function d(a,c){return b("SkytaleDBQuery.bs").getKeyRange(a,{hd:c,tl:0})}function e(a,c){return b("SkytaleDBQuery.bs").getKeyRange(a,{hd:c,tl:0})}f.empty=g;f.projectOpen=h;f.projectSecure=i;f.getAllInOpenThread=a;f.getAllInSecureThread=c;f.getInOpenThread=d;f.getInSecureThread=e}),null);
__d("MWLSLoadParticipants.bs",["FBID.bs","bs_int64","React","SkytaleDB","MercuryIDs","bs_caml_format","GenderConst","SkytaleDBHook.bs","MWLSParticipant.bs","MWThread_DEPRECATED.bs","LSMessagingThreadTypeUtil.bs","LSContactBlockedByViewerStatus.bs","SkytaleDBQuerySubscriptionHook.bs"],(function(a,b,c,d,e,f){"use strict";var g=b("React");function a(a){var c=b("SkytaleDBHook.bs").useHook(void 0),d=b("MWThread_DEPRECATED.bs").toThreadKey(a);a=b("LSMessagingThreadTypeUtil.bs").ofThreadId(a);var e=b("bs_int64").to_string(d),f=b("SkytaleDB").table(c,"contacts").asc;d=g.useMemo(function(){return b("MWLSParticipant.bs").getAllInOpenThread(c,f,b("bs_caml_format").caml_int64_of_string(e))},[e,c]);var h=g.useMemo(function(){return b("MWLSParticipant.bs").getAllInSecureThread(c,f,b("bs_caml_format").caml_int64_of_string(e))},[e,c]);a=b("SkytaleDBQuerySubscriptionHook.bs").useArray(b("LSMessagingThreadTypeUtil.bs").isSecure(a)?h:d);h=a.reduce(function(a,c){var d=a[1];a=a[0];var e=b("FBID.bs").ofStringExn(b("bs_int64").to_string(c.contact_id)),f=b("MercuryIDs").getParticipantIDFromUserID(e);a[f]={id:f,fbid:e,name:c.actual_name,image_src:c.profile_picture_url,square_image_src:null,accepts_messenger_user_feedback:!1,big_image_src:null,href:null,gender:b("GenderConst").NOT_A_PERSON,short_name:c.name,user_type:null,vanity:null,is_friend:!1,is_viewer_managing_parent:!1,is_messenger_user:c.is_messenger_user,is_aloha_proxy_confirmed:!1,is_business_enabled:!1,is_messenger_platform_bot:!1,is_messenger_blocked:c.blocked_by_viewer_status===b("LSContactBlockedByViewerStatus.bs").messageBlocked,is_subscribed_to_page_updates:!1,is_messenger_ignored:null,is_facebook_blocked:c.blocked_by_viewer_status===b("LSContactBlockedByViewerStatus.bs").fullyBlocked,title:null,company_name:null,employee:!1,instant_game_channel:null,work_foreign_entity_info:null,wec_group_creation_time:null,wec_group_invite_link:null,wec_group_participant_count:null,wec_group_participants:[],wec_group_admins:[],timezone:null,verification_status:null};f=c.nickname;f!==void 0&&(d[e]=f);return[a,d]},[{},{}]);d=function(a,b){};return[h[0],h[1],d]}function h(a){var c=b("SkytaleDBHook.bs").useHook(void 0),d=b("MWThread_DEPRECATED.bs").toThreadKey(a);a=b("LSMessagingThreadTypeUtil.bs").ofThreadId(a);var e=b("bs_int64").to_string(d),f=b("SkytaleDB").table(c,"contacts").asc;d=g.useMemo(function(){return b("MWLSParticipant.bs").getAllInOpenThread(c,f,b("bs_caml_format").caml_int64_of_string(e))},[e,JSON.stringify(a),c]);var h=g.useMemo(function(){return b("MWLSParticipant.bs").getAllInSecureThread(c,f,b("bs_caml_format").caml_int64_of_string(e))},[e,JSON.stringify(a),c]);return b("SkytaleDBQuerySubscriptionHook.bs").useArray(b("LSMessagingThreadTypeUtil.bs").isSecure(a)?h:d)}function c(a){var c=h(a);return g.useMemo(function(){return c.reduce(function(a,c){return a.set(b("FBID.bs").ofStringExn(b("bs_int64").to_string(c.contact_id)),c)},new Map())},[c])}function d(a){a=h(a);var c=new Map();a.forEach(function(a){var d=b("FBID.bs").ofStringExn(b("bs_int64").to_string(a.contact_id)),e=a.name,f=a.actual_name,g=a.nickname,h=a.profile_picture_url,i=a.is_admin;d={contactId:d,name:e,actualName:f,nickname:g,profileUrl:void 0,profilePictureUrl:h,isContact:!0,isAdmin:i};c.set(b("FBID.bs").ofStringExn(b("bs_int64").to_string(a.contact_id)),d)});return c}f.useMercuryParticipants=a;f.useMWLSParticipants=h;f.useMWLSParticipantsMap=c;f.useParticipants=d}),null);
__d("LSMessageSendStatus.bs",["bs_caml_int64"],(function(a,b,c,d,e,f){"use strict";c=(a=b("bs_caml_int64")).zero;d=a.one;e=a.mk(2,0);b=a.mk(4,0);a=a.mk(5,0);f.none=c;f.sendingToServer=d;f.serverReceived=e;f.nonRetriableError=b;f.retriableError=a}),null);
__d("LSPresenceStatus.bs",["bs_caml_int64"],(function(a,b,c,d,e,f){"use strict";a=b("bs_caml_int64").one;c=b("bs_caml_int64").mk(2,0);f.offline=a;f.active=c}),null);
__d("MWLSPresence.bs",["bs_int64","SkytaleDB","SkytaleDBExec.bs","SkytaleDBQuery.bs"],(function(a,b,c,d,e,f){"use strict";function a(a,c,d){return new Map(b("SkytaleDBExec.bs").toArray(b("SkytaleDBQuery.bs").map(b("SkytaleDBQuery.bs").mergeJoin(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(a,"participants").asc,{hd:d,tl:0}),c),function(a){a=a[1];return[b("bs_int64").to_string(a.a),a]})))}f.getInThread=a}),null);
__d("MWLSThreadImageUrls.bs",["bs_int64","bs_caml_int64"],(function(a,b,c,d,e,f){"use strict";function a(a,c,d){if(d!==void 0)return[d];d=a.filter(function(a){return b("bs_caml_int64").neq(a.contact_id,c)}).slice();d.sort(function(a,c){return b("bs_int64").compare(a.delivered_watermark_timestamp_ms,c.delivered_watermark_timestamp_ms)});return d.map(function(a){return a.profile_picture_url})}f.make=a}),null);
__d("MWLSThreadIsUnread.bs",["bs_int64"],(function(a,b,c,d,e,f){"use strict";function a(a,c){return b("bs_int64").compare(a,c)>0}f.isUnread=a}),null);
__d("MWLSThreadTitle.bs",["fbt","bs_caml_array","bs_caml_int64","LSMessagingThreadTypeUtil.bs"],(function(a,b,c,d,e,f,g){"use strict";function h(a){var c=a.length,d=a.length;return(d!==1?d!==0?c===2?g._("{participant1} and {participant2}",[g._param("participant1",b("bs_caml_array").caml_array_get(a,0)),g._param("participant2",b("bs_caml_array").caml_array_get(a,1))]):c===3?g._("{participant1}, {participant2} and {participant3}",[g._param("participant1",b("bs_caml_array").caml_array_get(a,0)),g._param("participant2",b("bs_caml_array").caml_array_get(a,1)),g._param("participant3",b("bs_caml_array").caml_array_get(a,2))]):g._("{participant1}, {participant2} and {others_count} others",[g._param("participant1",b("bs_caml_array").caml_array_get(a,0)),g._param("participant2",b("bs_caml_array").caml_array_get(a,1)),g._param("others_count",String(c-2|0))]):g._("No Participants"):a[0]).toString()}function i(a){var b=a.nickname;if(b!==void 0)return b;else return a.actual_name}function j(a){var b=a.nickname;if(b!==void 0)return b;else return a.name}function a(a,c,d,e){e=b("LSMessagingThreadTypeUtil.bs").isGroup(e);var f=d.filter(function(a){return b("bs_caml_int64").neq(a.contact_id,c)});if(a!==void 0)return a;else if(e)return h(f.map(j));else if(d.length!==1)return h(f.map(i));else return i(d[0])}f.getTitleFromParticipants=h;f.make=a}),null);
__d("MWLSThread.bs",["bs_int64","SkytaleDB","bs_caml_int64","bs_belt_Option","bs_caml_option","MWLSPresence.bs","LSMailboxType.bs","SkytaleDBExec.bs","SkytaleDBQuery.bs","MWLSParticipant.bs","MWLSThreadTitle.bs","LSPresenceStatus.bs","MWLSThreadIsUnread.bs","LSMessageSendStatus.bs","MWLSThreadImageUrls.bs","LSContactBlockedByViewerStatus.bs"],(function(a,b,c,d,e,f){"use strict";function g(a,c,d,e,f){d=b("bs_caml_int64").eq(b("bs_belt_Option").getWithDefault(d,b("LSMessageSendStatus.bs").none),b("LSMessageSendStatus.bs").serverReceived);if(e&&d)return a.filter(function(a){var d=b("bs_int64").to_string(a.contact_id)===f;a=b("bs_int64").compare(a.read_watermark_timestamp_ms,b("bs_belt_Option").getWithDefault(c,b("bs_int64").max_int))>=0;if(d)return!1;else return a});else return[]}function a(a){if(b("bs_caml_int64").eq(a,b("bs_caml_int64").neg_one))return!0;else return b("bs_caml_int64").gt(a,b("bs_caml_int64").of_float(Date.now()))}function c(a,c,d,e){var f=e.a,h=e.c,i=b("MWLSPresence.bs").getInThread(a,d,f);d=b("SkytaleDBExec.bs").toArray(b("MWLSParticipant.bs").getAllInOpenThread(a,c,f));c=d.some(function(a){return b("bs_belt_Option").mapWithDefault(b("bs_caml_option").nullable_to_opt(i.get(b("bs_int64").to_string(a.contact_id))),!1,function(a){return b("bs_caml_int64").eq(a.b,b("LSPresenceStatus.bs").active)})});var j=b("SkytaleDBExec.bs").firstExn(b("SkytaleDBQuery.bs").map(b("SkytaleDB").table(a,"_user_info").asc,function(a){return a.b})),k=d.filter(function(a){return b("bs_caml_int64").neq(a.contact_id,j)}).slice();a=b("SkytaleDBExec.bs").first(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(a,"messages").desc,{hd:f,tl:0}));f=e.d;h=b("MWLSThreadTitle.bs").make(f,j,d,h);var l=b("MWLSThreadIsUnread.bs").isUnread(e.i,e.j),m=b("bs_belt_Option").mapWithDefault(b("bs_belt_Option").map(a,function(a){return a.h}),!1,function(a){return b("bs_caml_int64").eq(a,j)}),n;if(k.length!==1)n=!1;else{var o=k[0];n=k.length===1?b("bs_caml_int64").neq(o.blocked_by_viewer_status,b("LSContactBlockedByViewerStatus.bs").unblocked):!1}return{thread_name:h,custom_thread_name:f,picture_urls:b("MWLSThreadImageUrls.bs").make(d,j,e.f),snippet:e.m,thread_key:e.a,last_activity_timestamp:e.i,mute_until:e.l,is_unread:l,thread_type:e.c,story_ring_state:0,parent_thread_key:e.A,is_typing:!1,folder_name:e.e,custom_badge_type:0,mailbox_type:b("LSMailboxType.bs").messenger,draft_message:void 0,ongoing_call_state:e.u,read_by:g(d,b("bs_belt_Option").map(a,function(a){return a.b}),b("bs_belt_Option").map(a,function(a){return a.l}),m,b("bs_int64").to_string(j)),last_message_sent_by_viewer:m,custom_emoji:e.w,is_blocked:n,is_active:c,snippet_sender_contact_id:e.o,otherParticipants:k}}function d(a,c,d,e){var f=e.a,h=e.l,i=b("MWLSPresence.bs").getInThread(a,d,f);d=b("SkytaleDBExec.bs").toArray(b("MWLSParticipant.bs").getAllInSecureThread(a,c,f));c=d.some(function(a){return b("bs_belt_Option").mapWithDefault(b("bs_caml_option").nullable_to_opt(i.get(b("bs_int64").to_string(a.contact_id))),!1,function(a){return b("bs_caml_int64").eq(a.b,b("LSPresenceStatus.bs").active)})});var j=b("SkytaleDBExec.bs").firstExn(b("SkytaleDBQuery.bs").map(b("SkytaleDB").table(a,"_user_info").asc,function(a){return a.b})),k=d.filter(function(a){return b("bs_int64").to_string(a.contact_id)!==b("bs_int64").to_string(j)}).slice();a=b("SkytaleDBExec.bs").first(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(a,"secure_messages").desc,{hd:f,tl:0}));f=b("MWLSThreadTitle.bs").make(void 0,j,d,h);h=e.c;var l=e.b,m=b("bs_belt_Option").mapWithDefault(b("bs_belt_Option").map(a,function(a){return a.i}),!1,function(a){return b("bs_caml_int64").neq(a,j)}),n;if(k.length!==1)n=!1;else{var o=k[0];n=k.length===1?b("bs_caml_int64").neq(o.blocked_by_viewer_status,b("LSContactBlockedByViewerStatus.bs").unblocked):!1}return{thread_name:f,custom_thread_name:void 0,picture_urls:b("MWLSThreadImageUrls.bs").make(d,j,void 0),snippet:e.f,thread_key:e.a,last_activity_timestamp:l,mute_until:e.e,is_unread:b("bs_int64").compare(l,h)>0,thread_type:e.l,story_ring_state:0,parent_thread_key:b("bs_caml_int64").zero,is_typing:!1,folder_name:"inbox",custom_badge_type:2,mailbox_type:b("LSMailboxType.bs").messenger,draft_message:void 0,ongoing_call_state:b("bs_caml_int64").zero,read_by:g(d,b("bs_belt_Option").map(a,function(a){return a.b}),b("bs_belt_Option").map(a,function(a){return a.k}),m,b("bs_int64").to_string(j)),last_message_sent_by_viewer:m,custom_emoji:void 0,is_blocked:n,is_active:c,snippet_sender_contact_id:e.h,otherParticipants:k}}f.makeOpen=c;f.makeSecure=d;f.getThreadIsMuted=a}),null);
__d("MWLSThreadSnippetForDisplay.bs",["React","CometEmojiTransform","CometEmoticonTransform","CometTextWithEntities.react"],(function(a,b,c,d,e,f){"use strict";var g=b("React"),h=[b("CometEmoticonTransform")(),b("CometEmojiTransform")()],i=/\uDB80\uDC00/;function a(a){if(a===void 0)return null;a=a.replace(i,"(Y)");return g.jsx(b("CometTextWithEntities.react"),{text:a,transforms:h})}f.make=a}),null);
__d("LS.bs",["requireCond","cr:1765388"],(function(a,b,c,d,e,f){"use strict";function a(a){return[a]}c=b("cr:1765388").make;f.result=a;f.make=c}),null);
__d("MWLSPreloadThread.bs",["LS.bs","bs_curry","React","SkytaleDB","JSResource","JSScheduler","promiseDone","LSTransaction.bs","SkytaleDBHook.bs","SkytaleDBQuery.bs","useCometPreloader","LSMailboxMessagesRangeQueryDirection.bs","LSMailboxIssueMessagesRangeQueryStoredProcedure"],(function(a,b,c,d,e,f){"use strict";var g=b("React"),h=b("JSResource")("MWChatTabContainerCommon.bs").__setRef("MWLSPreloadThread.bs");function a(a){var c=b("SkytaleDBHook.bs").useHook(void 0),d=g.useCallback(function(d){b("JSScheduler").scheduleSpeculativeCallback(function(){h.preload()});d=b("LSTransaction.bs").run(c,function(c){return b("SkytaleDBQuery.bs").first(b("SkytaleDBQuery.bs").getKeyRange(b("SkytaleDB").table(c,"messages_ranges_v2__generated").desc,{hd:a,tl:0})).then(function(d){if(d!==void 0&&d.c===d.e)return b("LSMailboxIssueMessagesRangeQueryStoredProcedure")(a,d.b,b("LSMailboxMessagesRangeQueryDirection.bs").before,b("bs_curry")._1(b("LS.bs").make,c))})},"readWrite");b("promiseDone")(d,void 0,void 0)},[c,JSON.stringify(a)]);return b("useCometPreloader")("button",d,d)}f.useHook=a}),null);