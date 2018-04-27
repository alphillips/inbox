var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

var mails = []

var m1 = {
  "type": "MESSAGE",
  "messageId": "1",
  "messageTimestamp": {
    "epochSecond": 1517455568,
    "nano": 0
  },
  "subject": "Re: Access to Time Tiger-HD-INBOX",
  "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
  "fromPartyType": "string",
  "fromParty": "Help Desk",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": true,
  "read": false,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "linkedMessage": [
    {
      "messageId": "2",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger2",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "3",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger3",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "4",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger4",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "5",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger5",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}

var m2 = {
  "type": "MESSAGE",
  "messageId": "2",
  "messageTimestamp": {
    "epochSecond": 113488800,
    "nano": 0
  },
  "subject": "Re: Access to Time Tiger-Mario",
  "body": "New starter - please provide all access",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": true,
  "read": false,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "linkedMessage": [
    {
      "messageId": "3",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger3",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "4",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger4",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "5",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger5",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {}
  ]
}

var m3 = {
  "type": "MESSAGE",
  "messageId": "3",
  "messageTimestamp": {
    "epochSecond": 1413588800,
    "nano": 0
  },
  "subject": "Re: Access to Time Tiger-Catman",
  "body": "Hi ISD PMO, Can you please add new starter to time tiger.  Base user access on Tom Dickson. <p>Department of Agriculture and Water Resources</p>",
  "fromPartyType": "string",
  "fromParty": "Catman",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": true,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  },
  "linkedMessage": [
    {
      "messageId": "4",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger4",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    },
    {
      "messageId": "5",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger5",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}

var m4 = {
  "type": "MESSAGE",
  "messageId": "4",
  "messageTimestamp": {
    "epochSecond": 1413688800,
    "nano": 0
  },
  "subject": "Access to Time Tiger-Mario4",
  "body": "<strong>HP Service Manager</strong><p>Note: System Generated Email, please do not reply for more information refer to the incident record in the system.</p><p>Dear Sir/Madam,</p><p>The Interaction SD10534534 has been created.</p> <a href='#'>For more information</a>",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": false,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  },
  "linkedMessage": [
    {
      "messageId": "5",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger5",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}

var m5 = {
  "type": "MESSAGE",
  "messageId": "5",
  "messageTimestamp": {
    "epochSecond": 1413788800,
    "nano": 0
  },
  "subject": "There is cake in the kitchen-Catman5",
  "body": "Hi ISD PMO, Can you please add new starter to time tiger.  Base user access on Tom Dickson. <p>Department of Agriculture and Water Resources</p>",
  "fromPartyType": "string",
  "fromParty": "Catman",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": true,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  },
  "linkedMessage": [
    {
      "messageId": "6",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger6",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}

var m6 = {
  "type": "MESSAGE",
  "messageId": "6",
  "messageTimestamp": {
    "epochSecond": 1413888800,
    "nano": 0
  },
  "subject": "Happy Friday + Some free fishes-Mario6",
  "body": "A little <strong>treat</strong> for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.A little treat for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": false,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  },
  "linkedMessage": [
    {
      "messageId": "7",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger7",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}

var m7 = {
  "type": "MESSAGE",
  "messageId": "7",
  "messageTimestamp": {
    "epochSecond": 1413988800,
    "nano": 0
  },
  "subject": "Celebrate with us-Mario7",
  "body": "<strong>HP Service Manager</strong><p>Note: System Generated Email, please do not reply for more information refer to the incident record in the system.</p><p>Dear Sir/Madam,</p><p>The Interaction SD10534534 has been created.</p> <a href='#'>For more information</a>",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": false,
  "parentId": "string",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  },
  "linkedMessage": [
    {
      "messageId": "8",
      "messageTimestamp": {
        "epochSecond": 1517455568,
        "nano": 0
      },
      "subject": "Re: Access to Time Tiger8",
      "body": "<p>You have been registered in the Time Tiger system, you should have received an auto generated email detailing your user id and temporary password.</p><p>The URL for Time Tiger is <a href='#'>login.html</a></p><p>I suggest you store it in your favourite list.</p><p>Time sheets should be completed every week by cob Friday, your supervisor should review your times and approve them the following Monday</p><p>If you are a contractor, instructions for setting up a time sheet for approval by your supervisor is on the PMO SharePoint site under the Project Management Framework page.</p><p>Reply if I have missed any of your requests.</p>",
      "fromPartyType": "string",
      "fromParty": "Help Desk",
      "toPartyType": "string",
      "toParty": "Jon Snow",
      "archived": true,
      "read": false,
      "parentId": "string",
      "paramValuesMap": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "linkedAttachment": [
        {
          "externalRefId": "string",
          "name": "unarchive.svg",
          "mimeType": "svg",
         "size": 0,
          "data": [
            "string"
          ]
        }
      ]
    }
  ],
  "linkedAttachment": [
    {
      "externalRefId": "string",
      "name": "unarchive.svg",
      "mimeType": "svg",
     "size": 0,
      "data": [
        "string"
      ]
    }
  ]
}
var m8 = {
  "type": "NOTIFICATION",
  "messageId": "8",
  "messageTimestamp": {
    "epochSecond": 1413888800,
    "nano": 0
  },
  "expiryTimestamp": {
    "epochSecond": null,
    "nano": 0
  },
  "subject": "Happy Friday + Some free fishes-Mario8",
  "body": "A little <strong>treat</strong> for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.A little treat for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": false,
  "parentId": "",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  }
}
var m9 = {
  "type": "NOTIFICATION",
  "messageId": "9",
  "messageTimestamp": {
    "epochSecond": 1413888800,
    "nano": 0
  },
  "expiryTimestamp": {
    "epochSecond": null,
    "nano": 0
  },
  "subject": "Happy Friday + Some free fishes-Mario9",
  "body": "A little <strong>treat</strong> for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.A little treat for you In the meantime, click here for early access to the first 100 fishes in both the solid and line style. Did I say 100, I mean 200.  Sign up now.",
  "fromPartyType": "string",
  "fromParty": "Mario",
  "toPartyType": "string",
  "toParty": "Jon Snow",
  "archived": false,
  "read": false,
  "parentId": "",
  "paramValuesMap": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {},
  }
}

mails.push(m1)
mails.push(m2)
mails.push(m3)
mails.push(m4)
mails.push(m5)
mails.push(m6)
mails.push(m7)
mails.push(m8)
mails.push(m9)

module.exports = function(app) {

  // get all mail, not archived ones
  app.get('/v1/all', function (req, res) {
    var mail = []
    mails.map(function(s){
      if(s.archived === false){
        mail.push(s)
      }
    })
    res.json(mail)
  })

  // get unread count, not archived
  app.get('/v1/all/count', function (req, res) {
    res.json(4)
  })

  app.get('/v1/notification/:id', function (req, res) {
    res.json(mails[req.params.id-1])
  })
}
