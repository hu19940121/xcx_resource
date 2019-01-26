const questionList = [

  {
    id: 1,
    time: 2,
    teacher: '大树',
    question: '第一个问题：把大象装进冰箱总共分几步？。',
    askList: [
      {
        asker: '点点',
        text: '这个问题有什么意义吗？',
        replyList: [
          {
            replyer: '大树',
            text: '问你 你就回答 哪那么多事？！'
          }
        ]
      }
    ]
  }, {
    id: 2,
    time: 8,
    teacher: '大树',
    question: '第二个问题：为什么要分为三步',
    askList: [
      {
        asker: '凯尔',
        text: '这个问题太深奥了 ，我不是很懂',
        replyList: [
          {
            replyer: '大树',
            text: '知道你们不懂，所以我。。我也不懂 哈哈哈哈'
          }, {
            replyer: '若一',
            text: '我懂哦，我来告诉你把，嘿嘿嘿，我们都知道摩尔卡死的三段定力，就是我们没看待一个问题时，都可以简化三步去解决'
          }
        ]
      },
      {
        asker: '皮皮',
        text: ' 这就不算问题',
        replyList: [
        ]
      }
    ]
  }, {
    id: 3,
    time: 30,
    teacher: '大树',
    question: '第三个问题：世界上分为哪几种人？',
    askList: [
      {
        asker: '点点',
        text: '我知道我知道 ，两种人',
        replyList: [
          {
            replyer: '大树',
            text: '真聪明阿 '
          }
        ]
      }
    ]
  }
]

const treeData = [{
  'id': 1,
  'questionId': 1,
  'content': '1',
  'fromUserId': '630ecb1c0ab34b5da3fc9cc43952445f',
  'toUserId': 'fe042c7bf1de4543b494712925822ff5',
  'replyId': null,
  'createTime': 1548288853000,
  'createUser': '630ecb1c0ab34b5da3fc9cc43952445f',
  'videoId': 1,
  'deleted': 0,
  'twiceReplyVOList': [{
    'id': 2,
    'questionId': 1,
    'content': '2',
    'fromUserId': 'fe042c7bf1de4543b494712925822ff5',
    'toUserId': '630ecb1c0ab34b5da3fc9cc43952445f',
    'replyId': 1,
    'createTime': 1548288853000,
    'createUser': 'fe042c7bf1de4543b494712925822ff5',
    'videoId': 1,
    'deleted': 0,
    'twiceReplyVOList': [{
      'id': 3,
      'questionId': 1,
      'content': '3',
      'fromUserId': '630ecb1c0ab34b5da3fc9cc43952445f',
      'toUserId': 'fe042c7bf1de4543b494712925822ff5',
      'replyId': 2,
      'createTime': 1548288928000,
      'createUser': '630ecb1c0ab34b5da3fc9cc43952445f',
      'videoId': 1,
      'deleted': 0,
      'twiceReplyVOList': [{
        'id': 4,
        'questionId': 1,
        'content': '4',
        'fromUserId': 'fe042c7bf1de4543b494712925822ff5',
        'toUserId': '630ecb1c0ab34b5da3fc9cc43952445f',
        'replyId': 3,
        'createTime': 1548288928000,
        'createUser': 'fe042c7bf1de4543b494712925822ff5',
        'videoId': 1,
        'deleted': 0,
        'twiceReplyVOList': null
      }]
    }]
  }]
},
{
  'id': 5,
  'questionId': 1,
  'content': '5',
  'fromUserId': '630ecb1c0ab34b5da3fc9cc43952445f',
  'toUserId': 'laoshi',
  'replyId': null,
  'createTime': 1548307723000,
  'createUser': '630ecb1c0ab34b5da3fc9cc43952445f',
  'videoId': 1,
  'deleted': 0,
  'twiceReplyVOList': null
},
{
  'id': 6,
  'questionId': 1,
  'content': '6',
  'fromUserId': 'fe042c7bf1de4543b494712925822ff5',
  'toUserId': 'laoshi',
  'replyId': null,
  'createTime': 1548307723000,
  'createUser': 'fe042c7bf1de4543b494712925822ff5',
  'videoId': 1,
  'deleted': 0,
  'twiceReplyVOList': null
}
]
export {
  questionList,
  treeData
}
