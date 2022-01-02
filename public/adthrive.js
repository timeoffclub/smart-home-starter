'use strict';
//custom:bd3bbeb
(function (w, d)
{
	w.adthrive = w.adthrive ||
	{};
	w.adthrive.cmd = w.adthrive.cmd || [];
	w.adthrive.host = "ads.adthrive.com";
	w.adthrive.threshold = 0;
	w.adthrive.deployment = "commit";
	w.adthrive.branch = "bd3bbeb";
	w.adthrive.bucket = "bd3bbeb:ovrd";
	w.adthrive.siteAds = {
		"siteId": "6164a6ff014ece4bc4e34c23",
		"siteName": "Smart Home Starter",
		"targeting": [
		{
			"value": "6164a6ff014ece4bc4e34c23",
			"key": "siteId"
		},
		{
			"value": "Smart Home Starter",
			"key": "siteName"
		},
		{
			"value": "AdThrive Edge",
			"key": "service"
		},
		{
			"value": "on",
			"key": "bidding"
		},
		{
			"value": "v1",
			"key": "dynamicVersion"
		},
		{
			"value": ["Tech", "Home Decor and Design"],
			"key": "verticals"
		}],
		"breakpoints":
		{
			"tablet": 768,
			"desktop": 1024
		},
		"version": "v1",
		"adUnits": [
		{
			"sequence": 1,
			"targeting": [
			{
				"value": ["Sidebar"],
				"key": "location"
			}],
			"devices": ["desktop"],
			"name": "Sidebar_1",
			"sticky": false,
			"location": "Sidebar",
			"dynamic":
			{
				"pageSelector": "",
				"min": 0,
				"spacing": 0,
				"max": 1,
				"lazy": false,
				"lazyMax": null,
				"elementSelector": ".et_pb_extra_column_sidebar > *",
				"skip": 0,
				"classNames": [],
				"position": "afterend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[300, 250],
				[250, 250],
				[300, 600],
				[120, 240],
				[160, 600],
				[300, 1050],
				[336, 280],
				[320, 50],
				[320, 100],
				[1, 1],
				[300, 420],
				[300, 50]
			],
			"priority": 299,
			"autosize": true
		},
		{
			"sequence": 9,
			"targeting": [
			{
				"value": ["Sidebar"],
				"key": "location"
			},
			{
				"value": true,
				"key": "sticky"
			}],
			"devices": ["desktop"],
			"name": "Sidebar_9",
			"sticky": true,
			"location": "Sidebar",
			"dynamic":
			{
				"pageSelector": "",
				"min": 0,
				"spacing": 0,
				"max": 1,
				"lazy": false,
				"lazyMax": null,
				"elementSelector": ".et_pb_extra_column_sidebar",
				"skip": 0,
				"classNames": [],
				"position": "beforeend",
				"every": 1,
				"enabled": true
			},
			"stickyOverlapSelector": "#footer",
			"adSizes": [
				[300, 250],
				[250, 250],
				[300, 600],
				[120, 240],
				[160, 600],
				[300, 1050],
				[336, 280],
				[320, 50],
				[320, 100],
				[1, 1],
				[300, 420],
				[300, 50]
			],
			"priority": 291,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Content"],
				"key": "location"
			}],
			"devices": ["desktop", "tablet", "phone"],
			"name": "Content",
			"sticky": false,
			"location": "Content",
			"dynamic":
			{
				"pageSelector": "body.blog",
				"min": 0,
				"spacing": 0.85,
				"max": 5,
				"lazy": true,
				"lazyMax": 10,
				"elementSelector": ".et_pb_extra_column_main > div:not(.et_pb_section_4):not(.et_pb_section_6)",
				"skip": 0,
				"classNames": [],
				"position": "afterend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[120, 240],
				[250, 250],
				[300, 250],
				[320, 50],
				[320, 100],
				[336, 280],
				[468, 60],
				[728, 90],
				[970, 90],
				[1, 1],
				[300, 300],
				[552, 334],
				[300, 50],
				[728, 250],
				[970, 250],
				[1, 2]
			],
			"priority": 199,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Content"],
				"key": "location"
			}],
			"devices": ["desktop"],
			"name": "Content",
			"sticky": false,
			"location": "Content",
			"dynamic":
			{
				"pageSelector": "body.single",
				"min": 0,
				"spacing": 0.85,
				"max": 5,
				"lazy": true,
				"lazyMax": 10,
				"elementSelector": ".entry-content > p",
				"skip": 5,
				"classNames": [],
				"position": "afterend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[120, 240],
				[250, 250],
				[300, 250],
				[320, 50],
				[320, 100],
				[336, 280],
				[468, 60],
				[728, 90],
				[970, 90],
				[1, 1],
				[300, 300],
				[552, 334],
				[300, 50],
				[728, 250],
				[970, 250],
				[1, 2]
			],
			"priority": 199,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Content"],
				"key": "location"
			}],
			"devices": ["tablet"],
			"name": "Content",
			"sticky": false,
			"location": "Content",
			"dynamic":
			{
				"pageSelector": "body.single",
				"min": 0,
				"spacing": 0.6,
				"max": 8,
				"lazy": true,
				"lazyMax": 7,
				"elementSelector": ".entry-content > p",
				"skip": 3,
				"classNames": [],
				"position": "afterend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[120, 240],
				[250, 250],
				[300, 250],
				[320, 50],
				[320, 100],
				[336, 280],
				[468, 60],
				[728, 90],
				[970, 90],
				[1, 1],
				[300, 300],
				[552, 334],
				[300, 50],
				[728, 250],
				[970, 250],
				[1, 2]
			],
			"priority": 199,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Content"],
				"key": "location"
			}],
			"devices": ["phone"],
			"name": "Content",
			"sticky": false,
			"location": "Content",
			"dynamic":
			{
				"pageSelector": "body.single",
				"min": 0,
				"spacing": 0.85,
				"max": 5,
				"lazy": true,
				"lazyMax": 10,
				"elementSelector": ".entry-content > p",
				"skip": 1,
				"classNames": [],
				"position": "afterend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[120, 240],
				[250, 250],
				[300, 250],
				[320, 50],
				[320, 100],
				[336, 280],
				[468, 60],
				[728, 90],
				[970, 90],
				[1, 1],
				[300, 300],
				[552, 334],
				[300, 50],
				[728, 250],
				[970, 250],
				[1, 2]
			],
			"priority": 199,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Below Post"],
				"key": "location"
			}],
			"devices": ["desktop", "tablet", "phone"],
			"name": "Below_Post",
			"sticky": false,
			"location": "Below Post",
			"dynamic":
			{
				"pageSelector": "body.single",
				"min": 0,
				"spacing": 0,
				"max": 0,
				"lazy": true,
				"lazyMax": 1,
				"elementSelector": ".entry-content",
				"skip": 0,
				"classNames": [],
				"position": "beforeend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[120, 240],
				[250, 250],
				[300, 250],
				[320, 50],
				[320, 100],
				[336, 280],
				[468, 60],
				[728, 90],
				[1, 1]
			],
			"priority": 99,
			"autosize": true
		},
		{
			"sequence": null,
			"targeting": [
			{
				"value": ["Footer"],
				"key": "location"
			},
			{
				"value": true,
				"key": "sticky"
			}],
			"devices": ["desktop", "tablet", "phone"],
			"name": "Footer",
			"sticky": true,
			"location": "Footer",
			"dynamic":
			{
				"pageSelector": "",
				"min": 0,
				"spacing": 0,
				"max": 1,
				"lazy": false,
				"lazyMax": null,
				"elementSelector": "body",
				"skip": 0,
				"classNames": [],
				"position": "beforeend",
				"every": 1,
				"enabled": true
			},
			"adSizes": [
				[320, 50],
				[320, 100],
				[728, 90],
				[970, 90],
				[468, 60],
				[1, 1],
				[300, 50]
			],
			"priority": -1,
			"autosize": true
		}],
		"videoPlayers":
		{
			"contextual":
			{
				"autoplayCollapsibleEnabled": false,
				"defaultPlayerType": "static",
				"overrideEmbedLocation": false
			},
			"videoEmbed": "wordpress",
			"footerSelector": "",
			"jwPlayer":
			{
				"apiSecret": "Af44kh95f6oaW0lvHAB0oNk9",
				"apiKey": "8FMBkqI8",
				"propertyId": "8a51563c-38f2-11ec-9ed6-a29240165d91",
				"enabled": true
			},
			"players": [
			{
				"playlistId": "",
				"pageSelector": "",
				"devices": ["mobile", "desktop"],
				"mobileLocation": null,
				"description": "",
				"skip": 0,
				"title": "",
				"type": "stationaryRelated",
				"enabled": true,
				"elementSelector": "",
				"id": 4076943,
				"position": "",
				"saveVideoCloseState": false,
				"shuffle": false,
				"playerId": "g1p6Xrze",
				"isCompleted": true
			},
			{
				"playlistId": "sdldoeuj",
				"pageSelector": "body.single",
				"devices": ["desktop", "mobile"],
				"mobileLocation": "bottom-right",
				"description": "",
				"skip": 3,
				"title": "",
				"type": "stickyPlaylist",
				"enabled": true,
				"elementSelector": ".entry-content > p",
				"id": 4076944,
				"position": "afterend",
				"saveVideoCloseState": false,
				"shuffle": false,
				"playerId": "CDuycBz7",
				"isCompleted": true
			}]
		},
		"adTypes":
		{
			"nativeMobileRecipe": true,
			"expandableFooter": true,
			"nativeDesktopSidebar": true,
			"nativeDesktopContent": true,
			"outstreamDesktop": true,
			"interscroller": true,
			"miniscroller": true,
			"nativeDesktopRecipe": true,
			"outstreamMobile": true,
			"animatedFooter": true,
			"nativeMobileContent": true
		},
		"adOptions":
		{
			"theTradeDesk": true,
			"verizon": true,
			"undertone": true,
			"concert": false,
			"footerCloseButton": true,
			"teads": true,
			"pmp": true,
			"districtM": true,
			"thirtyThreeAcross": true,
			"removeVideoTitleWrapper": true,
			"pubMatic": true,
			"roundel": true,
			"infiniteScroll": false,
			"sonobi": true,
			"yieldmo": true,
			"footerSelector": "",
			"amazonUAM": true,
			"gamMCMEnabled": true,
			"gamMCMChildNetworkCode": "22633528170",
			"stickyContainerAds": false,
			"rubicon": true,
			"conversant": false,
			"deepIntent": true,
			"openx": true,
			"mobileHeaderHeight": 1,
			"unruly": true,
			"mediaGrid": true,
			"bRealTime": true,
			"gumgum": true,
			"comscoreFooter": true,
			"desktopInterstitial": false,
			"footerCloseButtonDesktop": false,
			"isAutoOptimized": false,
			"comscoreTAL": true,
			"brightroll": true,
			"targetaff": false,
			"advancePlaylistOptions":
			{
				"playlistPlayer":
				{
					"enabled": true
				},
				"relatedPlayer":
				{
					"applyToFirst": true,
					"enabled": true
				}
			},
			"kargo": true,
			"liveRampATS": true,
			"footerCloseButtonMobile": false,
			"allowSmallerAdSizes": true,
			"comscore": "Tech",
			"mobileInterstitial": false,
			"tripleLift": true,
			"sovrn": true,
			"sensitiveCategories": ["alc", "ast", "cbd", "conl", "cosm", "dat", "dlu", "drg", "gamc", "gamv", "grq", "pol", "rel", "sst", "srh", "ske", "tob", "wtl"],
			"liveRamp": true,
			"mobileInterstitialBlockedPageSelectors": "",
			"adthriveEmailIdentity": true,
			"criteo": true,
			"nativo": true,
			"infiniteScrollOptions":
			{
				"selector": "",
				"heightThreshold": 0
			},
			"clsOptimizedAds": true,
			"padsquad": true,
			"verticals": ["Tech", "Home Decor and Design"],
			"inImage": false,
			"advancePlaylist": true,
			"delayLoading": true,
			"inImageZone": null,
			"appNexus": true,
			"liveRampId": "",
			"infiniteScrollRefresh": false,
			"indexExchange": true,
			"stickyOutstream":
			{
				"mobile":
				{
					"enabled": true
				},
				"desktop":
				{
					"enabled": true
				}
			}
		},
		"video":
		{
			"partners":
			{
				"roundel": true,
				"oneVideo": true,
				"mediaGrid": true,
				"gumgum": true,
				"telaria": true,
				"districtM": true,
				"amazonUAM": true,
				"stickyOutstream":
				{
					"mobile":
					{
						"enabled": true
					},
					"blockedPageSelectors": "",
					"desktop":
					{
						"enabled": true
					}
				},
				"rubicon": true,
				"appNexus": true,
				"conversant": false,
				"tripleLift": true,
				"openx": true,
				"pubMatic": true,
				"spotx": true,
				"indexExchange": true
			}
		},
		"adDensityLayout":
		{
			"mobile":
			{
				"adDensity": 0.3,
				"onePerViewport": false
			},
			"pageOverrides": [],
			"desktop":
			{
				"adDensity": 0.3,
				"onePerViewport": false
			}
		}
	};
	w.adthrive.marmalade = {
		"page": [
		{
			"campaigns": []
		}],
		"host": [
		{
			"ias":
			{
				"bs": "high",
				"sam": "high"
			},
			"site_codes": ["TRGT_022020"],
			"segments":
			{
				"f18_34": false,
				"f18_49": false,
				"f25_54": false
			},
			"uas": false,
			"verticals": ["Tech", "Home Decor and Design"]
		}],
		"adViewability": [
		{
			"width": [850, 1023],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.676,
				"Content_4": 0.494,
				"Content_5": 0.455,
				"Content_2": 0.646,
				"Content_3": 0.574,
				"Content_1": 0.646,
				"Content_8": 0.373,
				"Content_6": 0.387,
				"Content_7": 0.387,
				"Footer_1": 0.918
			}
		},
		{
			"width": [1024, 1199],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.681,
				"Content_4": 0.49,
				"Content_5": 0.458,
				"Content_2": 0.646,
				"Content_3": 0.565,
				"Content_1": 0.683,
				"Sidebar_1": 0.301,
				"Footer_1": 0.914,
				"Sidebar_9": 0.544,
				"Content": 0.786,
				"Content_8": 0.763,
				"Video_StickyOutstream_1": 0.829,
				"Content_9": 0.826,
				"Content_6": 0.772,
				"Content_7": 0.753
			}
		},
		{
			"width": [400, 767],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.576,
				"Content_4": 0.519,
				"Content_5": 0.423,
				"Content_2": 0.687,
				"Content_3": 0.626,
				"Content_1": 0.722,
				"Footer_1": 0.887,
				"Content": 0.699,
				"Content_8": 0.701,
				"Video_StickyOutstream_1": 0.926,
				"Content_9": 0.701,
				"Content_6": 0.702,
				"Content_7": 0.699
			}
		},
		{
			"width": [1200, 1499],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.616,
				"Content_4": 0.464,
				"Content_5": 0.418,
				"Content_2": 0.605,
				"Content_3": 0.52,
				"Content_1": 0.665,
				"Sidebar_1": 0.378,
				"Footer_1": 0.946,
				"Sidebar_9": 0.903,
				"Content": 0.727,
				"Content_8": 0.74,
				"Video_StickyOutstream_1": 0.823,
				"Content_9": 0.718,
				"Content_6": 0.731,
				"Content_7": 0.74
			}
		},
		{
			"width": [350, 399],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.592,
				"Content_4": 0.518,
				"Content_5": 0.439,
				"Content_2": 0.678,
				"Content_3": 0.635,
				"Content_1": 0.725,
				"Footer_1": 0.892,
				"Content": 0.712,
				"Content_8": 0.719,
				"Video_StickyOutstream_1": 0.947,
				"Content_9": 0.704,
				"Content_6": 0.714,
				"Content_7": 0.713
			}
		},
		{
			"width": [768, 849],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.694,
				"Content_4": 0.559,
				"Content_5": 0.512,
				"Content_2": 0.721,
				"Content_3": 0.644,
				"Content_1": 0.77,
				"Content": 0.775,
				"Content_8": 0.331,
				"Content_9": 0.683,
				"Content_6": 0.443,
				"Footer_1": 0.905,
				"Content_7": 0.395
			}
		},
		{
			"width": [768, 849],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.697,
				"Content_4": 0.563,
				"Content_5": 0.524,
				"Content_2": 0.718,
				"Content_3": 0.647,
				"Content_1": 0.757,
				"Content_9": 0.682,
				"Content_6": 0.444,
				"Content_7": 0.393,
				"Footer_1": 0.912
			}
		},
		{
			"width": [1800, null],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.653,
				"Content_4": 0.535,
				"Sidebar_9": 0.918,
				"Content_5": 0.491,
				"Content_2": 0.666,
				"Content_3": 0.586,
				"Content_1": 0.752,
				"Sidebar_1": 0.408,
				"Content_6": 0.731,
				"Footer_1": 0.946
			}
		},
		{
			"width": [850, 1023],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.679,
				"Content_4": 0.493,
				"Content_5": 0.452,
				"Content_2": 0.645,
				"Content_3": 0.573,
				"Content_1": 0.65,
				"Content": 0.657,
				"Content_8": 0.373,
				"Content_9": 0.679,
				"Content_6": 0.384,
				"Footer_1": 0.92,
				"Content_7": 0.387
			}
		},
		{
			"width": [0, 349],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.657,
				"Content_4": 0.501,
				"Content_5": 0.434,
				"Content_2": 0.66,
				"Content_3": 0.596,
				"Content_1": 0.727,
				"Content": 0.76,
				"Content_8": 0.755,
				"Content_9": 0.756,
				"Content_6": 0.739,
				"Footer_1": 0.895,
				"Content_7": 0.77
			}
		},
		{
			"width": [1500, 1799],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.641,
				"Content_4": 0.499,
				"Sidebar_9": 0.903,
				"Content_5": 0.443,
				"Content_2": 0.632,
				"Content_3": 0.546,
				"Content_1": 0.704,
				"Sidebar_1": 0.396,
				"Content_6": 0.736,
				"Footer_1": 0.942
			}
		},
		{
			"width": [400, 767],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.589,
				"Content_4": 0.527,
				"Content_5": 0.435,
				"Content_2": 0.682,
				"Content_3": 0.624,
				"Content_1": 0.693,
				"Content_8": 0.698,
				"Content_9": 0.701,
				"Content_6": 0.704,
				"Content_7": 0.699,
				"Footer_1": 0.917
			}
		},
		{
			"width": [1200, 1499],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.624,
				"Content_4": 0.48,
				"Content_5": 0.435,
				"Content_2": 0.621,
				"Content_3": 0.551,
				"Content_1": 0.705,
				"Sidebar_1": 0.416,
				"Footer_1": 0.924,
				"Sidebar_9": 0.891,
				"Content": 0.728,
				"Content_8": 0.737,
				"Video_StickyOutstream_1": 0.827,
				"Content_9": 0.712,
				"Content_6": 0.724,
				"Content_7": 0.74
			}
		},
		{
			"width": [1024, 1199],
			"speed": "0",
			"adUnits":
			{
				"Below_Post_1": 0.67,
				"Content_4": 0.502,
				"Content_5": 0.456,
				"Content_2": 0.639,
				"Content_3": 0.572,
				"Content_1": 0.697,
				"Sidebar_1": 0.276,
				"Footer_1": 0.891,
				"Sidebar_9": 0.468,
				"Content": 0.786,
				"Content_8": 0.763,
				"Video_StickyOutstream_1": 0.83,
				"Content_9": 0.825,
				"Content_6": 0.773,
				"Content_7": 0.762
			}
		},
		{
			"width": [1800, null],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.644,
				"Content_4": 0.53,
				"Content_5": 0.477,
				"Content_2": 0.66,
				"Content_3": 0.572,
				"Content_1": 0.735,
				"Sidebar_1": 0.422,
				"Footer_1": 0.952,
				"Sidebar_9": 0.921,
				"Content": 0.769,
				"Content_8": 0.746,
				"Video_StickyOutstream_1": 0.958,
				"Content_9": 0.781,
				"Content_6": 0.717,
				"Content_7": 0.731
			}
		},
		{
			"width": [1500, 1799],
			"speed": "1",
			"adUnits":
			{
				"Below_Post_1": 0.642,
				"Content_4": 0.509,
				"Content_5": 0.438,
				"Content_2": 0.635,
				"Content_3": 0.552,
				"Content_1": 0.719,
				"Sidebar_1": 0.386,
				"Footer_1": 0.95,
				"Sidebar_9": 0.911,
				"Content": 0.657,
				"Content_8": 0.726,
				"Video_StickyOutstream_1": 0.76,
				"Content_9": 0.709,
				"Content_6": 0.731,
				"Content_7": 0.73
			}
		},
		{
			"width": [350, 399],
			"speed": "1",
			"adUnits":
			{
				"Content_4": 0.523,
				"Footer_1": 0.914
			}
		}],
		"hostname": "smarthomestarter.com",
		"pathname": "/how-does-hue-sync-work"
	};
	w.adthrive.styleUrl = 'https://' + w.adthrive.host + '/sites/6164a6ff014ece4bc4e34c23/ads.min.css';
	w.adthrive.baseUrl = 'https://' + w.adthrive.host + '/builds/core/bd3bbeb';

	//sitejstemplate
	var cls_site_insertion = function (t)
	{
		"use strict";
		var e = function (t, i)
		{
			return (e = Object.setPrototypeOf ||
				{
					__proto__: []
				}
				instanceof Array && function (t, e)
				{
					t.__proto__ = e
				} || function (t, e)
				{
					for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
				})(t, i)
		};
		var i = function ()
		{
			return (i = Object.assign || function (t)
			{
				for (var e, i = 1, n = arguments.length; i < n; i++)
					for (var o in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
				return t
			}).apply(this, arguments)
		};

		function n(t)
		{
			var e = "function" == typeof Symbol && Symbol.iterator,
				i = e && t[e],
				n = 0;
			if (i) return i.call(t);
			if (t && "number" == typeof t.length) return {
				next: function ()
				{
					return t && n >= t.length && (t = void 0),
					{
						value: t && t[n++],
						done: !t
					}
				}
			};
			throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
		}

		function o(t, e)
		{
			var i = "function" == typeof Symbol && t[Symbol.iterator];
			if (!i) return t;
			var n, o, r = i.call(t),
				a = [];
			try
			{
				for (;
					(void 0 === e || e-- > 0) && !(n = r.next()).done;) a.push(n.value)
			}
			catch (t)
			{
				o = {
					error: t
				}
			}
			finally
			{
				try
				{
					n && !n.done && (i = r.return) && i.call(r)
				}
				finally
				{
					if (o) throw o.error
				}
			}
			return a
		}

		function r()
		{
			for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(o(arguments[e]));
			return t
		}
		var a, s = function (t, e)
			{
				return null == t || t != t ? e : t
			},
			l = function (t)
			{
				var e = t.offsetHeight,
					i = t.offsetWidth,
					n = t.getBoundingClientRect(),
					o = document.body,
					r = document.documentElement,
					a = window.pageYOffset || r.scrollTop || o.scrollTop,
					s = window.pageXOffset || r.scrollLeft || o.scrollLeft,
					l = r.clientTop || o.clientTop || 0,
					d = r.clientLeft || o.clientLeft || 0,
					c = Math.round(n.top + a - l),
					h = Math.round(n.left + s - d);
				return {
					top: c,
					left: h,
					bottom: c + e,
					right: h + i,
					width: i,
					height: e
				}
			},
			d = new Set([]),
			c = function (t)
			{
				var e = window.location.href;
				return t.some((function (t)
				{
					return new RegExp(t, "i").test(e)
				}))
			},
			h = function (t)
			{
				try
				{
					return {
						valid: !0,
						elements: document.querySelectorAll(t)
					}
				}
				catch (t)
				{
					return i(
					{
						valid: !1
					}, t)
				}
			},
			u = function (t)
			{
				return "" === t ?
				{
					valid: !0
				} : h(t)
			},
			p = function ()
			{
				function t()
				{}
				return t.getScrollTop = function ()
				{
					return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
				}, t.shufflePlaylist = function (t)
				{
					for (var e, i, n = t.length; 0 !== n;) i = Math.floor(Math.random() * t.length), e = t[n -= 1], t[n] = t[i], t[i] = e;
					return t
				}, t.getPlacementElement = function (t)
				{
					var e = u(t.pageSelector),
						i = h(t.elementSelector);
					return e.valid ? t.pageSelector && !e.elements.length ? null : i.valid && i.elements.length > t.skip ? i.elements[t.skip] : null : null
				}, t.createQueryString = function (t)
				{
					return Object.keys(t).map((function (e)
					{
						return e + "=" + t[e]
					})).join("&")
				}, t.createEncodedQueryString = function (t)
				{
					return Object.keys(t).map((function (e)
					{
						return e + "=" + encodeURIComponent(t[e])
					})).join("&")
				}, t
			}(),
			y = function (t)
			{
				this.video = t
			},
			f = function ()
			{
				function t(t)
				{
					var e = this;
					this._adthriveCLS = t, this.removeVideoTitleWrapper = s(this._adthriveCLS.siteAds.adOptions.removeVideoTitleWrapper, !1);
					var i = t.siteAds.videoPlayers;
					this.footerSelector = s(i && i.footerSelector, ""), this.players = s(i && i.players.map((function (t)
					{
						return t.mobileLocation = e._setMobileLocation(t.mobileLocation), t
					})), []), this.contextualSettings = i && i.contextual
				}
				return t.prototype._setMobileLocation = function (t)
				{
					return "top-left" === (t = t || "bottom-right") ? t = "adthrive-collapse-top-left" : "top-right" === t ? t = "adthrive-collapse-top-right" : "bottom-left" === t ? t = "adthrive-collapse-bottom-left" : "bottom-right" === t && (t = "adthrive-collapse-bottom-right"), t
				}, t
			}(),
			m = function (t)
			{
				this._adthriveCLS = t, this.mobileStickyPlayerOnPage = !1, this.playlistPlayerAdded = !1, this.contextualPlayerAdded = !1, this.sekindoPlayerAdded = !1, this.footerSelector = "", this.removeVideoTitleWrapper = !1, this.videoAdOptions = new f(this._adthriveCLS), this.players = this.videoAdOptions.players, this.contextualSettings = this.videoAdOptions.contextualSettings, this.removeVideoTitleWrapper = this.videoAdOptions.removeVideoTitleWrapper, this.footerSelector = this.videoAdOptions.footerSelector
			};
		! function (t)
		{
			t.Desktop = "desktop", t.Mobile = "mobile"
		}(a || (a = {}));
		var v, _, g = function ()
			{
				function t(t, e)
				{
					this.adthriveCLS = t, this.targetDensityExperiment = e, this._totalContentInserted = 0, this._recipeCount = 0, this._mainContentHeight = 0, this._mainContentDiv = null, this._firstContentDiv = null, this._totalAvailableElements = 0, this._minDivHeight = 250, this._densityDevice = a.Desktop, this._pubLog = {
						onePerViewport: !1,
						targetDensity: 0,
						targetDensityUnits: 0,
						combinedMax: 0
					}, this._infPageEndOffset = 0, this.locationMaxLazySequence = new Map([
						["Recipe", 5],
						["Below_Post", 1]
					]), this._supportedSizes = [
						[728, 90],
						[300, 250],
						[300, 600],
						[320, 50],
						[970, 250],
						[160, 600],
						[300, 1050],
						[336, 280],
						[970, 90],
						[300, 50],
						[320, 100],
						[468, 60],
						[250, 250],
						[120, 240],
						[1, 1],
						[300, 300],
						[552, 334],
						[300, 420],
						[728, 250],
						[320, 300],
						[300, 390]
					], this.locationToMinHeight = {
						Content: "250px",
						Recipe: "250px"
					}, this._adUnitAuctionPriorityMap = new Map([
						["Footer", 1],
						["Header", 2],
						["Sidebar", 3],
						["Content", 4],
						["Recipe", 5],
						["Sidebar_sticky", 6],
						["Below Post", 7]
					]);
					var i = this.adthriveCLS.siteAds.breakpoints,
						n = i.tablet,
						o = i.desktop;
					this._device = function (t, e)
					{
						var i = window.innerWidth;
						return i >= e ? "desktop" : i >= t ? "tablet" : "phone"
					}(n, o)
				}
				return t.prototype.start = function ()
				{
					var t = this;
					! function (t)
					{
						var e = document.body,
							i = "adthrive-device-" + t;
						if (!e.classList.contains(i)) try
						{
							e.classList.add(i)
						}
						catch (t)
						{
							document.createElement("_")
						}
					}(this._device);
					var e = this.get().filter((function (e)
						{
							return t._locationEnabled(e)
						})).filter((function (e)
						{
							return t._forDevice(e, t._device)
						})).filter((function (e)
						{
							return t._forPage(e)
						})),
						i = this.inject(e);
					this.adthriveCLS.injectedSlots = this.adthriveCLS.injectedSlots.concat(i)
				}, t.prototype.inject = function (t, e)
				{
					void 0 === e && (e = document);
					var i = this.targetDensityExperiment.result,
						n = t.filter((function (t)
						{
							return i ? "Content" !== t.location : t
						})),
						o = t.filter((function (t)
						{
							return i ? "Content" === t.location : null
						}));
					return r(n.length ? this._injectNonDensitySlots(n, e) : [], o.length ? this._injectDensitySlots(o, e) : [])
				}, t.prototype._injectNonDensitySlots = function (t, e)
				{
					var i, o, a = this;
					void 0 === e && (e = document);
					var s = [],
						d = [];
					try
					{
						for (var c = n(t), h = c.next(); !h.done; h = c.next())
						{
							var u = h.value,
								p = 0,
								y = 0,
								f = 0;
							u.spacing > 0 && (y = p = window.innerHeight * u.spacing);
							var m = this._repeatDynamicAds(u),
								v = this.getElements(u.elementSelector, e);
							u.skip;
							for (var _ = u.skip; _ < v.length && !(f + 1 > m.length); _ += u.every)
							{
								var g = v[_];
								if (p > 0)
								{
									var S = l(g).bottom;
									if (S <= y) continue;
									y = S + p
								}
								var C = _ < v.length - 1 ? 1 : Math.max(u.min - f, 1);
								C > 1 && (p = 0);
								for (var b = function ()
									{
										var t = m[f],
											i = t.location + "_" + t.sequence;
										if (s.some((function (t)
											{
												return t.name === i
											}))) return f += 1, "continue";
										var n = P.getDynamicElementId(t),
											o = "adthrive-" + u.location.replace("_", "-").toLowerCase(),
											a = r([o, o + "-" + u.sequence], u.classNames),
											l = P.addAd(g, n, u.position, a);
										if (l)
										{
											var c = P.filterAdUnitSizes(t, l);
											if (c.length)
											{
												var h = {
													clsDynamicAd: u,
													dynamicAd: t,
													element: l,
													sizes: c,
													name: i,
													infinite: e !== document
												};
												s.push(h), d.push(
												{
													location: t.location,
													element: l
												}), "Recipe" === u.location && ++P._recipeCount, f += 1
											}
											g = l
										}
									}, P = this; C > 0; C--) b()
							}
						}
					}
					catch (t)
					{
						i = {
							error: t
						}
					}
					finally
					{
						try
						{
							h && !h.done && (o = c.return) && o.call(c)
						}
						finally
						{
							if (i) throw i.error
						}
					}
					return d.forEach((function (t)
					{
						var e = t.location;
						t.element.style.minHeight = a.locationToMinHeight[e]
					})), s
				}, t.prototype._injectDensitySlots = function (t, e)
				{
					var i, o, s = this;
					void 0 === e && (e = document);
					try
					{
						this._calculateMainContentHeightAndAllElements(t)
					}
					catch (t)
					{
						return []
					}
					this._densityDevice = "desktop" === this._device ? a.Desktop : a.Mobile;
					var l = [],
						d = this._getDensitySettings(),
						c = d.adDensity,
						h = d.onePerViewport,
						u = this._getTargetDensityUnits(c),
						p = this._getCombinedMax(t),
						y = Math.min.apply(Math, r([this._totalAvailableElements, u], p > 0 ? [p] : []));
					if (!y) return [];
					var f = 0,
						m = 0;
					this._pubLog = {
						onePerViewport: h,
						targetDensity: c,
						targetDensityUnits: u,
						combinedMax: p
					};
					var v = function (t)
						{
							var i = _.getElements(t.elementSelector, e),
								n = _._getInsertEvery(y, h);
							_._logDensityInfo(i, t.elementSelector, n);
							var o = function (i)
							{
								var o, r, a = null;
								o = s._attemptInsertion(
								{
									dynamicAd: t,
									element: i,
									insertNext: m,
									onePerViewport: h,
									contentInsertedThisPage: f,
									target: e,
									insertEvery: n
								}), m = o.insertNext, r = o.slot, a = o.adElement, r && a && (l.push(r), ++f, a.style.minHeight = s.locationToMinHeight[t.location])
							};
							t.skip;
							for (var r = t.skip; r < i.length; r++)
							{
								var a = i[r];
								if (!(a.offsetHeight >= _._mainContentHeight && _._totalAvailableElements > 1))
								{
									if (!(f < p && f < u)) break;
									o(a)
								}
							}
						},
						_ = this;
					try
					{
						for (var g = n(t), S = g.next(); !S.done; S = g.next())
						{
							v(S.value)
						}
					}
					catch (t)
					{
						i = {
							error: t
						}
					}
					finally
					{
						try
						{
							S && !S.done && (o = g.return) && o.call(g)
						}
						finally
						{
							if (i) throw i.error
						}
					}
					return l
				}, t.prototype._getInsertEvery = function (t, e)
				{
					var i = .43 * this._mainContentHeight / t;
					return e && window.innerHeight > i ? window.innerHeight : i
				}, t.prototype._getDensitySettings = function ()
				{
					var t = this.adthriveCLS.siteAds.adDensityLayout,
						e = this._determineOverrides(t.pageOverrides);
					return e.length ? e[0] : t[this._densityDevice]
				}, t.prototype._determineOverrides = function (t)
				{
					var e = this;
					return t.filter((function (t)
					{
						var e = u(t.pageSelector);
						return "" === t.pageSelector || e.elements && e.elements.length
					})).map((function (t)
					{
						return t[e._densityDevice]
					}))
				}, t.prototype._getTargetDensityUnits = function (t)
				{
					return Math.floor(t * this._mainContentHeight / (1 - t) / this._minDivHeight) - this._recipeCount
				}, t.prototype._getCombinedMax = function (t)
				{
					return t.map((function (t)
					{
						return t.max + (t.lazyMaxDefaulted ? 0 : t.lazyMax)
					})).sort((function (t, e)
					{
						return e - t
					}))[0]
				}, t.prototype._logDensityInfo = function (t, e, i)
				{
					var n = this._pubLog,
						o = n.onePerViewport,
						r = n.targetDensity,
						a = n.targetDensityUnits,
						s = n.combinedMax;
					this._totalAvailableElements, this.adthriveCLS.targetDensityLog = {
						onePerViewport: o,
						combinedMax: s,
						targetDensityUnits: a,
						targetDensityPercentage: r,
						mainContentHeight: this._mainContentHeight,
						recipeCount: this._recipeCount,
						numberOfEls: t.length
					}
				}, t.prototype._attemptInsertion = function (t)
				{
					var e, n = t.dynamicAd,
						o = t.element,
						r = t.insertNext,
						a = t.onePerViewport,
						s = t.contentInsertedThisPage,
						l = t.target,
						d = t.insertEvery,
						c = null,
						h = null;
					if (this._isElementSpacedCorrectly(o, r, a, n))
					{
						var u = i(i(
						{}, n),
						{
							sequence: this._totalContentInserted + 1,
							lazy: n.lazy && s >= Math.max(n.min, n.max)
						});
						c = (e = this._addContentAd(o, n, u, l, d)).insertedSlot, r = e.insertNext, h = e.adElement
					}
					return {
						insertNext: r,
						slot: c,
						adElement: h
					}
				}, t.prototype._isElementSpacedCorrectly = function (t, e, i, n)
				{
					var o = "beforebegin" === n.position || "beforeend" === n.position,
						r = this._isElementFarEnough(i, t, e, n),
						a = this._isElementNotInRow(t, o);
					return r && a
				}, t.prototype._isElementFarEnough = function (t, e, i, n)
				{
					var o = l(e);
					return ("beforebegin" === n.position || "afterbegin" === n.position ? o.top : o.bottom) > i
				}, t.prototype._isElementNotInRow = function (t, e)
				{
					var i = t.previousElementSibling,
						n = t.nextElementSibling,
						o = e ? !i && n || i && t.tagName !== i.tagName ? n : i : n;
					return !o || t.getBoundingClientRect().top !== o.getBoundingClientRect().top
				}, t.prototype._calculateMainContentHeightAndAllElements = function (t)
				{
					var e = this._setMainContentAndElements(t),
						i = e.mainContentDiv,
						n = e.firstContentDiv;
					this._mainContentDiv = i, this._firstContentDiv = n;
					var o = this._mainContentDiv.querySelector("div #comments, section .comments");
					this._mainContentHeight = o ? this._mainContentDiv.offsetHeight - o.offsetHeight : this._mainContentDiv.offsetHeight
				}, t.prototype._setMainContentAndElements = function (t)
				{
					var e = this._getPotentialElements(t);
					if (0 === e.length) throw Error("No Main Content Elements Found");
					return {
						mainContentDiv: Array.from(e).reduce((function (t, e)
						{
							return e.offsetHeight > t.offsetHeight ? e : t
						})) || document.body,
						firstContentDiv: Array.from(e).reduce((function (t, e)
						{
							return l(e).top < l(t).top ? e : t
						}))
					}
				}, t.prototype._getPotentialElements = function (t)
				{
					var e = this,
						i = this._attemptArticleLookup(),
						n = i ? [i] : [];
					return t.forEach((function (t)
					{
						return e._getSelectors(t.elementSelector).forEach((function (t)
						{
							for (var i = document.querySelectorAll(t), o = 0; o < i.length; o++) i[o] && i[o].parentElement && i[o].parentElement !== document.body ? n.push(i[o].parentElement) : n.push(i[o]), ++e._totalAvailableElements
						}))
					})), n
				}, t.prototype._attemptArticleLookup = function ()
				{
					var t = document.querySelectorAll("article");
					if (0 === t.length) return null;
					var e = Array.from(t).reduce((function (t, e)
					{
						return e.offsetHeight > t.offsetHeight ? e : t
					}));
					return e && e.offsetHeight > 1.5 * window.innerHeight ? e : null
				}, t.prototype._getSelectors = function (t)
				{
					return t.indexOf(",") > -1 ? t.split(",") : [t]
				}, t.prototype._addContentAd = function (t, e, i, n, o)
				{
					void 0 === n && (n = document);
					var r = null,
						a = "adthrive-" + e.location.replace("_", "-").toLowerCase(),
						s = a + "-" + e.sequence,
						l = this.addAd(t, this.getDynamicElementId(i), i.position, [a, s, "adthrive-density-calculation"]),
						d = this._getNextInsertPosition(i.position, l, o);
					if (l)
					{
						var c = this.filterAdUnitSizes(i, l);
						if (c.length) r = {
							clsDynamicAd: e,
							dynamicAd: i,
							element: l,
							sizes: c,
							name: i.location + "_" + i.sequence,
							infinite: n !== document
						}, ++this._totalContentInserted
					}
					return {
						insertedSlot: r,
						insertNext: d,
						adElement: l
					}
				}, t.prototype._getNextInsertPosition = function (t, e, i)
				{
					var n = e.getBoundingClientRect(),
						o = window.pageYOffset;
					return this._infPageEndOffset && e.offsetTop < this._mainContentHeight && (o -= this._infPageEndOffset), ("beforebegin" === t || "afterbegin" === t ? n.top : n.bottom) + o + i + this._minDivHeight
				}, t.prototype.getDynamicElementId = function (t)
				{
					return "AdThrive_" + t.location + "_" + t.sequence + "_" + this._device
				}, t.prototype.getElements = function (t, e)
				{
					return void 0 === e && (e = document), e.querySelectorAll(t)
				}, t.prototype.addAd = function (t, e, i, n)
				{
					if (void 0 === n && (n = []), !document.getElementById(e))
					{
						var o = '<div id="' + e + '" class="adthrive-ad ' + n.join(" ") + '"></div>';
						t.insertAdjacentHTML(i, o)
					}
					return document.getElementById(e)
				}, t.prototype._repeatDynamicAds = function (t)
				{
					for (var e = [], n = t.lazy ? s(this.locationMaxLazySequence.get(t.location), 0) : 0, o = Math.max(t.min, t.max), r = 0 === n && t.lazy ? o + t.lazyMax : Math.min(Math.max(n - t.sequence + 1, 0), o + t.lazyMax), a = Math.max(o, r), l = 0; l < a; l++)
					{
						var d = t.sequence + l,
							c = t.lazy && l >= o;
						e.push(i(i(
						{}, t),
						{
							sequence: d,
							lazy: c
						}))
					}
					return e
				}, t.prototype.get = function ()
				{
					var t = this;
					return this.adthriveCLS.siteAds.adUnits.filter((function (t)
					{
						return void 0 !== t.dynamic && t.dynamic.enabled
					})).map((function (e)
					{
						var i = e.location.replace(/\s+/g, "_");
						return {
							auctionPriority: t._adUnitAuctionPriorityMap.get(i) || 8,
							location: i,
							sequence: s(e.sequence, 1),
							sizes: t.onlySupportedAdSizes(e.adSizes).filter((function (i)
							{
								return t.excludeTallSizeFromFooter(e.location, i)
							})),
							devices: e.devices,
							pageSelector: s(e.dynamic.pageSelector, "").trim(),
							elementSelector: s(e.dynamic.elementSelector, "").trim(),
							position: s(e.dynamic.position, "beforebegin"),
							min: Math.floor(s(e.dynamic.min, 0)),
							max: Math.floor(s(e.dynamic.max, 0)),
							spacing: s(e.dynamic.spacing, 0),
							skip: Math.floor(s(e.dynamic.skip, 0)),
							every: Math.max(Math.floor(s(e.dynamic.every, 1)), 1),
							classNames: e.dynamic.classNames || [],
							sticky: "Footer" === e.location || e.sticky,
							stickyOverlapSelector: s(e.stickyOverlapSelector, "").trim(),
							autosize: e.autosize,
							special: s(e.targeting, []).filter((function (t)
							{
								return "special" === t.key
							})).reduce((function (t, e)
							{
								return t.concat.apply(t, r(e.value))
							}), []),
							lazy: s(e.dynamic.lazy, !1),
							lazyMax: s(e.dynamic.lazyMax, 2),
							lazyMaxDefaulted: 0 !== e.dynamic.lazyMax && !e.dynamic.lazyMax
						}
					}))
				}, t.prototype._locationEnabled = function (t)
				{
					var e = -1 !== this.adthriveCLS.enabledLocations.indexOf(t.location),
						i = this.adthriveCLS.disableAds && this.adthriveCLS.disableAds.all || document.body.classList.contains("adthrive-disable-all"),
						n = "Recipe" !== t.location && "Content" !== t.location || !document.body.classList.contains("adthrive-disable-content") && !this.adthriveCLS.disableAds.reasons.has("content_plugin");
					return e && !i && n
				}, t.prototype._forDevice = function (t, e)
				{
					return -1 !== t.devices.indexOf(e)
				}, t.prototype._forPage = function (t)
				{
					return 0 === t.pageSelector.length || null !== document.querySelector(t.pageSelector)
				}, t.prototype.onlySupportedAdSizes = function (t)
				{
					return this._supportedSizes.filter((function (e)
					{
						var i = o(e, 2),
							n = i[0],
							r = i[1];
						return t.some((function (t)
						{
							var e = o(t, 2),
								i = e[0],
								a = e[1];
							return n === i && r === a
						}))
					}))
				}, t.prototype.filterAdUnitSizes = function (t, e)
				{
					var i = function (t)
						{
							var e = t.clientWidth;
							if (getComputedStyle)
							{
								var i = getComputedStyle(t, null);
								e -= parseFloat(i.paddingLeft || "0") + parseFloat(i.paddingRight || "0")
							}
							return e
						}(e),
						n = t.sticky && "Sidebar" === t.location;
					return t.sizes.filter((function (e)
					{
						var o = !t.autosize || (e[0] <= i || e[0] <= 320),
							r = !n || e[1] <= window.innerHeight - 100;
						return o && r
					}))
				}, t.prototype.excludeTallSizeFromFooter = function (t, e)
				{
					var i = o(e, 2),
						n = i[0],
						r = i[1];
					return !("Footer" === t && "phone" === this._device && 320 === n && 100 === r)
				}, t
			}(),
			S = function ()
			{
				function t(t)
				{
					this.adthrive = t, this.all = !1, this.content = !1, this.recipe = !1, this.video = !1, this.locations = new Set, this.reasons = new Set, (this.urlHasEmail(window.location.href) || this.urlHasEmail(window.document.referrer)) && (this.all = !0, this.reasons.add("all_email"));
					try
					{
						this.checkCommandQueue(), null !== document.querySelector(".tag-novideo") && (this.video = !0, this.locations.add("Video"), this.reasons.add("video_tag"))
					}
					catch (t)
					{
						console.log(t)
					}
				}
				return t.prototype.checkCommandQueue = function ()
				{
					var t = this;
					this.adthrive && this.adthrive.cmd && this.adthrive.cmd.forEach((function (e)
					{
						var i = e.toString(),
							n = t.extractAPICall(i, "disableAds");
						n && t.disableAllAds(t.extractPatterns(n));
						var o = t.extractAPICall(i, "disableContentAds");
						o && t.disableContentAds(t.extractPatterns(o));
						var r = t.extractAPICall(i, "disablePlaylistPlayers");
						r && t.disablePlaylistPlayers(t.extractPatterns(r))
					}))
				}, t.prototype.extractPatterns = function (t)
				{
					var e = t.match(/\'(.*?)\'/g);
					if (null !== e) return e.map((function (t)
					{
						return t.replace(/'/g, "")
					}))
				}, t.prototype.extractAPICall = function (t, e)
				{
					var i = new RegExp(e + "\\((.*?)\\)", "g"),
						n = t.match(i);
					return null !== n && n[0]
				}, t.prototype.disableAllAds = function (t)
				{
					t && !c(t) || (this.all = !0, this.reasons.add("all_page"))
				}, t.prototype.disableContentAds = function (t)
				{
					t && !c(t) || (this.content = !0, this.recipe = !0, this.locations.add("Content"), this.locations.add("Recipe"), this.reasons.add("content_plugin"))
				}, t.prototype.disablePlaylistPlayers = function (t)
				{
					t && !c(t) || (this.video = !0, this.locations.add("Video"), this.reasons.add("video_page"))
				}, t.prototype.urlHasEmail = function (t)
				{
					if (!t) return !1;
					return null !== /([A-Z0-9._%+-]+(@|%(25)*40)[A-Z0-9.-]+\.[A-Z]{2,})/i.exec(t)
				}, t
			}();
		window.adthriveCLS && (window.adthriveCLS.disableAds = new S(window.adthrive)),
			function (t)
			{
				t.Video_Collapse_Autoplay_SoundOff = "Video_Collapse_Autoplay_SoundOff", t.Video_Individual_Autoplay_SOff = "Video_Individual_Autoplay_SOff", t.Video_Coll_SOff_Smartphone = "Video_Coll_SOff_Smartphone", t.Video_In_Post_ClicktoPlay_SoundOn = "Video_In-Post_ClicktoPlay_SoundOn"
			}(v || (v = {})),
			function (t)
			{
				t.StickySekindo = "stickySekindo", t.StaticSekindo = "staticSekindo", t.None = "none"
			}(_ || (_ = {}));
		var C = function ()
			{
				function t(t, e)
				{
					var i = this;
					this._config = t, this._adthriveCLS = e, this._stickyRelatedOnPage = !1, this._IN_POST_SELECTOR = ".adthrive-video-player", this._contextualMediaIds = [], this._WRAPPER_BAR_HEIGHT = 36, this._playersAddedFromPlugin = [], this._device = /Windows NT|Macintosh/i.test(navigator.userAgent) ? "desktop" : "mobile";
					var n = {
						stickyRelated: [],
						stickyPlaylist: [],
						sekindo: [],
						stationaryRelated: []
					};
					this._potentialPlayerMap = n, this._potentialPlayerMap = this._config.video.videoAdOptions.players.length ? this._config.video.videoAdOptions.players.filter((function (t)
					{
						var e;
						return (null === (e = t.devices) || void 0 === e ? void 0 : e.indexOf(i._device)) > -1
					})).reduce((function (t, e)
					{
						return t[e.type] || (t[e.type] = []), e.enabled && t[e.type].push(e), t
					}), n) : n;
					var o = this._config.video.videoAdOptions.players.filter((function (t)
					{
						return "stationaryRelated" === t.type && t.enabled
					}));
					this._potentialPlayerMap.stationaryRelated = o
				}
				return t.prototype.init = function ()
				{
					this._initializePlayers()
				}, t.prototype._wrapJWPlayerWithCLS = function (t, e, i)
				{
					if (void 0 === i && (i = 0), t.parentNode)
					{
						var n = t.offsetWidth * (9 / 16),
							o = this._createGenericCLSWrapper(n, e, i);
						t.parentNode.insertBefore(o, t), o.appendChild(t)
					}
				}, t.prototype._createSekindoCLSWrapper = function (t, e)
				{
					var i = this._getTitleHeight(document.createElement("h4"));
					return this._createGenericCLSWrapper(t, e, i)
				}, t.prototype._createGenericCLSWrapper = function (t, e, i)
				{
					var n = document.createElement("div");
					return n.id = "cls-video-container-" + e, n.className = "adthrive", n.style.minHeight = t + i + "px", n
				}, t.prototype._getTitleHeight = function (t)
				{
					t.innerText = "Title", t.style.visibility = "hidden", document.body.appendChild(t);
					var e = window.getComputedStyle(t),
						i = parseInt(e.height, 10),
						n = parseInt(e.marginTop, 10),
						o = parseInt(e.marginBottom, 10);
					return document.body.removeChild(t), Math.min(i + o + n, 50)
				}, t.prototype._initializePlayers = function ()
				{
					var t = document.querySelectorAll(this._IN_POST_SELECTOR);
					t.length && this._initializeRelatedPlayers(t), this._shouldRunAutoplayPlayers() && this._determineAutoplayPlayers()
				}, t.prototype._checkPlayerSelectorOnPage = function (t)
				{
					var e = this._potentialPlayerMap[t].map((function (t)
					{
						return {
							player: t,
							playerElement: p.getPlacementElement(t)
						}
					}));
					return e.length ? e[0] :
					{
						player: null,
						playerElement: null
					}
				}, t.prototype._initializeRelatedPlayers = function (t)
				{
					for (var e = 0; e < t.length; e++)
					{
						var i = t[e],
							n = this._getEmbeddedPlayerType(i),
							o = this._getUnusedMediaId(i);
						o && this._createRelatedPlayer(o, n, i)
					}
				}, t.prototype._getUnusedMediaId = function (t)
				{
					var e = t.getAttribute("data-video-id");
					return !(!e || -1 !== this._contextualMediaIds.indexOf(e)) && (this._contextualMediaIds.push(e), e)
				}, t.prototype._createRelatedPlayer = function (t, e, i)
				{
					"collapse" === e ? this._createCollapsePlayer(t, i) : "static" === e && this._createStaticPlayer(t, i)
				}, t.prototype._createCollapsePlayer = function (t, e)
				{
					var n = this._checkPlayerSelectorOnPage("stickyRelated"),
						o = n.player,
						r = n.playerElement,
						a = o || this._potentialPlayerMap.stationaryRelated[0];
					a && a.playerId && (this._shouldOverrideElement(e) && (e = this._getOverrideElement(o, r, e)), e = document.querySelector("#cls-video-container-" + t + " > div") || e, this._createStickyRelatedPlayer(i(i(
					{}, a),
					{
						mediaId: t
					}), e))
				}, t.prototype._createStaticPlayer = function (t, e)
				{
					if (this._potentialPlayerMap.stationaryRelated.length && this._potentialPlayerMap.stationaryRelated[0].playerId)
					{
						var n = this._potentialPlayerMap.stationaryRelated[0];
						this._createStationaryRelatedPlayer(i(i(
						{}, n),
						{
							mediaId: t
						}), e)
					}
				}, t.prototype._getOverrideElement = function (t, e, i)
				{
					if (t && e)
					{
						var n = document.createElement("div");
						e.insertAdjacentElement(t.position, n), i = n
					}
					else
					{
						var o = this._checkPlayerSelectorOnPage("stickyPlaylist"),
							r = o.player,
							a = o.playerElement;
						if (r && a)
						{
							n = document.createElement("div");
							a.insertAdjacentElement(r.position, n), i = n
						}
					}
					return i
				}, t.prototype._getEmbeddedPlayerType = function (t)
				{
					var e = t.getAttribute("data-player-type");
					return e && "default" !== e || (e = this._config.video.contextualSettings ? this._config.video.contextualSettings.defaultPlayerType : "static"), this._stickyRelatedOnPage && (e = "static"), e
				}, t.prototype._shouldOverrideElement = function (t)
				{
					var e = t.getAttribute("override-embed");
					return "true" === e || "false" === e ? "true" === e : !!this._config.video.contextualSettings && this._config.video.contextualSettings.overrideEmbedLocation
				}, t.prototype._createStationaryRelatedPlayer = function (t, e)
				{
					this._device, v.Video_In_Post_ClicktoPlay_SoundOn;
					e && t.mediaId && (this._wrapJWPlayerWithCLS(e, t.mediaId), this._playersAddedFromPlugin.push(t.mediaId))
				}, t.prototype._createStickyRelatedPlayer = function (t, e)
				{
					this._device, v.Video_Individual_Autoplay_SOff;
					if (this._stickyRelatedOnPage = !0, this._config.video.mobileStickyPlayerOnPage = "mobile" === this._device, e && t.position && t.mediaId)
					{
						var i = document.createElement("div");
						e.insertAdjacentElement(t.position, i);
						var n = document.createElement("h3");
						n.style.margin = "10px 0";
						var o = this._getTitleHeight(n);
						this._wrapJWPlayerWithCLS(i, t.mediaId, this._WRAPPER_BAR_HEIGHT + o), this._playersAddedFromPlugin.push(t.mediaId)
					}
				}, t.prototype._determineAutoplayPlayers = function ()
				{
					if (!this._stickyRelatedOnPage)
					{
						var t = this._checkPlayerSelectorOnPage("stickyPlaylist"),
							e = t.player,
							i = t.playerElement,
							n = this._checkPlayerSelectorOnPage("sekindo"),
							o = n.player,
							r = n.playerElement;
						e && e.playerId && e.playlistId && i ? this._createPlaylistPlayer(e, i) : o && o.playlistId && r && this._createSekindoPlayer(o, r)
					}
				}, t.prototype._createSekindoPlayer = function (t, e)
				{
					var n = t.playlistId,
						o = (i(i(
						{}, t),
						{
							classNames: []
						}), "mobile" === this._device ?
						{
							width: 340,
							height: 260
						} :
						{
							width: 320,
							height: 250
						}),
						r = this._createSekindoCLSWrapper(o.height, n);
					e.insertAdjacentElement(t.position, r), this._playersAddedFromPlugin.push(n)
				}, t.prototype._createPlaylistPlayer = function (t, e)
				{
					var i = t.playlistId;
					this._config.video.mobileStickyPlayerOnPage = !0;
					var n = document.createElement("div");
					e.insertAdjacentElement(t.position, n), this._wrapJWPlayerWithCLS(n, i, this._WRAPPER_BAR_HEIGHT), this._playersAddedFromPlugin.push("playlist-" + i)
				}, t.prototype._isVideoAllowedOnPage = function ()
				{
					return this._adthriveCLS.disableAds && this._adthriveCLS.disableAds.video ? (this._adthriveCLS.disableAds.reasons.has("video_tag") || this._adthriveCLS.disableAds.reasons.has("video_plugin") || this._adthriveCLS.disableAds.reasons.has("video_page"), !1) : !this._adthriveCLS.videoDisabledFromPlugin
				}, t.prototype._shouldRunAutoplayPlayers = function ()
				{
					return !(!this._isVideoAllowedOnPage() || !(this._potentialPlayerMap.stickyRelated.length || this._potentialPlayerMap.stickyPlaylist.length || this._potentialPlayerMap.sekindo.length))
				}, t
			}(),
			b = function (t)
			{
				function i(e)
				{
					var i = t.call(this) || this;
					return i._probability = e, i
				}
				return function (t, i)
				{
					function n()
					{
						this.constructor = t
					}
					e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n)
				}(i, t), i.prototype.get = function ()
				{
					if (this._probability < 0 || this._probability > 1) throw new Error("Invalid probability");
					return Math.random() < this._probability
				}, i
			}((function () {})),
			P = function ()
			{
				function t(t)
				{
					this.adthriveCLS = t, this._result = !1, this._choices = [
					{
						choice: !0
					},
					{
						choice: !1
					}], this.key = "adsp2";
					var e = window.adthriveCLS;
					this.adthriveCLS.siteAds.adDensityLayout && this.siteIsEligible() && (this._result = this.run(), e.experiments = e.experiments ||
					{}, e.experiments[this.key] = this._result)
				}
				return Object.defineProperty(t.prototype, "result",
				{
					get: function ()
					{
						return this._result
					},
					enumerable: !1,
					configurable: !0
				}), t.prototype.siteIsEligible = function ()
				{
					return !d.has(this.adthriveCLS.siteAds.siteId)
				}, t.prototype.run = function ()
				{
					return new b(.03).get()
				}, t
			}(),
			A = function ()
			{
				function t(t)
				{
					this._adthriveCLS = t, this._expKey = "clsins_ss", this._animationRequestId = 0, this._adthrive = window.adthrive, this._result = Math.random() > .05, this._adthriveCLS.injectedFromPlugin = !1, this._adthriveCLS.enabledLocations = ["Content", "Recipe"], this._adthriveCLS.injectedSlots = [], this._adthriveCLS.experiments = this._adthriveCLS.experiments ||
					{}, this._adthriveCLS.experiments[this._expKey] = this._result ? "on" : "off"
				}
				return t.prototype.start = function ()
				{
					"classList" in document.createElement("_") && window.requestAnimationFrame && this._adthrive.siteAds && this._adthrive.siteAds.adOptions && this._adthrive.siteAds.adOptions.clsOptimizedAds && (this._adthriveCLS.siteAds = this._adthrive.siteAds, this._adthriveCLS.disableAds = new S(window.adthrive), this._result && (this._animationRequestId = window.requestAnimationFrame(this.addClsInsertion.bind(this))))
				}, t.prototype.addClsInsertion = function ()
				{
					document.body ? (this._adthriveCLS.injectedFromSiteAds = !0, this._adthriveCLS.videoDisabledFromPlugin = !!document.body.classList.contains("adthrive-disable-video"), function (t, e)
					{
						void 0 === e && (e = {});
						var i = e.insertAt;
						if (t && "undefined" != typeof document)
						{
							var n = document.head || document.getElementsByTagName("head")[0],
								o = document.createElement("style");
							o.type = "text/css", "top" === i && n.firstChild ? n.insertBefore(o, n.firstChild) : n.appendChild(o), o.styleSheet ? o.styleSheet.cssText = t : o.appendChild(document.createTextNode(t))
						}
					}(".adthrive-ad{margin-top:10px;margin-bottom:10px;text-align:center;overflow-x:visible;clear:both;line-height:0}"), this.startClsInsertion()) : "complete" === document.readyState || this._adthriveCLS.injectedFromSiteAds ? window.cancelAnimationFrame(this._animationRequestId) : this._animationRequestId = window.requestAnimationFrame(this.addClsInsertion.bind(this))
				}, t.prototype.startClsInsertion = function ()
				{
					this._adthriveCLS.injectedSlots.some((function (t)
					{
						return "Content" === t.dynamicAd.location || "Recipe" === t.dynamicAd.location
					})) || new g(this._adthriveCLS, new P(this._adthriveCLS)).start();
					if (!window.adthriveVideosInjected)
					{
						var t = new y(new m(this._adthriveCLS));
						new C(t, this._adthriveCLS).init()
					}
				}, t
			}();
		return window.adthriveCLS = window.adthriveCLS ||
		{}, window.adthriveCLS && window.adthriveCLS.injectedFromPlugin || new A(window.adthriveCLS).start(), t.ClsSiteInsertion = A, t
	}(
	{});


	var script = d.createElement('script');
	script.type = 'text/javascript';
	script.src = w.adthrive.baseUrl + '/js/adthrive.min.js?threshold=0&deployment=' + w.adthrive.deployment + '&cb=' + Date.now();
	var node = d.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(script, node);

})(window, document);