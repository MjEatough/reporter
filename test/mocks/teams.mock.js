const { addInteractionHandler } = require('pactum').handler;
const { addDataTemplate } = require('pactum').stash;

addDataTemplate({
  'TEAMS_ROOT_TITLE_SINGLE_SUITE': {
    "type": "TextBlock",
    "text": "✅ Default suite",
    "size": "medium",
    "weight": "bolder",
    "wrap": true
  },
  'TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE': {
    "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
    "@OVERRIDES@": {
      "text": "❌ Default suite",
    }
  },
  'TEAMS_ROOT_RESULTS_SINGLE_SUITE': {
    "type": "FactSet",
    "facts": [
      {
        "title": "Results:",
        "value": "4 / 4 Passed (100%)"
      },
      {
        "title": "Duration:",
        "value": "0:02"
      }
    ]
  },
  'TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES': {
    "type": "FactSet",
    "facts": [
      {
        "title": "Results:",
        "value": "3 / 4 Passed (75%)"
      },
      {
        "title": "Duration:",
        "value": "0:02"
      }
    ]
  },
  'TEAMS_ROOT_RESULTS_MULTIPLE_SUITES': {
    "type": "FactSet",
    "facts": [
      {
        "title": "Results:",
        "value": "8 / 20 Passed (40%)"
      },
      {
        "title": "Duration:",
        "value": "23:23"
      }
    ]
  },
  'TEAMS_SUITE_CHROME_TITLE': {
    "type": "TextBlock",
    "text": "❌ desktop-chrome",
    "isSubtle": true,
    "weight": "bolder",
    "wrap": true
  },
  'TEAMS_SUITE_IOS_TITLE': {
    "@DATA:TEMPLATE@": "TEAMS_SUITE_CHROME_TITLE",
    "@OVERRIDES@": {
      "text": "❌ mobile-ios",
    }
  },
  'TEAMS_SUITE_CHROME_RESULTS': {
    "type": "FactSet",
    "facts": [
      {
        "title": "Results:",
        "value": "2 / 5 Passed (40%)"
      },
      {
        "title": "Duration:",
        "value": "3:22"
      }
    ]
  },
  'TEAMS_SUITE_IOS_RESULTS': {
    "type": "FactSet",
    "facts": [
      {
        "title": "Results:",
        "value": "2 / 5 Passed (40%)"
      },
      {
        "title": "Duration:",
        "value": "9:05"
      }
    ]
  },
});

addInteractionHandler('post test-summary to teams', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE",
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with multiple suites', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
                  "@OVERRIDES@": {
                    "text": "Regression Tests",
                  },
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_MULTIPLE_SUITES",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_CHROME_TITLE",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_CHROME_RESULTS",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_IOS_TITLE",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_IOS_RESULTS",
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary-slim to teams with multiple suites', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
                  "@OVERRIDES@": {
                    "text": "❌ Regression Tests",
                  },
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_MULTIPLE_SUITES",
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post failure-details to teams with multiple suites', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
                  "@OVERRIDES@": {
                    "text": "Regression Tests",
                  },
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_MULTIPLE_SUITES",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_CHROME_TITLE",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_CHROME_RESULTS",
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "GU"
                    },
                    {
                      "title": "Error:",
                      "value": "expected [A] but found [948474]"
                    }
                  ]
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "SBP_WA"
                    },
                    {
                      "title": "Error:",
                      "value": "Expected condition failed: : 95ddbda01ea4b3dbcb049e681a6...}"
                    }
                  ]
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "CB"
                    },
                    {
                      "title": "Error:",
                      "value": "element click intercepted:"
                    }
                  ]
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_IOS_TITLE",
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_SUITE_IOS_RESULTS"
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "GU"
                    },
                    {
                      "title": "Error:",
                      "value": "expected [A] but found [948474]"
                    }
                  ]
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "SBP_WA"
                    },
                    {
                      "title": "Error:",
                      "value": "Appium error: An unknown sr='Search...']}"
                    }
                  ]
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "CB"
                    },
                    {
                      "title": "Error:",
                      "value": "A script did not complete "
                    }
                  ]
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post failure-details to teams with single suite', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Test:",
                      "value": "c4"
                    },
                    {
                      "title": "Error:",
                      "value": "expected [true] but found [false]"
                    }
                  ]
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary with hyperlinks to teams - pass status', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE",
                },
                {
                  "type": "TextBlock",
                  "text": "[Pipeline](some-url) ｜ [Video](some-url)",
                  "separator": true,
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary with hyperlinks to teams - fail status', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "[Pipeline](some-url) ｜ [Video](some-url)",
                  "separator": true,
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary with hyperlinks having a title and without a separator to teams', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE",
                },
                {
                  "type": "TextBlock",
                  "text": "Hyperlinks",
                  "isSubtle": true,
                  "weight": "bolder",
                  "separator": false,
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "text": "[Pipeline](some-url) ｜ [Video](some-url)",
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with report portal analysis', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "[Report Portal Analysis](http://localhost:9393/ui/#project-name/launches/all/uuid)",
                  "isSubtle": true,
                  "weight": "bolder",
                  "wrap": true,
                  "separator": true
                },
                {
                  "type": "TextBlock",
                  "text": "🔴 PB - 0 ｜ 🟡 AB - 0 ｜ 🔵 SI - 0 ｜ ◯ ND - 0 ｜ **🟠 TI - 4**",
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with report portal analysis with title_link', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "[Report Portal Analysis](http://localhost:9393)",
                  "isSubtle": true,
                  "weight": "bolder",
                  "wrap": true,
                  "separator": true
                },
                {
                  "type": "TextBlock",
                  "text": "🔴 PB - 0 ｜ 🟡 AB - 0 ｜ 🔵 SI - 0 ｜ ◯ ND - 0 ｜ **🟠 TI - 4**",
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with mentions', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "<at>mom</at> ｜ <at>dad</at>",
                  "wrap": true,
                  "separator": true
                }
              ],
              "actions": [],
              "msteams": {
                "entities": [
                  {
                    "type": "mention",
                    "text": "<at>mom</at>",
                    "mentioned": {
                      "id": "mom@family",
                      "name": "mom"
                    }
                  },
                  {
                    "type": "mention",
                    "text": "<at>dad</at>",
                    "mentioned": {
                      "id": "dad@family",
                      "name": "dad"
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with qc-test-summary', (ctx) => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                        },
                        {
                          "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                        }
                      ],
                      "width": "stretch"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": `${ctx.data.quickChartUrl}/chart?c=%7B%22type%22%3A%22radialGauge%22%2C%22data%22%3A%7B%22datasets%22%3A%5B%7B%22data%22%3A%5B75%5D%2C%22backgroundColor%22%3A%22green%22%7D%5D%7D%2C%22options%22%3A%7B%22trackColor%22%3A%22%23FF0000%22%2C%22roundedCorners%22%3Afalse%2C%22centerPercentage%22%3A80%2C%22centerArea%22%3A%7B%22fontSize%22%3A80%2C%22text%22%3A%2275%25%22%7D%7D%7D`,
                          "altText": "overall-results-summary",
                          "size": "large"
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with report portal history', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "Last 3 Runs",
                  "isSubtle": true,
                  "weight": "bolder",
                  "wrap": true,
                  "separator": true
                },
                {
                  "type": "TextBlock",
                  "text": "[❌](http://localhost:9393/ui/#project-name/launches/all/uuid) [✅](http://localhost:9393/ui/#project-name/launches/all/uuid) [⚠️](http://localhost:9393/ui/#project-name/launches/all/uuid)",
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with report portal history without title and separator', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "[❌](http://localhost:9393/ui/#project-name/launches/all/uuid) [✅](http://localhost:9393/ui/#project-name/launches/all/uuid) [⚠️](http://localhost:9393/ui/#project-name/launches/all/uuid)",
                  "wrap": true,
                  "separator": false
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with full width', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE",
                }
              ],
              "actions": [],
              "msteams": {
                "width": "Full"
              }
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary-slim with verbose duration', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
                  "@OVERRIDES@": {
                    "text": "❌ Regression Tests",
                  },
                },
                {
                  "type": "FactSet",
                  "facts": [
                    {
                      "title": "Results:",
                      "value": "8 / 20 Passed (40%)"
                    },
                    {
                      "title": "Duration:",
                      "value": "23 minutes 23 seconds"
                    }
                  ]
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with percy analysis', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE_FAILURE"
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE_FAILURES"
                },
                {
                  "type": "TextBlock",
                  "text": "[Percy Analysis](https://percy.io/org-uid/project-name/builds/build-id)",
                  "isSubtle": true,
                  "weight": "bolder",
                  "wrap": true,
                  "separator": true
                },
                {
                  "type": "TextBlock",
                  "text": "**✔ AP - 1** ｜ 🔎 UR - 0 ｜ 🗑 RM - 0",
                  "wrap": true
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});

addInteractionHandler('post test-summary to teams with title_link', () => {
  return {
    request: {
      method: 'POST',
      path: '/message',
      body: {
        "type": "message",
        "attachments": [
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_TITLE_SINGLE_SUITE",
                  "@OVERRIDES@": {
                    "text": "[✅ Default suite](some-url)",
                  }
                },
                {
                  "@DATA:TEMPLATE@": "TEAMS_ROOT_RESULTS_SINGLE_SUITE",
                }
              ],
              "actions": []
            }
          }
        ]
      }
    },
    response: {
      status: 200
    }
  }
});